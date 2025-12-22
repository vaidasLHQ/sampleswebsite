import { createSignal, onMount, For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { supabase } from "~/lib/supabase";
import { samples } from "~/data/samples";
import SEO from "~/components/SEO";
import type { User } from "@supabase/supabase-js";

interface PurchasedSample {
  sample_id: number;
  purchased_at: string;
}

export default function Vault() {
  const navigate = useNavigate();
  const [user, setUser] = createSignal<User | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [purchasedSamples, setPurchasedSamples] = createSignal<PurchasedSample[]>([]);
  const [downloadingId, setDownloadingId] = createSignal<number | null>(null);

  onMount(async () => {
    // Check authentication
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      // Not logged in - redirect to login
      navigate("/login", { replace: true });
      return;
    }
    
    setUser(session.user);
    
    // Fetch user's purchased samples
    await fetchPurchasedSamples(session.user.id, session.user.email || "");
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

  const getSampleDetails = (sampleId: number) => {
    return samples.find(s => s.id === sampleId);
  };

  const handleDownload = async (sampleId: number) => {
    const sample = getSampleDetails(sampleId);
    if (!sample) return;

    setDownloadingId(sampleId);
    
    try {
      // Get signed URL for the full-quality file
      const { data, error } = await supabase.storage
        .from('sample-full')
        .createSignedUrl(sample.fullStoragePath, 3600); // 1 hour expiry

      if (error || !data?.signedUrl) {
        console.error('Error getting download URL:', error);
        alert('Failed to generate download link. Please try again.');
        return;
      }

      // Trigger download
      const link = document.createElement('a');
      link.href = data.signedUrl;
      link.download = sample.filename;
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
          {/* My Samples Section */}
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
                      <div class="vault-sample-card">
                        <div class="vault-sample-artwork">
                          <img src={sample.artwork} alt={sample.packName} loading="lazy" />
                          <div class="vault-sample-play">
                            <button class="vault-play-btn">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
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
                                Download WAV
                              </>
                            }>
                              <svg class="vault-spinner" width="16" height="16" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="31.4" stroke-dashoffset="10"/>
                              </svg>
                              Downloading...
                            </Show>
                          </button>
                        </div>
                      </div>
                    );
                  }}
                </For>
              </div>
            </Show>
          </section>
        </div>
      </Show>
    </main>
  );
}


