// =================================================================
// DOSYA: src/firebaseConfig.js
// AÇIKLAMA: Firebase projesinin yapılandırma bilgilerini içerir.
// =================================================================
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBFEu6vz_Xwqeo-sFnpNaM1K6uHETRys8A",
  authDomain: "ticari-hesap.firebaseapp.com",
  databaseURL: "https://ticari-hesap-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ticari-hesap",
  storageBucket: "ticari-hesap.firebasestorage.app",
  messagingSenderId: "245188905205",
  appId: "1:245188905205:web:29d56c5b5412c9ff835dbc",
  measurementId: "G-ERKGP1BH2H"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
// Analytics'i başlat (isteğe bağlı)
const analytics = getAnalytics(app);

export default app;
