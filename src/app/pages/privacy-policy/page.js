import { ArrowLeft, Shield, Clock, Eye, Cookie, Lock, UserCheck, Link2, Phone, Mail, MapPin } from 'lucide-react';
import styles from '../Policy.module.css';

export const metadata = {
  title: 'Privacy Policy | Bgiya Bliss',
  description: 'How Bgiya Bliss collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
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
        <div className={styles.heroIcon} style={{ background: 'linear-gradient(135deg, #c7d2fe, #a5b4fc)' }}>
          <Shield size={28} style={{ color: '#4f46e5' }} />
        </div>
        <h1 className={styles.heroTitle}>Privacy Policy</h1>
        <p className={styles.heroSubtitle}>
          Your privacy matters to us. Here&apos;s how we collect, use, and protect your data.
        </p>
        <span className={styles.lastUpdated}>
          <Clock size={12} /> Last updated: May 12, 2026
        </span>
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>

        {/* Info Box */}
        <div className={`${styles.alertBox} ${styles.alertInfo}`}>
          <div className={styles.alertIconInfo}>
            <Shield size={18} style={{ color: '#2563eb' }} />
          </div>
          <p>Bgiya Bliss is committed to protecting your personal information. We never sell or share your data with third parties for marketing purposes.</p>
        </div>

        {/* Section 1 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>1</span>
            <h2 className={styles.sectionTitle}>Information We Collect</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>We collect the following types of information when you use our website:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, and shipping address when you place an order</li>
              <li><strong>Payment Information:</strong> Payment details are processed securely by Razorpay. We do not store your card numbers or banking credentials</li>
              <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on our website for analytics purposes</li>
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>2</span>
            <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
          </div>
          <div className={styles.sectionBody}>
            <ul>
              <li>To process and fulfill your orders</li>
              <li>To communicate about order status, shipping updates, and customer support</li>
              <li>To send promotional emails (only if you opt in via our newsletter)</li>
              <li>To improve our website and shopping experience</li>
              <li>To process payments securely via Razorpay</li>
            </ul>
            <p>We do not sell, trade, or share your personal information with third parties, except as necessary to process payments via Razorpay or as required by law.</p>
          </div>
        </div>

        {/* Section 3 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>3</span>
            <h2 className={styles.sectionTitle}>Payment Security</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>All online payments on Bgiya Bliss are processed through <strong>Razorpay</strong>, a PCI-DSS compliant payment gateway. We do not store your credit/debit card information or net banking credentials.</p>
            <p>For details on Razorpay&apos;s security practices, visit <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer">Razorpay&apos;s Privacy Policy</a>.</p>
          </div>
        </div>

        {/* Section 4 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>4</span>
            <h2 className={styles.sectionTitle}>Cookies</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>Our website uses cookies to enhance your browsing experience. Cookies help us remember your preferences, keep items in your cart, and analyse website traffic.</p>
            <p>You can choose to disable cookies through your browser settings, but this may affect the functionality of our website.</p>
          </div>
        </div>

        {/* Section 5 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>5</span>
            <h2 className={styles.sectionTitle}>Data Security & Retention</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>We implement commercially acceptable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.</p>
            <p>We retain your personal information only as long as necessary to fulfill the purposes described in this policy, comply with legal obligations, and resolve disputes. Order records are retained for accounting and tax purposes as required by Indian law.</p>
          </div>
        </div>

        {/* Section 6 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>6</span>
            <h2 className={styles.sectionTitle}>Your Rights</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>You have the right to:</p>
            <ul>
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of inaccurate personal data</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
          </div>
        </div>

        {/* Section 7 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>7</span>
            <h2 className={styles.sectionTitle}>Third-Party Links</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read the privacy policies of any linked websites.</p>
          </div>
        </div>

        {/* Section 8 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>8</span>
            <h2 className={styles.sectionTitle}>Changes to This Policy</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Your continued use of our website after any changes constitutes your acceptance of the revised policy.</p>
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
          <a href="/pages/shipping-policy">Shipping</a>
          <a href="/pages/terms-and-conditions">Terms</a>
        </div>
      </div>
    </div>
  );
}
