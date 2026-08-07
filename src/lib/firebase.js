import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Lazy-initialize Firebase — only runs when first accessed at runtime,
// not during Next.js static page generation at build time.
// This prevents "auth/invalid-api-key" crashes when env vars aren't available.
function getFirebaseApp() {
  if (getApps().length === 0) {
    // Skip initialization if API key is missing (build-time prerendering)
    if (!firebaseConfig.apiKey) {
      return null;
    }
    return initializeApp(firebaseConfig);
  }
  return getApps()[0];
}

// Cached instances
let _auth = null;
let _db = null;

// Lazy getters — safe to import anywhere without triggering initialization
export const auth = new Proxy({}, {
  get(_, prop) {
    if (!_auth) {
      const app = getFirebaseApp();
      if (!app) return undefined;
      _auth = getAuth(app);
    }
    return _auth[prop];
  },
});

export const db = new Proxy({}, {
  get(_, prop) {
    if (!_db) {
      const app = getFirebaseApp();
      if (!app) return undefined;
      _db = getFirestore(app);
    }
    return _db[prop];
  },
});

export default new Proxy({}, {
  get(_, prop) {
    const app = getFirebaseApp();
    if (!app) return undefined;
    return app[prop];
  },
});
