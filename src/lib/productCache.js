// Simple in-memory product cache shared across pages.
// The homepage populates this when it loads products,
// so the product detail page can read instantly without Firestore.

const cache = new Map();

export function cacheProducts(products) {
  products.forEach(p => {
    if (p.slug) cache.set(p.slug, p);
  });
}

export function getCachedProduct(slug) {
  return cache.get(slug) || null;
}

export function getAllCachedProducts() {
  return Array.from(cache.values());
}
