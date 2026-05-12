import { ArrowLeft, Truck, Clock, PackageCheck, MapPin, Phone, Mail, AlertCircle } from 'lucide-react';
import styles from '../Policy.module.css';

export const metadata = {
  title: 'Shipping & Delivery Policy | Bgiya Bliss',
  description: 'Shipping rates, delivery estimates, and packaging details for Bgiya Bliss orders.',
};

export default function ShippingPolicy() {
  return (
    <div className={styles.policyPage}>
      {/* ── Sticky Back Bar ── */}
      <div className={styles.backBar}>
        <div className={styles.backBarInner}>
          <a href="/" className={styles.backLink}>
            <ArrowLeft size={18} /> Back to Store
          </a>
          <span className={styles.backBarBrand}>Bgiya Bliss</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className={styles.heroHeader}>
        <div className={styles.heroIcon} style={{ background: 'linear-gradient(135deg, #bbf7d0, #86efac)' }}>
          <Truck size={28} style={{ color: '#16a34a' }} />
        </div>
        <h1 className={styles.heroTitle}>Shipping & Delivery Policy</h1>
        <p className={styles.heroSubtitle}>
          We ensure your fertilizers and gardening products arrive safely and on time.
        </p>
        <span className={styles.lastUpdated}>
          <Clock size={12} /> Last updated: May 12, 2026
        </span>
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>

        {/* Section 1 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>1</span>
            <h2 className={styles.sectionTitle}>Processing Time</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>All orders are processed within <strong>1–2 business days</strong> after payment confirmation. Orders placed on weekends or public holidays will be processed on the next business day.</p>
            <p>During peak seasons or promotional events, processing may take an additional 1–2 days.</p>
          </div>
        </div>

        {/* Section 2 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>2</span>
            <h2 className={styles.sectionTitle}>Shipping Rates & Delivery Estimates</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>Shipping charges are calculated at checkout based on your delivery location, order weight, and chosen payment method:</p>
            <ul>
              <li><strong>Prepaid Orders (UPI / Card / Net Banking):</strong> Starting at ₹54 — Delivery within 3–5 business days</li>
              <li><strong>Cash on Delivery (COD):</strong> Starting at ₹84 (includes COD handling fee) — Delivery within 4–7 business days</li>
            </ul>
            <p>Final shipping charges will be displayed on the checkout page before you confirm your order. Rates may vary for heavy items or remote locations. Deliveries to remote or rural areas may take an additional 2–3 business days.</p>
          </div>
        </div>

        {/* Section 3 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>3</span>
            <h2 className={styles.sectionTitle}>Shipping Partners</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>We use reputed courier partners to deliver your orders across India. Once your order is shipped, you will receive a tracking number via SMS or email to track your shipment in real time.</p>
          </div>
        </div>

        {/* Section 4 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>4</span>
            <h2 className={styles.sectionTitle}>Product Packaging</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>All products are carefully packed to prevent damage during transit. Fertilizers, potting mixes, and powdered products are sealed in moisture-resistant packaging. Fragile items are wrapped with additional cushioning.</p>
          </div>
        </div>

        {/* Section 5 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>5</span>
            <h2 className={styles.sectionTitle}>Order Tracking</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>Once your order is dispatched, you will receive a shipment confirmation with a tracking number. The tracking number becomes active within 24 hours. You can track your order on our website or directly with the courier partner.</p>
          </div>
        </div>

        {/* Section 6 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>6</span>
            <h2 className={styles.sectionTitle}>Delivery Issues</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>If your order arrives damaged or you receive the wrong product, please contact us within <strong>24 hours</strong> of delivery with photographs of the product and packaging.</p>
            <p>We will arrange a replacement as per our <a href="/pages/refund-policy">Refund & Cancellation Policy</a>. Please note that monetary refunds are not available — only replacements.</p>
          </div>
        </div>

        {/* Section 7 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>7</span>
            <h2 className={styles.sectionTitle}>Undeliverable Orders</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>If a delivery attempt fails due to an incorrect address, unavailability of the recipient, or refusal to accept, the order will be returned to us. In such cases, re-shipping charges will apply, and no refund will be issued for the original shipping fee.</p>
          </div>
        </div>

        {/* Contact Card */}
        <div className={styles.contactCard}>
          <h3 className={styles.contactTitle}>
            <Phone size={20} style={{ color: '#16a34a' }} /> Contact Us
          </h3>
          <div className={styles.contactGrid}>
            <div className={styles.contactItem}>
              <div className={styles.contactItemIcon}><Mail size={16} /></div>
              <div>
                <div className={styles.contactItemLabel}>Email</div>
                <div className={styles.contactItemValue}>bgiyabliss73@gmail.com</div>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactItemIcon}><Phone size={16} /></div>
              <div>
                <div className={styles.contactItemLabel}>Phone</div>
                <div className={styles.contactItemValue}>+91 95713 89234</div>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactItemIcon}><MapPin size={16} /></div>
              <div>
                <div className={styles.contactItemLabel}>Address</div>
                <div className={styles.contactItemValue}>Khasra No. 754, Aamli, Kanwas, Kot Baori, Kota, Rajasthan – 325001</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footerBar}>
        <span className={styles.footerGst}>Bgiya Bliss | GSTIN: 08CAZPM1074R1ZL</span>
        <div className={styles.footerLinks}>
          <a href="/pages/refund-policy">Refund</a>
          <a href="/pages/privacy-policy">Privacy</a>
          <a href="/pages/terms-and-conditions">Terms</a>
        </div>
      </div>
    </div>
  );
}
