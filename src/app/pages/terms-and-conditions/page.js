import { ArrowLeft, ScrollText, Clock, Phone, Mail, MapPin, CreditCard, Scale } from 'lucide-react';
import styles from '../Policy.module.css';

export const metadata = {
  title: 'Terms & Conditions | Bgiya Bliss',
  description: 'Terms and conditions for using the Bgiya Bliss online store.',
};

export default function TermsAndConditions() {
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
        <div className={styles.heroIcon} style={{ background: 'linear-gradient(135deg, #fde68a, #fbbf24)' }}>
          <ScrollText size={28} style={{ color: '#92400e' }} />
        </div>
        <h1 className={styles.heroTitle}>Terms & Conditions</h1>
        <p className={styles.heroSubtitle}>
          By using Bgiya Bliss, you agree to these terms. Please read them carefully.
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
            <h2 className={styles.sectionTitle}>Business Information</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>Bgiya Bliss is an online retail business registered under GST with registration number <strong>08CAZPM1074R1ZL</strong>.</p>
            <ul>
              <li><strong>Address:</strong> Ground Floor, Khasra No. 754, Aamli, Kanwas, Kot Baori, Kota, Rajasthan – 325001, India</li>
              <li><strong>Email:</strong> bgiyabliss73@gmail.com</li>
              <li><strong>Phone:</strong> +91 95713 89234</li>
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>2</span>
            <h2 className={styles.sectionTitle}>Products & Services</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>Bgiya Bliss is an online retail store specialising in the sale of organic fertilizers, potting mixes, seeds, neem-based products, vermicompost, gardening tools, planters, and related gardening supplies. All products are subject to availability.</p>
            <p>We make every effort to display accurate product descriptions, images, and prices. However, slight variations in colour or appearance may occur due to screen settings. Product weights and dimensions are approximate.</p>
          </div>
        </div>

        {/* Section 3 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>3</span>
            <h2 className={styles.sectionTitle}>Eligibility</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>By using this website, you represent that you are at least 18 years of age or have the consent of a parent or guardian. You agree to provide accurate, current, and complete information during the purchase process.</p>
          </div>
        </div>

        {/* Section 4 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>4</span>
            <h2 className={styles.sectionTitle}>Pricing & Payments</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>All prices are in Indian Rupees (₹) and inclusive of applicable taxes unless stated otherwise. We reserve the right to modify prices at any time without prior notice.</p>
            <p>We accept payments via:</p>
            <ul>
              <li><strong>Prepaid:</strong> UPI, Debit/Credit Cards, Net Banking, and Wallets via Razorpay</li>
              <li><strong>Cash on Delivery (COD):</strong> Available with shipping + COD handling fee calculated at checkout</li>
            </ul>
            <p>All online transactions are processed securely through <strong>Razorpay</strong>. We do not store your card details. For Razorpay&apos;s privacy practices, see <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer">Razorpay&apos;s Privacy Policy</a>.</p>
          </div>
        </div>

        {/* Section 5 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>5</span>
            <h2 className={styles.sectionTitle}>Orders & Acceptance</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>Placing an order constitutes an offer to purchase. We reserve the right to accept or reject any order for any reason, including product unavailability, pricing errors, or suspected fraud.</p>
            <p>An order confirmation does not constitute acceptance. The order is considered accepted only when the product has been dispatched.</p>
          </div>
        </div>

        {/* Section 6 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>6</span>
            <h2 className={styles.sectionTitle}>Shipping & Delivery</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>Please refer to our <a href="/pages/shipping-policy">Shipping Policy</a> for detailed information on processing times, shipping rates, and delivery estimates.</p>
          </div>
        </div>

        {/* Section 7 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>7</span>
            <h2 className={styles.sectionTitle}>No Refund & No Return Policy</h2>
          </div>
          <div className={styles.sectionBody}>
            <p><strong>All sales are final.</strong> Due to the perishable and consumable nature of our products (fertilizers, potting mixes, seeds, etc.), we do not offer refunds or returns. Only replacements are provided for damaged or defective products, subject to verification within 24 hours of delivery.</p>
            <p>See our <a href="/pages/refund-policy">Refund & Cancellation Policy</a> for complete details.</p>
          </div>
        </div>

        {/* Section 8 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>8</span>
            <h2 className={styles.sectionTitle}>Intellectual Property</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>All content on this website, including text, graphics, logos, images, and software, is the property of Bgiya Bliss and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without our prior written consent.</p>
          </div>
        </div>

        {/* Section 9 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>9</span>
            <h2 className={styles.sectionTitle}>User Accounts</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>When you create an account, you are responsible for maintaining the confidentiality of your login credentials. You agree to accept responsibility for all activities under your account. We reserve the right to suspend or terminate accounts at our discretion.</p>
          </div>
        </div>

        {/* Section 10 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>10</span>
            <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>Bgiya Bliss shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or website. Our total liability shall not exceed the purchase price of the product in question.</p>
            <p>We do not guarantee specific results from the use of our fertilizers, seeds, or gardening products, as plant growth depends on numerous external factors.</p>
          </div>
        </div>

        {/* Section 11 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>11</span>
            <h2 className={styles.sectionTitle}>Indemnification</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>You agree to indemnify, defend, and hold harmless Bgiya Bliss, its owner, employees, and agents from any claims, losses, damages, liabilities, or expenses arising from your use of the website, violation of these terms, or infringement of any third-party rights.</p>
          </div>
        </div>

        {/* Section 12 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>12</span>
            <h2 className={styles.sectionTitle}>Governing Law & Jurisdiction</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in <strong>Kota, Rajasthan, India</strong>.</p>
          </div>
        </div>

        {/* Section 13 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>13</span>
            <h2 className={styles.sectionTitle}>Changes to These Terms</h2>
          </div>
          <div className={styles.sectionBody}>
            <p>Bgiya Bliss reserves the right to update or modify these terms at any time without prior notice. Your continued use of the website after any changes constitutes your acceptance of the revised terms.</p>
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
          <a href="/pages/privacy-policy">Privacy</a>
        </div>
      </div>
    </div>
  );
}
