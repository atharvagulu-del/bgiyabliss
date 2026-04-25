import Link from 'next/link';
import Image from 'next/image';
import styles from './CategoryCircles.module.css';

const categories = [
  {
    name: 'Potting Mix',
    slug: 'potting-mix',
    image: '/bgiya_product_potting_sack_1773167438775.png',
    bgColor: '#e8f5e9',
  },
  {
    name: 'Neem Cake',
    slug: 'fertilizers',
    image: '/bgiya_product_neem_sack_1773167457492.png',
    bgColor: '#fff3e0',
  },
  {
    name: 'Vermicompost',
    slug: 'fertilizers',
    image: '/bgiya_product_neem_pouch_1773167405263.png',
    bgColor: '#efebe9',
  },
  {
    name: 'Cocopeat',
    slug: 'fertilizers',
    image: '/bgiya_product_potting_pouch_1773167423903.png',
    bgColor: '#e0f2f1',
  },
  {
    name: 'Mustard Cake',
    slug: 'fertilizers',
    image: '/bgiya_product_neem_sack_1773167457492.png',
    bgColor: '#fce4ec',
  },
  {
    name: 'Perlite',
    slug: 'fertilizers',
    image: '/category_gardening_flat_1775620247139.png',
    bgColor: '#e3f2fd',
  },
];

export default function CategoryCircles() {
  return (
    <section className={styles.categorySection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Shop by Category</h2>
        <p className={styles.subtitle}>Find exactly what your garden needs</p>
      </div>

      <div className={styles.grid}>
        {categories.map((cat, index) => (
          <Link href={`/collections/${cat.slug}`} key={index} className={styles.categoryCard}>
            <div
              className={styles.imageWrapper}
              style={{ backgroundColor: cat.bgColor }}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                style={{ objectFit: 'cover', padding: '12px' }}
                className={styles.image}
              />
            </div>
            <h3 className={styles.categoryName}>{cat.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
