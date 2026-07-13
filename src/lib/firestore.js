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
  setDoc,
  limit,
} from 'firebase/firestore';
import { db } from './firebase';

const PRODUCTS_COLLECTION = 'products';
const FIRESTORE_TIMEOUT = 15000; // 15 second timeout

// Helper: wrap any promise with a timeout so it never hangs forever
function withTimeout(promise, ms = FIRESTORE_TIMEOUT) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firestore operation timed out.')), ms)
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

// ─── ORDERS ──────────────────────────────────────────

const ORDERS_COLLECTION = 'orders';

export async function createOrder(orderData) {
  const data = {
    ...orderData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const docRef = await withTimeout(addDoc(collection(db, ORDERS_COLLECTION), data));
  return docRef.id;
}

export async function getAllOrders() {
  const testNames = ['atharv', 'anagha', 'rita', 'test'];
  const filterDemo = (order) => {
    const n = (order.customer?.name || '').toLowerCase();
    const e = (order.customer?.email || '').toLowerCase();
    return !testNames.some(t => n.includes(t) || e.includes(t));
  };

  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await withTimeout(getDocs(q));
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })).filter(filterDemo);
  } catch (err) {
    console.log('getAllOrders failed, trying without orderBy:', err.message);
    const snapshot = await withTimeout(getDocs(collection(db, ORDERS_COLLECTION)));
    const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    return orders.sort((a, b) => {
      const da = a.createdAt?.toDate?.() || new Date(0);
      const db2 = b.createdAt?.toDate?.() || new Date(0);
      return db2 - da;
    }).filter(filterDemo);
  }
}

export async function getUserOrders(email, userId) {
  try {
    if (!email && !userId) return [];
    let orders = [];
    // Try by email first
    if (email) {
      try {
        const q = query(collection(db, ORDERS_COLLECTION), where('customer.email', '==', email));
        const snapshot = await withTimeout(getDocs(q));
        orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      } catch (err) {
        console.log('getUserOrders by email failed:', err.message);
      }
    }
    // If no results and userId provided, try by userId
    if (orders.length === 0 && userId) {
      try {
        const q = query(collection(db, ORDERS_COLLECTION), where('userId', '==', userId));
        const snapshot = await withTimeout(getDocs(q));
        orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      } catch (err) {
        console.log('getUserOrders by userId failed:', err.message);
      }
    }
    return orders.sort((a, b) => {
      const da = a.createdAt?.toDate?.() || new Date(0);
      const db2 = b.createdAt?.toDate?.() || new Date(0);
      return db2 - da;
    });
  } catch (err) {
    console.log('getUserOrders failed:', err.message);
    return [];
  }
}

export async function getOrderById(id) {
  const docRef = doc(db, ORDERS_COLLECTION, id);
  const docSnap = await withTimeout(getDoc(docRef));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
}

export async function updateOrderStatus(id, status) {
  const docRef = doc(db, ORDERS_COLLECTION, id);
  await withTimeout(updateDoc(docRef, {
    status,
    updatedAt: serverTimestamp(),
  }));
}

// ─── REVIEWS ─────────────────────────────────────────

const REVIEWS_COLLECTION = 'reviews';

export async function addReview(productId, reviewData) {
  const data = {
    productId,
    ...reviewData,
    createdAt: serverTimestamp(),
  };
  const docRef = await withTimeout(addDoc(collection(db, REVIEWS_COLLECTION), data));
  return docRef.id;
}

export async function getReviews(productId) {
  try {
    const q = query(
      collection(db, REVIEWS_COLLECTION),
      where('productId', '==', productId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await withTimeout(getDocs(q));
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ...data,
        // Convert timestamp to string date if it exists
        date: data.createdAt?.toDate ? 
          data.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 
          'Recently'
      };
    });
  } catch (err) {
    console.log('getReviews failed (might need index):', err.message);
    // Fallback if index is missing
    try {
      const q = query(collection(db, REVIEWS_COLLECTION), where('productId', '==', productId));
      const snapshot = await withTimeout(getDocs(q));
      const reviews = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        date: d.data().createdAt?.toDate ? 
          d.data().createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 
          'Recently'
      }));
      return reviews.sort((a, b) => {
        const da = a.createdAt?.toDate?.() || new Date(0);
        const db2 = b.createdAt?.toDate?.() || new Date(0);
        return db2 - da;
      });
    } catch (e) {
      return [];
    }
  }
}

