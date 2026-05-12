import { ArrowLeft, ShieldX, Clock, AlertTriangle, PackageX, Truck, Phone, Mail, MapPin } from 'lucide-react';
import styles from '../Policy.module.css';

export const metadata = {
  title: 'Refund & Cancellation Policy | Bgiya Bliss',
  description: 'Refund and cancellation policy for Bgiya Bliss fertilizers and gardening products. All sales are final.',
};

export default function RefundPolicy() {
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
        <div className={styles.heroIcon} style={{ background: 'linear-gradient(135deg, #fecaca, #fca5a5)' }}>
          <ShieldX size={28} style={{ color: '#dc2626' }} />
        </div>
        <h1 className={styles.heroTitle}>Refund & Cancellation Policy</h1>
        <p className={styles.heroSubtitle}>
          Please read this policy carefully before placing your order on Bgiya Bliss.
        </p>
        <span className={styles.lastUpdated}>
          <Clock size={12} /> Last updated: May 12, 2026
        </span>
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>

        {/* Alert */}
        <div className={`${styles.alertBox} ${styles.alertDanger}`}>
          <div className={styles.alertIconDanger}>
            <AlertTriangle size={18} style={{ color: '#dc2626' }} />
          </div>
          <p>All sales on Bgiya Bliss are final. We do not offer refunds or returns on any products, including fertilizers, potting mixes, seeds, and gardening accessories, due to their perishable and consumable nature.</p>
        </div>

        {/* Section 1 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>1</span>
            <h2 className={styles.sectionTitle}>No Refund Policy</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>Bgiya Bliss sells fertilizers, organic manures, potting mixes, seeds, and gardening supplies. Due to the perishable, consumable, and hygiene-sensitive nature of these products, <strong>all sales are final and non-refundable</strong>.</p>
            <p>Once an order is placed and dispatched, no monetary refund will be issued under any circumstances.</p>
          </div>
        </div>

        {/* Section 2 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>2</span>
            <h2 className={styles.sectionTitle}>Order Cancellations</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>You may request cancellation of your order <strong>within 6 hours of placing it</strong>, provided the order has not already been dispatched. Once shipped, it cannot be cancelled.</p>
            <p>To request a cancellation, contact us immediately at <strong>bgiyabliss73@gmail.com</strong> or call <strong>+91 95713 89234</strong>.</p>
          </div>
        </div>

        {/* Section 3 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>3</span>
            <h2 className={styles.sectionTitle}>Damaged or Defective Products</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>If your product arrives damaged, broken, or is materially different from what was ordered, you must report the issue <strong>within 24 hours of delivery</strong> by contacting us with:</p>
            <ul>
              <li>Your Order ID</li>
              <li>Clear photographs of the damaged product</li>
              <li>Clear photographs of the outer packaging</li>
              <li>An unboxing video (if available)</li>
            </ul>
            <p>Upon verification, we will send a <strong>free replacement</strong> of the same product. No monetary refund will be provided — only a replacement, subject to stock availability.</p>
          </div>
        </div>

        {/* Section 4 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>4</span>
            <h2 className={styles.sectionTitle}>Non-Returnable Items</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>The following items are strictly non-returnable and non-refundable:</p>
            <ul>
              <li>Fertilizers (organic and inorganic)</li>
              <li>Potting mixes and soil blends</li>
              <li>Seeds and seed kits</li>
              <li>Neem cake, vermicompost, and bio-fertilizers</li>
              <li>Gardening tools and accessories (once used or opened)</li>
              <li>Combo packs and value bundles</li>
              <li>Any product that has been opened, used, or tampered with</li>
            </ul>
          </div>
        </div>

        {/* Section 5 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>5</span>
            <h2 className={styles.sectionTitle}>Cash on Delivery (COD) Orders</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>COD orders are subject to the same no-refund policy. Refusal to accept delivery of a COD order without a valid reason may result in the customer being blocked from future COD purchases.</p>
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
          <a href="/pages/shipping-policy">Shipping</a>
          <a href="/pages/privacy-policy">Privacy</a>
          <a href="/pages/terms-and-conditions">Terms</a>
        </div>
      </div>
    </div>
  );
}
