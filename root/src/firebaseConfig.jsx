// =================================================================
// DOSYA: root/src/firebaseConfig.js (GÜNCELLENDİ)
// AÇIKLAMA: Firestore başlatma metodu, önerilen yeni `initializeFirestore`
//            metoduyla güncellendi ve çevrimdışı destek entegre edildi.
// =================================================================
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  initializeFirestore, 
  persistentLocalCache, 
  collection, 
  addDoc, 
  doc, 
  deleteDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs, 
  updateDoc 
} from "firebase/firestore";

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

// Servisleri başlat
export const auth = getAuth(app);

// Firestore'u çevrimdışı kalıcılıkla başlat (yeni ve önerilen yöntem)
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({})
});


// Hesaplama geçmişini Firestore'a kaydetme fonksiyonu
export const saveCalculation = async (userId, data) => {
  if (!userId) return;
  try {
    const calcCollection = collection(db, "users", userId, "calculations");
    const inputsString = JSON.stringify(data.inputs);

    // Aynı girdilere sahip mevcut bir hesaplama olup olmadığını kontrol et
    const q = query(calcCollection, where("inputsString", "==", inputsString));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Kayıt zaten varsa, sadece zaman damgasını güncelle (en üste taşır)
      const existingDoc = querySnapshot.docs[0];
      const docRef = doc(db, "users", userId, "calculations", existingDoc.id);
      await updateDoc(docRef, {
        timestamp: serverTimestamp()
      });
    } else {
      // Kayıt yoksa, yeni bir tane oluştur
      await addDoc(calcCollection, {
        ...data,
        inputsString: inputsString, // Karşılaştırma için string'e çevrilmiş girdiler
        timestamp: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error saving calculation: ", error);
  }
};

// Belirli bir hesaplama kaydını güncelleme fonksiyonu
export const updateCalculation = async (userId, docId, newData) => {
  if (!userId || !docId) return;
  try {
    const docRef = doc(db, "users", userId, "calculations", docId);
    await updateDoc(docRef, newData);
  } catch (error) {
    console.error("Error updating calculation: ", error);
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
