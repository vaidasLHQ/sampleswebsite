// ============================================
// FrogDrip Payment SDK - Embeddable Widget
// ============================================
// This widget can be embedded via <script> tag on any website
// Usage: <script src="https://sdk.frogdrip.com/widget.js"></script>
// Then: FrogDripPayments.checkout({ ... })

import type { LineItem, PaymentProvider } from '../types';

/**
 * Widget configuration
 */
interface WidgetConfig {
  /** FrogDrip Platform API endpoint */
  apiEndpoint: string;
  /** Connected account ID (seller) */
  accountId: string;
  /** Theme */
  theme?: 'light' | 'dark' | 'auto';
  /** Brand color (hex) */
  brandColor?: string;
  /** Logo URL */
  logoUrl?: string;
}

/**
 * Checkout options for the popup
 */
interface CheckoutOptions {
  /** Line items to purchase */
  items: Array<{
    name: string;
    price: number; // In dollars (e.g., 9.99)
    quantity?: number;
    image?: string;
  }>;
  /** Customer email (optional, will ask if not provided) */
  customerEmail?: string;
  /** Your order/reference ID */
  orderId?: string;
  /** Allowed payment methods */
  paymentMethods?: PaymentProvider[];
  /** Callback on successful payment */
  onSuccess?: (data: { orderId: string; sessionId: string }) => void;
  /** Callback on cancelled payment */
  onCancel?: () => void;
  /** Callback on error */
  onError?: (error: Error) => void;
}

/**
 * Modal state
 */
interface ModalState {
  isOpen: boolean;
  loading: boolean;
  error: string | null;
  checkoutUrl: string | null;
}

// ==========================================
// Widget Implementation
// ==========================================

class FrogDripPaymentWidget {
  private config: WidgetConfig | null = null;
  private modal: HTMLDivElement | null = null;
  private iframe: HTMLIFrameElement | null = null;
  private state: ModalState = {
    isOpen: false,
    loading: false,
    error: null,
    checkoutUrl: null,
  };

  /**
   * Initialize the widget
   * 
   * @example
   * FrogDripPayments.init({
   *   apiEndpoint: 'https://api.frogdrip.com',
   *   accountId: 'acct_xxx',
   *   theme: 'dark',
   *   brandColor: '#ff3232'
   * });
   */
  init(config: WidgetConfig): void {
    this.config = config;
    this.injectStyles();
    this.createModal();
    console.log('[FrogDrip] Payment widget initialized');
  }

