// =================================================================
// DOSYA: src/index.js (GÜNCELLENMİŞ HALİ)
// AÇIKLAMA: Uygulamanın giriş noktası. Service Worker'ı
// kaydetmek için güncellendi.
// =================================================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Dosyayı import et

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// serviceWorker.unregister() yerine register() çağırarak PWA'yı aktif et
serviceWorkerRegistration.register();