// ─── STORE SETTINGS ──────────────────────────────────

const SETTINGS_COLLECTION = 'settings';
const GENERAL_SETTINGS_DOC = 'general';

export async function getStoreSettings() {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, GENERAL_SETTINGS_DOC);
    const docSnap = await withTimeout(getDoc(docRef));
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (err) {
    console.log('getStoreSettings failed:', err.message);
    return null;
  }
}

export async function updateStoreSettings(settingsData) {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, GENERAL_SETTINGS_DOC);
    
    // Check if document exists first
    const docSnap = await withTimeout(getDoc(docRef));
    
    if (docSnap.exists()) {
      await withTimeout(updateDoc(docRef, {
        ...settingsData,
        updatedAt: serverTimestamp(),
      }));
    } else {
      // Create it if it doesn't exist
      // Since addDoc creates random IDs, and we want a specific ID, we use setDoc
      // But we import setDoc just for this, or use updateDoc? Wait, firestore.js doesn't export setDoc.
      // Let's import setDoc dynamically or add it to imports at the top.
      const { setDoc } = await import('firebase/firestore');
      await withTimeout(setDoc(docRef, {
        ...settingsData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }));
    }
    return true;
  } catch (err) {
    console.error('updateStoreSettings failed:', err);
    throw err;
  }
}

// ─── PROMO CODES ─────────────────────────────────────

const PROMOS_COLLECTION = 'promos';

