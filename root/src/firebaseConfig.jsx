// =================================================================
// DOSYA: root/src/firebaseConfig.js (GÜNCELLENDİ)
// AÇIKLAMA: Firestore başlatma metodu, önerilen yeni `initializeFirestore`
//            metoduyla güncellendi ve çevrimdışı destek entegre edildi.
//            Hassas bilgiler .env dosyasından okunuyor.
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

// Vite, .env.local dosyasındaki VITE_ ile başlayan değişkenleri
// import.meta.env objesine otomatik olarak yükler.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
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
