import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const PRODUCTS_COLLECTION = 'products';
const FIRESTORE_TIMEOUT = 15000; // 15 second timeout — allows for multi-variant batch saves

// Helper: wrap any promise with a timeout so it never hangs forever
function withTimeout(promise, ms = FIRESTORE_TIMEOUT) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firestore operation timed out. Have you created the Firestore database in the Firebase Console?')), ms)
    ),
  ]);
}

// ─── READ ────────────────────────────────────────────

export async function getAllProducts() {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await withTimeout(getDocs(q));
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function getActiveProducts() {
  try {
    // Try the compound query first (requires a composite index)
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await withTimeout(getDocs(q));
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  } catch (err) {
    // If compound query fails (missing index), fall back to fetching all and filtering
    console.log('Compound query failed, falling back to client-side filter:', err.message);
    const allProducts = await getAllProducts();
    return allProducts.filter(p => p.status === 'active');
  }
}

export async function getProductBySlug(slug) {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where('slug', '==', slug)
  );
  const snapshot = await withTimeout(getDocs(q));
  if (snapshot.empty) return null;
  const productDoc = snapshot.docs[0];
  return { id: productDoc.id, ...productDoc.data() };
}

export async function getProductById(id) {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const docSnap = await withTimeout(getDoc(docRef));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
}

export async function getProductsByCategory(category) {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('category', '==', category),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await withTimeout(getDocs(q));
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  } catch (err) {
    console.log('Category query failed, falling back:', err.message);
    const allProducts = await getAllProducts();
    return allProducts.filter(p => p.category === category && p.status === 'active');
  }
}

export async function getProductsByFeatured(tag) {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('featured', 'array-contains', tag),
      where('status', '==', 'active')
    );
    const snapshot = await withTimeout(getDocs(q));
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  } catch (err) {
    console.log('Featured query failed, falling back:', err.message);
    const allProducts = await getAllProducts();
    return allProducts.filter(p => p.featured?.includes(tag) && p.status === 'active');
  }
}

// ─── CREATE ──────────────────────────────────────────

export async function addProduct(productData) {
  const data = {
    ...productData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const docRef = await withTimeout(addDoc(collection(db, PRODUCTS_COLLECTION), data));
  return docRef.id;
}

// ─── UPDATE ──────────────────────────────────────────

export async function updateProduct(id, productData) {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await withTimeout(updateDoc(docRef, {
    ...productData,
    updatedAt: serverTimestamp(),
  }));
}

// ─── DELETE ──────────────────────────────────────────

export async function deleteProduct(id) {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await withTimeout(deleteDoc(docRef));
}

export async function seedProducts(productsArray) {
  const results = [];
  for (const product of productsArray) {
    const id = await addProduct(product);
    results.push({ id, name: product.name });
  }
  return results;
}

// ─── VARIANT GROUP ───────────────────────────────────
// Fetch all products that share the same variantGroupId
export async function getVariantGroup(variantGroupId) {
  if (!variantGroupId) return [];
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('variantGroupId', '==', variantGroupId)
    );
    const snapshot = await withTimeout(getDocs(q));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.log('getVariantGroup failed:', err.message);
    return [];
  }
}
