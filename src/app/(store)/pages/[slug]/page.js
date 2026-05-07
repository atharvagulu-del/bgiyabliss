import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import styles from './page.module.css';

// Components for different pages
function ShippingPolicy() {
  return (
    <div className={styles.content}>
      <h2>Shipping Policy</h2>
      <p>At Bgiya Bliss, we strive to deliver your plants and gardening essentials safely and promptly. Please read our shipping policy carefully to understand our processes.</p>
      
      <h3>Processing Time</h3>
      <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or public holidays.</p>
      
      <h3>Shipping Rates & Delivery Estimates</h3>
      <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
      <ul>
        <li><strong>Prepaid Orders:</strong> ₹54 flat rate shipping.</li>
        <li><strong>Cash on Delivery (COD) Orders:</strong> ₹84 flat rate shipping.</li>
        <li><strong>Free Shipping:</strong> Available on promotional orders or specific cart values as advertised.</li>
      </ul>
      <p>Delivery typically takes 3-5 business days depending on your location. Deliveries to remote areas may take longer.</p>
      
      <h3>Order Tracking</h3>
      <p>You will receive a shipment confirmation email or SMS once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
      
      <h3>Damages</h3>
      <p>Bgiya Bliss takes utmost care in packaging plants securely. However, if your order arrives damaged, please contact us immediately with photos of the damaged items and packaging. We will arrange a replacement or refund.</p>
    </div>
  );
}

function ReturnPolicy() {
  return (
    <div className={styles.content}>
      <h2>Return & Refund Policy</h2>
      <p>We want you to be completely satisfied with your purchase. Due to the perishable nature of plants, our return policy is specific to ensure fairness and quality.</p>
      
      <h3>7-Day Replacement Guarantee</h3>
      <p>If your plant arrives dead or severely damaged, we offer a free replacement. You must report the issue within 7 days of delivery with clear photographs of the plant and its original packaging.</p>
      
      <h3>Non-Plant Items</h3>
      <p>For pots, tools, fertilizers, and other non-perishable items, we accept returns within 7 days of delivery. The item must be unused, in its original packaging, and in the same condition that you received it.</p>
      
      <h3>Refund Process</h3>
      <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed to your original method of payment within 5-7 business days.</p>
      
      <h3>Exchanges</h3>
      <p>We only replace items if they are defective or damaged. If you need to exchange an item, please contact our customer support.</p>
    </div>
  );
}

function FAQ() {
  return (
    <div className={styles.content}>
      <h2>Frequently Asked Questions</h2>
      
      <div className={styles.faqItem}>
        <div className={styles.faqQuestion}>Do you deliver plants safely?</div>
        <div className={styles.faqAnswer}>Yes! We use specially designed ventilated packaging to ensure plants arrive fresh and healthy. Our packaging prevents soil spillage and protects the leaves during transit.</div>
      </div>
      
      <div className={styles.faqItem}>
        <div className={styles.faqQuestion}>How do I care for my new plant?</div>
        <div className={styles.faqAnswer}>Every plant comes with basic care instructions. You can also check the "How to Use" and "Technical Details" sections on the product page for specific watering and light requirements.</div>
      </div>
      
      <div className={styles.faqItem}>
        <div className={styles.faqQuestion}>What is your return policy for dead plants?</div>
        <div className={styles.faqAnswer}>We offer a 7-Day Replacement Guarantee. If your plant arrives dead or damaged, send us a photo within 7 days, and we will send a free replacement.</div>
      </div>
      
      <div className={styles.faqItem}>
        <div className={styles.faqQuestion}>Do you offer Cash on Delivery (COD)?</div>
        <div className={styles.faqAnswer}>Yes, COD is available for a flat shipping fee of ₹84. We recommend prepaid orders for a lower shipping fee of ₹54 and a contactless delivery experience.</div>
      </div>
      
      <div className={styles.faqItem}>
        <div className={styles.faqQuestion}>How long does delivery take?</div>
        <div className={styles.faqAnswer}>Orders are usually delivered within 3-5 business days depending on your location.</div>
      </div>
    </div>
  );
}

