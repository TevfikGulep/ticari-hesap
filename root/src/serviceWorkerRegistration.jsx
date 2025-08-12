// =================================================================
// DOSYA: src/serviceWorkerRegistration.jsx (GÜNCELLENDİ)
// AÇIKLAMA: Service Worker'ı tarayıcıya kaydetme mantığı
//            Vite projesine uygun olarak basitleştirildi.
// =================================================================

export function register() {
    // Sadece üretim modunda ve tarayıcı destekliyorsa SW'yi kaydet
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // Doğru service worker dosyasının yolunu belirtiyoruz
        const swUrl = '/sw.js';
        navigator.serviceWorker
          .register(swUrl)
          .then((registration) => {
            console.log('Service Worker başarıyla kaydedildi:', registration);
          })
          .catch((error) => {
            console.error('Service Worker kaydı sırasında hata:', error);
          });
      });
    }
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
  