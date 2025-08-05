// =================================================================
// DOSYA: root/src/firebaseConfig.js (GÜNCELLENDİ)
// AÇIKLAMA: Firebase başlatma, servisler ve kaydetme/silme/temizleme fonksiyonları eklendi.
// =================================================================
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, deleteDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBFEu6vz_Xwqeo-sFnpNaM1K6uHETRys8A",
  authDomain: "ticari-hesap.firebaseapp.com",
  projectId: "ticari-hesap",
  storageBucket: "ticari-hesap.firebasestorage.app",
  messagingSenderId: "245188905205",
  appId: "1:245188905205:web:29d56c5b5412c9ff835dbc",
  measurementId: "G-ERKGP1BH2H"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Servisleri başlat ve dışa aktar
export const auth = getAuth(app);
export const db = getFirestore(app);

// Hesaplama geçmişini Firestore'a kaydetme fonksiyonu
export const saveCalculation = async (userId, data) => {
  if (!userId) return;
  try {
    const calcCollection = collection(db, "users", userId, "calculations");
    
    // Aynı girdilere sahip mevcut bir hesaplama olup olmadığını kontrol et
    const q = query(calcCollection, where("inputsString", "==", JSON.stringify(data.inputs)));
    const querySnapshot = await getDocs(q);
    
    // Mevcut kayıtları sil
    for (const docSnap of querySnapshot.docs) {
      await deleteDoc(doc(db, "users", userId, "calculations", docSnap.id));
    }

    // Yeni kaydı ekle
    await addDoc(calcCollection, {
      ...data,
      inputsString: JSON.stringify(data.inputs), // Karşılaştırma için string'e çevrilmiş girdiler
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving calculation: ", error);
  }
};

// Kullanıcının tüm hesaplama geçmişini temizleme fonksiyonu
export const clearHistory = async (userId) => {
  if (!userId) return;
  try {
    const calcCollection = collection(db, "users", userId, "calculations");
    const querySnapshot = await getDocs(calcCollection);
    for (const docSnap of querySnapshot.docs) {
      await deleteDoc(doc(db, "users", userId, "calculations", docSnap.id));
    }
  } catch (error) {
    console.error("Error clearing history: ", error);
  }
};