function ContactUs() {
  return (
    <div className={styles.content}>
      <h2>Contact Us</h2>
      <p>Have a question, feedback, or need help with your plants? We'd love to hear from you. Reach out to us using the form below or our contact details.</p>
      
      <div className={styles.contactGrid}>
        <div>
          <form className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input type="text" className={styles.formInput} placeholder="Jane Doe" />
            </div>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input type="email" className={styles.formInput} placeholder="jane@example.com" />
            </div>
            <div className={styles.formGroup}>
              <label>Subject</label>
              <input type="text" className={styles.formInput} placeholder="Order Issue / Plant Care Question" />
            </div>
            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea className={styles.formTextarea} placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className={styles.submitBtn}>Send Message</button>
          </form>
        </div>
        
        <div className={styles.contactInfo}>
          <h3>Get in Touch</h3>
          <div className={styles.contactItem}>
            <Phone className={styles.contactIcon} size={20} />
            <div>
              <strong>Phone</strong>
              <p>+91 77379 76414<br/><span style={{fontSize: '13px', color: '#6b7280'}}>Mon-Sat, 9am - 6pm</span></p>
            </div>
          </div>
          <div className={styles.contactItem}>
            <Mail className={styles.contactIcon} size={20} />
            <div>
              <strong>Email</strong>
              <p>Bgiyabliss73@gmail.com</p>
            </div>
          </div>
          <div className={styles.contactItem}>
            <MapPin className={styles.contactIcon} size={20} />
            <div>
              <strong>Office</strong>
              <p>Mumbai, Maharashtra, India<br/><span style={{fontSize: '13px', color: '#6b7280'}}>Online Store Only</span></p>
            </div>
          </div>
          <div className={styles.contactItem}>
            <Clock className={styles.contactIcon} size={20} />
            <div>
              <strong>Support Hours</strong>
              <p>Monday to Saturday<br/>9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OurStory() {
  return (
    <div className={styles.content}>
      <div className={styles.storyHero}>
        <Image src="/bgiya_premium_hero_hd_1775620854193.png" alt="Bgiya Bliss Team" fill className={styles.storyHeroImg} />
        <div className={styles.storyHeroOverlay}>
          <h1 className={styles.storyHeroTitle}>Where Every Leaf<br/>Tells a Story</h1>
        </div>
      </div>
      
      <h2>Our Mission</h2>
      <p>At Bgiya Bliss, we believe that bringing nature indoors shouldn't be complicated. Our mission is to make gardening accessible, joyful, and successful for everyone, from seasoned green thumbs to nervous first-time plant parents.</p>
      
      <h3>How We Started</h3>
      <p>Born out of a shared love for greenery in 2024, Bgiya Bliss started as a small initiative to provide high-quality, organic gardening supplies. We noticed that many people wanted to grow plants but struggled with poor quality soil, chemical-heavy fertilizers, and lack of guidance. We decided to bridge that gap.</p>
      
      <h3>Our Commitment to Quality</h3>
      <p>We source our products carefully, prioritizing organic and eco-friendly options. Whether it's our premium potting mix, nutrient-rich neem cake, or our sturdy planters, every product is tested and loved by our own team before it makes its way to your home.</p>
      
      <h3>The Bgiya Bliss Community</h3>
      <p>We're more than just a store; we're a community of plant lovers. Through our "Plant Parent Club" and "Doctor Green" initiatives, we aim to provide the support and knowledge you need to watch your garden thrive.</p>
    </div>
  );
}

export default async function InformationalPage({ params }) {
  const { slug } = await params;
  
  const getTitle = () => {
    switch (slug) {
      case 'shipping': return 'Shipping Policy';
      case 'returns': return 'Return Policy';
      case 'contact': return 'Contact Us';
      case 'faq': return 'FAQs';
      case 'our-story': return 'Our Story';
      default: return slug.replace(/-/g, ' ');
    }
  };

  return (
    <div className={styles.pageContainer}>
      {slug !== 'our-story' && (
        <h1 className={styles.pageTitle} style={{ textTransform: 'capitalize' }}>
          {getTitle()}
        </h1>
      )}
      
      {slug === 'shipping' && <ShippingPolicy />}
      {slug === 'returns' && <ReturnPolicy />}
      {slug === 'faq' && <FAQ />}
      {slug === 'contact' && <ContactUs />}
      {slug === 'our-story' && <OurStory />}
      
      {/* Fallback for unbuilt pages */}
      {!['shipping', 'returns', 'faq', 'contact', 'our-story'].includes(slug) && (
        <div className={styles.content}>
          <p style={{ textAlign: 'center', color: 'var(--color-gray-600)' }}>
            This page is currently being updated. Please check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
