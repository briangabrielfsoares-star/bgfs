import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export type FirebaseClientConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const LOCAL_CONFIG_KEY = "bgfs_firebase_config";

export function getEnvFirebaseConfig(): FirebaseClientConfig {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ""
  };
}

export function getLocalFirebaseConfig(): FirebaseClientConfig | null {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(LOCAL_CONFIG_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as FirebaseClientConfig;
  } catch {
    return null;
  }
}

export function saveLocalFirebaseConfig(config: FirebaseClientConfig) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_CONFIG_KEY, JSON.stringify(config));
}

export function clearLocalFirebaseConfig() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(LOCAL_CONFIG_KEY);
}

export function getFirebaseConfig(): FirebaseClientConfig {
  const env = getEnvFirebaseConfig();
  if (isFirebaseConfigComplete(env)) return env;
  return getLocalFirebaseConfig() || env;
}

export function isFirebaseConfigComplete(config = getFirebaseConfig()) {
  return Boolean(
    config.apiKey &&
      config.authDomain &&
      config.projectId &&
      config.storageBucket &&
      config.messagingSenderId &&
      config.appId
  );
}

export function getFirebaseApp(): FirebaseApp {
  const config = getFirebaseConfig();
  if (!isFirebaseConfigComplete(config)) {
    throw new Error("Firebase ainda não configurado. Acesse /admin/setup e cole a configuração Web do Firebase.");
  }
  if (getApps().length) return getApp();
  return initializeApp(config);
}

export function auth() {
  return getAuth(getFirebaseApp());
}

export function db() {
  return getFirestore(getFirebaseApp());
}

export function storage() {
  return getStorage(getFirebaseApp());
}

export const setupAdminEmail = process.env.NEXT_PUBLIC_SETUP_ADMIN_EMAIL || "briangabrielfsoares@gmail.com";
