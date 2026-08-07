import styles from './WhyChooseUs.module.css';
import { Leaf, FlaskConical, ShieldCheck, Sprout } from 'lucide-react';

const reasons = [
  {
    icon: <Leaf size={28} strokeWidth={1.5} />,
    title: '100% Organic',
    desc: 'Chemical-free & natural.',
  },
  {
    icon: <FlaskConical size={28} strokeWidth={1.5} />,
    title: 'Premium Quality',
    desc: 'Handpicked ingredients.',
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    title: 'Made in India',
    desc: 'Locally sourced.',
  },
  {
    icon: <Sprout size={28} strokeWidth={1.5} />,
    title: 'Proven Results',
    desc: 'For healthier plants.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      {/* Background Video — slightly zoomed to crop out watermark */}
      <div className={styles.bgVideoWrapper}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.bgVideo}
        >
          <source src="https://bgiya-bliss.pages.dev/videos/background.mp4" type="video/mp4" />
        </video>
        <div className={styles.bgOverlay}></div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>The Bgiya Bliss Promise</h2>
          <p className={styles.subtitle}>
            Nature's best for your garden.
          </p>
        </div>

        <div className={styles.minimalGrid}>
          {reasons.map((item, i) => (
            <div key={i} className={styles.minimalCard}>
              <div className={styles.iconWrap}>
                {item.icon}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
