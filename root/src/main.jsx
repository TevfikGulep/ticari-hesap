import React from 'react';
import { createRoot } from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';
import App from './App';
import './index.css';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Save calculation function
export const saveCalculation = async (userId, data) => {
  if (!userId) return;
  try {
    await addDoc(collection(db, `users/${userId}/calculations`), {
      ...data,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving calculation: ", error);
  }
};

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App auth={auth} db={db} saveCalculation={saveCalculation} />
  </React.StrictMode>
);
