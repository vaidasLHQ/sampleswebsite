import { createSignal, onMount, For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { supabase } from "~/lib/supabase";
import { samples } from "~/data/samples";
import { useDemoPlayer } from "~/lib/demoPlayer";
import SEO from "~/components/SEO";
import type { User } from "@supabase/supabase-js";

interface PurchasedSample {
  sample_id: number;
  purchased_at: string;
}

interface Order {
  id: string;
  created_at: string;
  total_cents: number;
  items: { sample_id: number; price_cents: number }[];
}

export default function Vault() {
  const navigate = useNavigate();
  const [user, setUser] = createSignal<User | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [purchasedSamples, setPurchasedSamples] = createSignal<PurchasedSample[]>([]);
  const [orders, setOrders] = createSignal<Order[]>([]);
  const [downloadingId, setDownloadingId] = createSignal<number | null>(null);
  const [activeTab, setActiveTab] = createSignal<'samples' | 'orders'>('samples');
  const [generatingReceipt, setGeneratingReceipt] = createSignal<string | null>(null);
  const demo = useDemoPlayer();

  const handlePlay = (sampleId: number) => {
    const sample = getSampleDetails(sampleId);
    if (!sample?.previewUrl) return;
    demo.toggle(sampleId, sample.previewUrl);
  };

  onMount(async () => {
    // Check authentication
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      // Not logged in - redirect to login
      navigate("/login", { replace: true });
      return;
    }
    
    setUser(session.user);
    
    // Fetch user's purchased samples and orders
    await fetchPurchasedSamples(session.user.id, session.user.email || "");
    await fetchOrders(session.user.id, session.user.email || "");
    setLoading(false);
  });

  const fetchPurchasedSamples = async (userId: string, email: string) => {
    try {
      // First try to get by user_id, then by email (for orders before user_id was added)
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          created_at,
          order_items (
            sample_id
          )
        `)
        .or(`user_id.eq.${userId},email.eq.${email}`)
        .eq('status', 'paid');

      if (error) {
        console.error('Error fetching purchases:', error);
        return;
      }

      // Flatten the order items into purchased samples
      const purchased: PurchasedSample[] = [];
      const seenIds = new Set<number>();

      data?.forEach((order: any) => {
        order.order_items?.forEach((item: any) => {
          if (!seenIds.has(item.sample_id)) {
            seenIds.add(item.sample_id);
            purchased.push({
              sample_id: item.sample_id,
              purchased_at: order.created_at
            });
          }
        });
      });

      setPurchasedSamples(purchased);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const fetchOrders = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          created_at,
          total_cents,
          order_items (
            sample_id,
            price_cents
          )
        `)
        .or(`user_id.eq.${userId},email.eq.${email}`)
        .eq('status', 'paid')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }

      const ordersList: Order[] = data?.map((order: any) => ({
        id: order.id,
        created_at: order.created_at,
        total_cents: order.total_cents,
        items: order.order_items || []
      })) || [];

      setOrders(ordersList);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const generatePDFReceipt = (order: Order) => {
    setGeneratingReceipt(order.id);
    
    try {
      const orderItems = order.items.map(item => {
        const sample = getSampleDetails(item.sample_id);
        return {
          name: sample ? `${sample.packName} - ${sample.filename}` : `Sample #${item.sample_id}`,
          price: formatPrice(item.price_cents)
        };
      });

      // Create PDF content
      const pdfContent = `
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 6 0 R >>
stream
BT
/F1 24 Tf
50 742 Td
(TRNDFY - Receipt) Tj
/F1 10 Tf
0 -30 Td
(Order ID: ${order.id}) Tj
0 -15 Td
(Date: ${formatDate(order.created_at)}) Tj
0 -15 Td
(Email: ${user()?.email || 'N/A'}) Tj
0 -30 Td
/F1 12 Tf
(Items:) Tj
/F1 10 Tf
${orderItems.map((item, i) => `0 -15 Td
(${i + 1}. ${item.name.replace(/[()]/g, '')} - ${item.price}) Tj`).join('\n')}
0 -30 Td
/F1 12 Tf
(Total: ${formatPrice(order.total_cents)}) Tj
0 -50 Td
/F1 8 Tf
(UAB Coded | vaidas@coded.ws) Tj
0 -12 Td
(This receipt is for your records. All sales are final.) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
6 0 obj
${350 + orderItems.length * 50}
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000266 00000 n
trailer
<< /Size 7 /Root 1 0 R >>
startxref
%%EOF
      `;

      // Create blob and download
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `TRNDFY-Receipt-${order.id.slice(0, 8)}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate receipt. Please try again.');
    } finally {
      setGeneratingReceipt(null);
    }
  };

  const generateSampleReceipt = (sample: any, purchaseDate: string) => {
    try {
      const pdfContent = `
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 6 0 R >>
stream
BT
/F1 24 Tf
50 742 Td
(TRNDFY - Invoice) Tj
/F1 10 Tf
0 -40 Td
(Date: ${formatDate(purchaseDate)}) Tj
0 -15 Td
(Email: ${user()?.email || 'N/A'}) Tj
0 -30 Td
/F1 12 Tf
(Item:) Tj
/F1 10 Tf
0 -20 Td
(${sample.packName.replace(/[()]/g, '')}) Tj
0 -15 Td
(${sample.filename.replace(/[()]/g, '')}) Tj
0 -30 Td
/F1 12 Tf
(Amount: ${formatPrice(sample.priceUsdCents)}) Tj
0 -50 Td
/F1 8 Tf
(UAB Coded | vaidas@coded.ws) Tj
0 -12 Td
(This invoice is for your records. All sales are final.) Tj
0 -12 Td
(License: 100% Royalty-Free for commercial use.) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
6 0 obj
450
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000266 00000 n
trailer
<< /Size 7 /Root 1 0 R >>
startxref
%%EOF
      `;

      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `TRNDFY-Invoice-${sample.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating invoice:', err);
      alert('Failed to generate invoice. Please try again.');
    }
  };

  const getSampleDetails = (sampleId: number) => {
    return samples.find(s => s.id === sampleId);
  };

  const handleDownload = async (sampleId: number) => {
    const sample = getSampleDetails(sampleId);
    if (!sample) return;

    setDownloadingId(sampleId);
    
    try {
      // First, try to get signed URL for the full-quality file
      const { data, error } = await supabase.storage
        .from('sample-full')
        .createSignedUrl(sample.fullStoragePath, 3600); // 1 hour expiry

      let downloadUrl = data?.signedUrl;

      // If full file not available, fall back to preview URL
      if (error || !downloadUrl) {
        console.log('Full file not available, using preview:', error?.message);
        if (sample.previewUrl) {
          downloadUrl = sample.previewUrl;
        } else {
          alert('Download file not available. Please contact support.');
          return;
        }
      }

      // Trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      // Use .mp3 extension since we're downloading the preview
      const filename = downloadUrl === sample.previewUrl 
        ? sample.filename.replace('.wav', '.mp3') 
        : sample.filename;
      link.download = filename;
      link.target = '_blank'; // Open in new tab to handle cross-origin
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download error:', err);
      alert('Download failed. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <main class="vault-page">
      <SEO 
        title="My Vault"
        description="Access your purchased sample packs and download your files."
        path="/vault"
        noindex={true}
      />
      
      <Show when={!loading()} fallback={
        <div class="vault-loading">
          <div class="vault-loading-spinner" />
          <p>Loading your vault...</p>
        </div>
      }>
        {/* Vault Header */}
        <div class="vault-header">
          <div class="vault-header-inner">
            <div class="vault-welcome">
              <div class="vault-welcome-text">
                <h1>Welcome to Your Vault</h1>
                <p>{user()?.email}</p>
              </div>
              
              <div class="vault-stats">
                <div class="vault-stat">
                  <span class="vault-stat-value">{purchasedSamples().length}</span>
                  <span class="vault-stat-label">Samples</span>
                </div>
                <div class="vault-stat">
                  <span class="vault-stat-value">∞</span>
                  <span class="vault-stat-label">Downloads</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vault Content */}
        <div class="vault-content">
          {/* Tab Navigation */}
          <div class="vault-tabs">
            <button 
              class={`vault-tab ${activeTab() === 'samples' ? 'active' : ''}`}
              onClick={() => setActiveTab('samples')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
              My Samples ({purchasedSamples().length})
            </button>
            <button 
              class={`vault-tab ${activeTab() === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              Order History ({orders().length})
            </button>
          </div>

          {/* My Samples Section */}
          <Show when={activeTab() === 'samples'}>
          <section class="vault-section">
            <div class="vault-section-header">
              <h2 class="vault-section-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18V5l12-2v13"/>
                  <circle cx="6" cy="18" r="3"/>
                  <circle cx="18" cy="16" r="3"/>
                </svg>
                My Samples
              </h2>
            </div>
            
            <Show when={purchasedSamples().length > 0} fallback={
              <div class="vault-empty">
                <div class="vault-empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M9 18V5l12-2v13"/>
                    <circle cx="6" cy="18" r="3"/>
                    <circle cx="18" cy="16" r="3"/>
                  </svg>
                </div>
                <h3>No samples yet</h3>
                <p>Your purchased samples will appear here. Browse our collection and start building your sound library.</p>
                <a href="/" class="vault-empty-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                  Browse Samples
                </a>
              </div>
            }>
              <div class="vault-samples-grid">
                <For each={purchasedSamples()}>
                  {(purchase) => {
                    const sample = getSampleDetails(purchase.sample_id);
                    if (!sample) return null;
                    
                    return (
                      <div class={`vault-sample-card ${demo.playingSampleId() === sample.id ? 'playing' : ''}`}>
                        <div class="vault-sample-artwork">
                          <img src={sample.artwork} alt={sample.packName} loading="lazy" />
                          <div class="vault-sample-play">
                            <button 
                              class={`vault-play-btn ${demo.playingSampleId() === sample.id ? 'playing' : ''} ${demo.loadingId() === sample.id ? 'loading' : ''}`}
                              onClick={() => handlePlay(sample.id)}
                              disabled={demo.loadingId() === sample.id}
                            >
                              <Show when={demo.loadingId() === sample.id}>
                                <svg class="vault-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                  <circle cx="12" cy="12" r="10" stroke-opacity="0.25" />
                                  <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round" />
                                </svg>
                              </Show>
                              <Show when={demo.loadingId() !== sample.id && demo.playingSampleId() === sample.id}>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                                </svg>
                              </Show>
                              <Show when={demo.loadingId() !== sample.id && demo.playingSampleId() !== sample.id}>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </Show>
                            </button>
                          </div>
                        </div>
                        
                        <div class="vault-sample-info">
                          <div class="vault-sample-name">{sample.packName}</div>
                          <div class="vault-sample-pack">{sample.filename.replace('.wav', '')}</div>
                          <div class="vault-sample-meta">
                            <span>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                              </svg>
                              {formatDate(purchase.purchased_at)}
                            </span>
                            <span>{sample.bpm} BPM</span>
                            <span>{sample.key}</span>
                          </div>
                        </div>
                        
                        <div class="vault-sample-actions">
                          <button 
                            class="vault-download-btn"
                            onClick={() => handleDownload(sample.id)}
                            disabled={downloadingId() === sample.id}
                          >
                            <Show when={downloadingId() === sample.id} fallback={
                              <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                  <polyline points="7 10 12 15 17 10"/>
                                  <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                                Download MP3
                              </>
                            }>
                              <svg class="vault-spinner" width="16" height="16" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="31.4" stroke-dashoffset="10"/>
                              </svg>
                              Downloading...
                            </Show>
                          </button>
                          <button 
                            class="vault-invoice-btn"
                            onClick={() => generateSampleReceipt(sample, purchase.purchased_at)}
                            title="Download Invoice"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                              <polyline points="14 2 14 8 20 8"/>
                              <line x1="16" y1="13" x2="8" y2="13"/>
                              <line x1="16" y1="17" x2="8" y2="17"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  }}
                </For>
              </div>
            </Show>
          </section>
          </Show>

          {/* Order History Section */}
          <Show when={activeTab() === 'orders'}>
          <section class="vault-section">
            <div class="vault-section-header">
              <h2 class="vault-section-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                Order History
              </h2>
            </div>
            
            <Show when={orders().length > 0} fallback={
              <div class="vault-empty">
                <div class="vault-empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <h3>No orders yet</h3>
                <p>Your order history will appear here after you make a purchase.</p>
                <a href="/" class="vault-empty-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                  Browse Samples
                </a>
              </div>
            }>
              <div class="vault-orders-list">
                <For each={orders()}>
                  {(order) => (
                    <div class="vault-order-card">
                      <div class="vault-order-header">
                        <div class="vault-order-info">
                          <div class="vault-order-id">Order #{order.id.slice(0, 8).toUpperCase()}</div>
                          <div class="vault-order-date">{formatDate(order.created_at)}</div>
                        </div>
                        <div class="vault-order-total">
                          <span class="vault-order-total-label">Total</span>
                          <span class="vault-order-total-value">{formatPrice(order.total_cents)}</span>
                        </div>
                      </div>
                      
                      <div class="vault-order-items">
                        <For each={order.items}>
                          {(item) => {
                            const sample = getSampleDetails(item.sample_id);
                            return (
                              <div class="vault-order-item">
                                <Show when={sample}>
                                  <img 
                                    src={sample!.artwork} 
                                    alt={sample!.packName} 
                                    class="vault-order-item-artwork"
                                  />
                                  <div class="vault-order-item-info">
                                    <div class="vault-order-item-name">{sample!.packName}</div>
                                    <div class="vault-order-item-filename">{sample!.filename}</div>
                                  </div>
                                  <div class="vault-order-item-price">{formatPrice(item.price_cents)}</div>
                                </Show>
                              </div>
                            );
                          }}
                        </For>
                      </div>
                      
                      <div class="vault-order-actions">
                        <button 
                          class="vault-receipt-btn"
                          onClick={() => generatePDFReceipt(order)}
                          disabled={generatingReceipt() === order.id}
                        >
                          <Show when={generatingReceipt() === order.id} fallback={
                            <>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                              </svg>
                              Download Receipt (PDF)
                            </>
                          }>
                            <svg class="vault-spinner" width="16" height="16" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="31.4" stroke-dashoffset="10"/>
                            </svg>
                            Generating...
                          </Show>
                        </button>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </Show>
          </section>
          </Show>
        </div>
      </Show>
    </main>
  );
}


