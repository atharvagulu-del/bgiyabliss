'use client';
import { useState } from 'react';
import { Leaf, Mail, Phone, MapPin, ArrowRight, Instagram } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className={styles.footer}>
      {/* Newsletter */}
      <div className={styles.newsletter}>
        <div className={styles.container}>
          <div className={styles.newsletterContent}>
            <h3 className={styles.newsletterTitle}>Stay Green, Stay Updated</h3>
            <p className={styles.newsletterDesc}>Sign up for plant care tips, exclusive offers, and new arrivals straight to your inbox.</p>
          </div>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              Subscribe <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.columns}>
            {/* Brand */}
            <div className={styles.brand}>
              <a href="/" className={styles.logo}>
                <Leaf size={24} />
                <span>Bgiya <strong>Bliss</strong></span>
              </a>
              <p className={styles.brandDesc}>
                India&apos;s premium destination for plants, seeds, pots &amp; all gardening essentials. Bringing nature closer to you since 2024.
              </p>
              <div className={styles.social}>
                <a href="https://www.instagram.com/bgiyabliss/" target="_blank" rel="noopener noreferrer" className={styles.igIcon} aria-label="Instagram">
                  <Instagram size={24} />
                  <span className={styles.igHandle}>@bgiyabliss</span>
                </a>
              </div>
            </div>

            {/* About Us */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>About Us</h4>
              <ul className={styles.colList}>
                <li><a href="/pages/our-story">Our Story</a></li>
                <li><a href="/pages/contact">Contact Us</a></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Customer Care</h4>
              <ul className={styles.colList}>
                <li><a href="/track">Track Order</a></li>
                <li><a href="/pages/shipping-policy">Shipping Policy</a></li>
                <li><a href="/pages/refund-policy">Refund Policy</a></li>
                <li><a href="/pages/privacy-policy">Privacy Policy</a></li>
                <li><a href="/pages/terms-and-conditions">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Our Services */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Our Services</h4>
              <ul className={styles.colList}>
                <li><a href="/pages/plant-parent-club">Plant Parent Club</a></li>
                <li><a href="/pages/doctor-green">Doctor Green</a></li>
                <li><a href="/pages/corporate-gifting">Corporate Gifting</a></li>
                <li><a href="/pages/plant-subscriptions">Subscriptions</a></li>
              </ul>
            </div>

            {/* Get in Touch */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Get in Touch</h4>
              <ul className={styles.contactList}>
                <li>
                  <Phone size={16} />
                  <span>+91 95713 89234</span>
                </li>
                <li>
                  <Mail size={16} />
                  <span>bgiyabliss73@gmail.com</span>
                </li>
                <li>
                  <MapPin size={16} />
                  <span>Kot Baori, Kota, Rajasthan 325001</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <div className={styles.container}>
          <p>© 2024-2026 Bgiya Bliss. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