export async function getPromoCode(code) {
  try {
    const q = query(
      collection(db, PROMOS_COLLECTION),
      where('code', '==', code.toUpperCase())
    );
    const snapshot = await withTimeout(getDocs(q));
    if (!snapshot.empty) {
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
    return null;
  } catch (err) {
    console.log('getPromoCode failed:', err.message);
    return null;
  }
}

export async function getAllPromos() {
  try {
    const q = query(
      collection(db, PROMOS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await withTimeout(getDocs(q));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.log('getAllPromos failed:', err.message);
    const snapshot = await withTimeout(getDocs(collection(db, PROMOS_COLLECTION)));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
}

export async function addPromoCode(promoData) {
  const data = {
    ...promoData,
    code: promoData.code.toUpperCase(),
    createdAt: serverTimestamp(),
  };
  const docRef = await withTimeout(addDoc(collection(db, PROMOS_COLLECTION), data));
  return docRef.id;
}

export async function updatePromoCode(id, promoData) {
  const docRef = doc(db, PROMOS_COLLECTION, id);
  await withTimeout(updateDoc(docRef, {
    ...promoData,
    code: promoData.code?.toUpperCase(),
  }));
}

export async function deletePromoCode(id) {
  const docRef = doc(db, PROMOS_COLLECTION, id);
  await withTimeout(deleteDoc(docRef));
}

// ═══════ AFFILIATES ═══════
export async function createAffiliate(data) {
  const ref = await addDoc(collection(db, 'affiliates'), { ...data, totalEarnings: 0, totalOrders: 0, status: 'pending', createdAt: serverTimestamp() });
  return ref.id;
}

export async function getAllAffiliates() {
  try {
    const snap = await withTimeout(getDocs(query(collection(db, 'affiliates'), orderBy('createdAt', 'desc'))));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.log('getAllAffiliates fallback:', err.message);
    const snap = await withTimeout(getDocs(collection(db, 'affiliates')));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
}

export async function getAffiliateByCode(code) {
  try {
    const snap = await withTimeout(getDocs(query(collection(db, 'affiliates'), where('code', '==', code.toUpperCase()), where('status', '==', 'active'))));
    return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
  } catch (err) {
    console.log('getAffiliateByCode fallback:', err.message);
    const snap = await withTimeout(getDocs(query(collection(db, 'affiliates'), where('code', '==', code.toUpperCase()))));
    const active = snap.docs.filter(d => d.data().status === 'active');
    return active.length === 0 ? null : { id: active[0].id, ...active[0].data() };
  }
}

export async function updateAffiliate(id, data) {
  await updateDoc(doc(db, 'affiliates', id), data);
}

export async function incrementAffiliateStats(id, orderAmount, commission) {
  const docRef = doc(db, 'affiliates', id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return;
  const current = snap.data();
  await updateDoc(docRef, {
    totalOrders: (current.totalOrders || 0) + 1,
    totalEarnings: (current.totalEarnings || 0) + commission,
  });
}

export async function logAffiliateEarning(data) {
  await addDoc(collection(db, 'affiliate_earnings'), { ...data, status: 'pending', createdAt: serverTimestamp() });
}

export async function getAffiliateEarnings(affiliateCode) {
  try {
    const snap = await withTimeout(getDocs(query(collection(db, 'affiliate_earnings'), where('affiliateCode', '==', affiliateCode), orderBy('createdAt', 'desc'))));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.log('getAffiliateEarnings fallback:', err.message);
    const snap = await withTimeout(getDocs(query(collection(db, 'affiliate_earnings'), where('affiliateCode', '==', affiliateCode))));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
}

export async function getAllAffiliateEarnings() {
  try {
    const snap = await withTimeout(getDocs(query(collection(db, 'affiliate_earnings'), orderBy('createdAt', 'desc'))));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.log('getAllAffiliateEarnings fallback:', err.message);
    const snap = await withTimeout(getDocs(collection(db, 'affiliate_earnings')));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
}

export async function markEarningPaid(id) {
  await updateDoc(doc(db, 'affiliate_earnings', id), { status: 'paid' });
}

// ═══════ BGIYA COINS ═══════
export async function getUserCoins(email) {
  try {
    const docRef = doc(db, 'user_coins', email);
    const snap = await withTimeout(getDoc(docRef));
    return snap.exists() ? snap.data() : { balance: 0, totalEarned: 0, totalRedeemed: 0 };
  } catch (err) {
    console.log('getUserCoins failed:', err.message);
    return { balance: 0, totalEarned: 0, totalRedeemed: 0 };
  }
}

export async function addCoins(email, amount, reason, orderId) {
  try {
    const docRef = doc(db, 'user_coins', email);
    const snap = await getDoc(docRef);
    const current = snap.exists() ? snap.data() : { balance: 0, totalEarned: 0, totalRedeemed: 0 };
    await setDoc(docRef, {
      balance: (current.balance || 0) + amount,
      totalEarned: (current.totalEarned || 0) + amount,
      totalRedeemed: current.totalRedeemed || 0,
      updatedAt: serverTimestamp()
    });
    await addDoc(collection(db, 'coin_transactions'), { email, type: 'credit', amount, reason, orderId: orderId || null, createdAt: serverTimestamp() });
  } catch (err) {
    console.error('addCoins failed:', err.message);
  }
}

export async function redeemCoins(email, amount, orderId) {
  const docRef = doc(db, 'user_coins', email);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return false;
  const current = snap.data();
  if ((current.balance || 0) < amount) return false;
  await setDoc(docRef, {
    balance: current.balance - amount,
    totalEarned: current.totalEarned || 0,
    totalRedeemed: (current.totalRedeemed || 0) + amount,
    updatedAt: serverTimestamp()
  });
  await addDoc(collection(db, 'coin_transactions'), { email, type: 'debit', amount, reason: 'Redeemed on order', orderId, createdAt: serverTimestamp() });
  return true;
}

export async function getCoinTransactions(email) {
  try {
    const snap = await withTimeout(getDocs(query(collection(db, 'coin_transactions'), where('email', '==', email), orderBy('createdAt', 'desc'))));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.log('getCoinTransactions fallback:', err.message);
    const snap = await withTimeout(getDocs(query(collection(db, 'coin_transactions'), where('email', '==', email))));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
}

