import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, isFirebaseConfigComplete, storage } from "./firebase";
import {
  DEFAULT_PAGES,
  DEFAULT_PORTFOLIO,
  DEFAULT_SERVICES,
  DEFAULT_SETTINGS,
  DEFAULT_TESTIMONIALS
} from "./seed-data";
import type { Lead, PageContent, PortfolioItem, Service, SiteSettings, Testimonial } from "./types";

export async function getSettings(): Promise<SiteSettings> {
  if (!isFirebaseConfigComplete()) return DEFAULT_SETTINGS;
  try {
    const snap = await getDoc(doc(db(), "Settings", "main"));
    return snap.exists() ? ({ ...DEFAULT_SETTINGS, ...snap.data() } as SiteSettings) : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function getPage(id: string): Promise<PageContent> {
  const fallback = DEFAULT_PAGES[id] || DEFAULT_PAGES.home;
  if (!isFirebaseConfigComplete()) return fallback;
  try {
    const snap = await getDoc(doc(db(), "PagesContent", id));
    return snap.exists() ? ({ ...fallback, id, ...snap.data() } as PageContent) : fallback;
  } catch {
    return fallback;
  }
}

async function getCollection<T extends { id: string; active?: boolean; order?: number }>(collectionName: string, fallback: T[]): Promise<T[]> {
  if (!isFirebaseConfigComplete()) return fallback.filter((item) => item.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0));
  try {
    const snap = await getDocs(query(collection(db(), collectionName), orderBy("order", "asc")));
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T).filter((item) => item.active !== false);
    return items.length ? items : fallback;
  } catch {
    return fallback;
  }
}

export const getServices = () => getCollection<Service>("Services", DEFAULT_SERVICES);
export const getPortfolio = () => getCollection<PortfolioItem>("Portfolio", DEFAULT_PORTFOLIO);
export const getTestimonials = () => getCollection<Testimonial>("Testimonials", DEFAULT_TESTIMONIALS);

export async function createLead(lead: Lead) {
  if (!isFirebaseConfigComplete()) {
    throw new Error("Firebase não configurado. Use /admin/setup para ativar o salvamento de leads.");
  }
  return addDoc(collection(db(), "Leads"), {
    ...lead,
    status: "novo",
    createdAt: serverTimestamp()
  });
}

export async function seedDatabase() {
  if (!isFirebaseConfigComplete()) throw new Error("Configure o Firebase primeiro.");
  await setDoc(doc(db(), "Settings", "main"), DEFAULT_SETTINGS, { merge: true });
  for (const [id, page] of Object.entries(DEFAULT_PAGES)) {
    await setDoc(doc(db(), "PagesContent", id), page, { merge: true });
  }
  for (const item of DEFAULT_SERVICES) {
    await setDoc(doc(db(), "Services", item.id), item, { merge: true });
  }
  for (const item of DEFAULT_PORTFOLIO) {
    await setDoc(doc(db(), "Portfolio", item.id), item, { merge: true });
  }
  for (const item of DEFAULT_TESTIMONIALS) {
    await setDoc(doc(db(), "Testimonials", item.id), item, { merge: true });
  }
}

export async function listAdminCollection<T>(collectionName: string, fallback: T[] = []): Promise<T[]> {
  if (!isFirebaseConfigComplete()) return fallback;
  const orderedCollections = ["Services", "Portfolio", "Testimonials"];
  const refCollection = collection(db(), collectionName);
  const snap = orderedCollections.includes(collectionName)
    ? await getDocs(query(refCollection, orderBy("order", "asc")))
    : await getDocs(refCollection);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

export async function upsertAdminDoc(collectionName: string, id: string, payload: Record<string, unknown>) {
  await setDoc(doc(db(), collectionName, id), { ...payload, updatedAt: serverTimestamp() }, { merge: true });
}

export async function removeAdminDoc(collectionName: string, id: string) {
  await deleteDoc(doc(db(), collectionName, id));
}

export async function updateLeadStatus(id: string, status: string) {
  await updateDoc(doc(db(), "Leads", id), { status, updatedAt: serverTimestamp() });
}

export async function uploadSiteImage(file: File, folder = "uploads") {
  if (!isFirebaseConfigComplete()) throw new Error("Configure o Firebase primeiro.");
  const path = `site/${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
  const fileRef = ref(storage(), path);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
}