  /**
   * Open checkout popup
   * 
   * @example
   * FrogDripPayments.checkout({
   *   items: [
   *     { name: 'Sample Pack', price: 9.99, quantity: 1 }
   *   ],
   *   customerEmail: 'customer@example.com',
   *   orderId: 'order_123',
   *   onSuccess: (data) => console.log('Payment successful!', data),
   *   onCancel: () => console.log('Payment cancelled'),
   *   onError: (err) => console.error('Payment error:', err)
   * });
   */
  async checkout(options: CheckoutOptions): Promise<void> {
    if (!this.config) {
      throw new Error('[FrogDrip] Widget not initialized. Call FrogDripPayments.init() first.');
    }

    this.state.loading = true;
    this.state.error = null;
    this.openModal();
    this.updateModalContent();

    try {
      // Convert items to line items format
      const lineItems: LineItem[] = options.items.map((item) => ({
        name: item.name,
        amountCents: Math.round(item.price * 100),
        quantity: item.quantity || 1,
        imageUrl: item.image,
      }));

      // Generate order ID if not provided
      const orderId = options.orderId || `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create checkout session via API
      const response = await fetch(`${this.config.apiEndpoint}/checkout/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: this.config.accountId,
          lineItems,
          customerEmail: options.customerEmail,
          orderId,
          successUrl: `${this.config.apiEndpoint}/checkout/success?orderId=${orderId}`,
          cancelUrl: `${this.config.apiEndpoint}/checkout/cancel?orderId=${orderId}`,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create checkout session');
      }

      const session = await response.json();
      
      this.state.loading = false;
      this.state.checkoutUrl = session.url;
      
      // Load Stripe checkout in iframe
      if (this.iframe) {
        this.iframe.src = session.url;
      }

      // Set up message listener for completion
      const messageHandler = (event: MessageEvent) => {
        if (event.data?.type === 'frogdrip:checkout:success') {
          window.removeEventListener('message', messageHandler);
          this.closeModal();
          options.onSuccess?.({ orderId, sessionId: session.id });
        } else if (event.data?.type === 'frogdrip:checkout:cancel') {
          window.removeEventListener('message', messageHandler);
          this.closeModal();
          options.onCancel?.();
        }
      };
      window.addEventListener('message', messageHandler);

    } catch (error) {
      this.state.loading = false;
      this.state.error = error instanceof Error ? error.message : 'Unknown error';
      this.updateModalContent();
      options.onError?.(error instanceof Error ? error : new Error('Unknown error'));
    }
  }

  /**
   * Close the checkout modal
   */
  close(): void {
    this.closeModal();
  }

  // ==========================================
  // Private Methods
  // ==========================================

  private injectStyles(): void {
    if (document.getElementById('frogdrip-widget-styles')) return;

    const brandColor = this.config?.brandColor || '#ff3232';
    const theme = this.config?.theme || 'dark';
    const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const styles = document.createElement('style');
    styles.id = 'frogdrip-widget-styles';
    styles.textContent = `
      .frogdrip-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(4px);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      
      .frogdrip-overlay.open {
        opacity: 1;
        visibility: visible;
      }
      
      .frogdrip-modal {
        background: ${isDark ? '#1a1a1a' : '#ffffff'};
        border-radius: 16px;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        transform: scale(0.95);
        transition: transform 0.3s ease;
      }
      
      .frogdrip-overlay.open .frogdrip-modal {
        transform: scale(1);
      }
      
      .frogdrip-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid ${isDark ? '#333' : '#eee'};
      }
      
      .frogdrip-logo {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
        font-weight: 600;
        color: ${isDark ? '#fff' : '#000'};
      }
      
      .frogdrip-logo-icon {
        width: 24px;
        height: 24px;
        background: ${brandColor};
        border-radius: 6px;
      }
      
      .frogdrip-close {
        background: none;
        border: none;
        color: ${isDark ? '#888' : '#666'};
        cursor: pointer;
        padding: 8px;
        font-size: 24px;
        line-height: 1;
      }
      
      .frogdrip-close:hover {
        color: ${isDark ? '#fff' : '#000'};
      }
      
      .frogdrip-content {
        padding: 20px;
        min-height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      
      .frogdrip-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        color: ${isDark ? '#888' : '#666'};
      }
      
      .frogdrip-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid ${isDark ? '#333' : '#eee'};
        border-top-color: ${brandColor};
        border-radius: 50%;
        animation: frogdrip-spin 1s linear infinite;
      }
      
      @keyframes frogdrip-spin {
        to { transform: rotate(360deg); }
      }
      
      .frogdrip-error {
        color: #ef4444;
        text-align: center;
        padding: 20px;
      }
      
      .frogdrip-iframe {
        width: 100%;
        height: 500px;
        border: none;
      }
      
      .frogdrip-powered {
        padding: 12px 20px;
        text-align: center;
        font-size: 12px;
        color: ${isDark ? '#666' : '#999'};
        border-top: 1px solid ${isDark ? '#333' : '#eee'};
      }
      
      .frogdrip-powered a {
        color: ${brandColor};
        text-decoration: none;
      }
    `;
    document.head.appendChild(styles);
  }

  private createModal(): void {
    if (this.modal) return;

    this.modal = document.createElement('div');
    this.modal.className = 'frogdrip-overlay';
    this.modal.innerHTML = `
      <div class="frogdrip-modal">
        <div class="frogdrip-header">
          <div class="frogdrip-logo">
            <div class="frogdrip-logo-icon"></div>
            <span>Checkout</span>
          </div>
          <button class="frogdrip-close" aria-label="Close">×</button>
        </div>
        <div class="frogdrip-content">
          <div class="frogdrip-loading">
            <div class="frogdrip-spinner"></div>
            <span>Preparing checkout...</span>
          </div>
        </div>
        <div class="frogdrip-powered">
          Powered by <a href="https://frogdrip.com" target="_blank">FrogDrip</a>
        </div>
      </div>
    `;

    // Close button handler
    const closeBtn = this.modal.querySelector('.frogdrip-close');
    closeBtn?.addEventListener('click', () => this.closeModal());

    // Click outside to close
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    document.body.appendChild(this.modal);
  }

  private updateModalContent(): void {
    if (!this.modal) return;

    const content = this.modal.querySelector('.frogdrip-content');
    if (!content) return;

    if (this.state.loading) {
      content.innerHTML = `
        <div class="frogdrip-loading">
          <div class="frogdrip-spinner"></div>
          <span>Preparing checkout...</span>
        </div>
      `;
    } else if (this.state.error) {
      content.innerHTML = `
        <div class="frogdrip-error">
          <p>⚠️ ${this.state.error}</p>
          <p>Please try again or contact support.</p>
        </div>
      `;
    } else if (this.state.checkoutUrl) {
      content.innerHTML = `<iframe class="frogdrip-iframe" src="${this.state.checkoutUrl}"></iframe>`;
      this.iframe = content.querySelector('iframe');
    }
  }

  private openModal(): void {
    this.state.isOpen = true;
    this.modal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  private closeModal(): void {
    this.state.isOpen = false;
    this.state.checkoutUrl = null;
    this.modal?.classList.remove('open');
    document.body.style.overflow = '';
    
    // Reset content
    const content = this.modal?.querySelector('.frogdrip-content');
    if (content) {
      content.innerHTML = `
        <div class="frogdrip-loading">
          <div class="frogdrip-spinner"></div>
          <span>Preparing checkout...</span>
        </div>
      `;
    }
  }
}

// ==========================================
// Global Instance (for IIFE bundle)
// ==========================================

const widget = new FrogDripPaymentWidget();

// Export for script tag usage
export const init = widget.init.bind(widget);
export const checkout = widget.checkout.bind(widget);
export const close = widget.close.bind(widget);

// Auto-init from data attributes
if (typeof window !== 'undefined') {
  const script = document.currentScript as HTMLScriptElement | null;
  if (script) {
    const apiEndpoint = script.dataset.apiEndpoint;
    const accountId = script.dataset.accountId;
    
    if (apiEndpoint && accountId) {
      widget.init({
        apiEndpoint,
        accountId,
        theme: (script.dataset.theme as 'light' | 'dark') || 'dark',
        brandColor: script.dataset.brandColor,
        logoUrl: script.dataset.logoUrl,
      });
    }
  }
}

