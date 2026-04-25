'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { navLinks } from '@/data/categories';
import styles from './Navbar.module.css';

export default function Navbar({ isTransparent }) {
  const [activeMenu, setActiveMenu] = useState(null);

  const transparentStyle = isTransparent ? {
    background: 'transparent',
    borderBottom: 'none',
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none'
  } : {};

  return (
    <nav className={styles.nav} style={transparentStyle} onMouseLeave={() => setActiveMenu(null)}>
      <div className={styles.container}>
        <ul className={styles.links}>
          {navLinks.map((link, idx) => (
            <li
              key={idx}
              className={styles.linkItem}
              onMouseEnter={() => link.megaMenu && setActiveMenu(idx)}
            >
              <a
                href={link.link}
                className={`${styles.link} ${link.highlight ? styles.highlight : ''}`}
                style={isTransparent ? { color: '#fff' } : {}}
              >
                {link.name}
                {link.megaMenu && <ChevronDown size={14} className={styles.chevron} />}
              </a>

              {/* Mega Menu */}
              {link.megaMenu && activeMenu === idx && (
                <div className={styles.megaMenu}>
                  <div className={styles.megaMenuInner}>
                    {link.megaMenu.map((col, colIdx) => (
                      <div key={colIdx} className={styles.megaCol}>
                        <h4 className={styles.megaTitle}>{col.title}</h4>
                        <ul className={styles.megaList}>
                          {col.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <a href={item.link} className={styles.megaLink}>
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
