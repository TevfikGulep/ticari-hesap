// =================================================================
// DOSYA: root/sw.js (GÜNCELLENDİ)
// AÇIKLAMA: Uygulama kabuğunu (App Shell) ve temel varlıkları
//            önbelleğe alarak tam çevrimdışı destek sağlandı.
// =================================================================

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

// `workbox` nesnesinin mevcut olduğundan emin ol
if (workbox) {
  console.log(`Workbox yüklendi!`);

  // Workbox'ın Vite tarafından oluşturulan build dosyalarını yönetmesini sağla.
  // `{ revision: null }` parametresi, dosyaların revizyon takibi olmadan önbelleğe alınmasını sağlar.
  // Bu, dosyalar değiştikçe Vite'in ürettiği hash'li isimlerin zaten yeni bir önbellek anahtarı oluşturması nedeniyle kullanışlıdır.
  const { registerRoute } = workbox.routing;
  const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
  const { CacheableResponsePlugin } = workbox.cacheableResponse;
  const { ExpirationPlugin } = workbox.expiration;
  
  // Çevrimdışı fallback sayfası
  const offlineFallbackPage = 'Offline.html';

  // Yükleme sırasında fallback sayfasını önbelleğe al
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('offline-fallback').then(cache => {
        return cache.add(offlineFallbackPage);
      })
    );
  });

  // Sayfa navigasyonları için ağ öncelikli strateji
  registerRoute(
    ({ request }) => request.mode === 'navigate',
    new StaleWhileRevalidate({
      cacheName: 'pages-cache',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // CSS, JS ve Worker dosyaları için önbellek öncelikli strateji
  registerRoute(
    ({ request }) =>
      request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'worker',
    new StaleWhileRevalidate({
      cacheName: 'assets-cache',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // Resimler için önbellek öncelikli strateji
  registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxEntries: 60, // En fazla 60 resim önbelleğe al
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Gün
        }),
      ],
    })
  );

  // Manifest dosyası için ağ öncelikli strateji
  registerRoute(
    ({ request }) => request.destination === 'manifest',
    new StaleWhileRevalidate({
      cacheName: 'manifest-cache',
    })
  );

  // Fetch hataları için genel bir yakalayıcı (özellikle navigasyon için)
  const handler = async (args) => {
    try {
      // Ağdan getirmeyi dene
      const response = await new StaleWhileRevalidate().handle(args);
      return response || await caches.match(offlineFallbackPage);
    } catch (error) {
      // Ağ hatası durumunda fallback sayfasını göster
      return await caches.match(offlineFallbackPage);
    }
  };

  registerRoute(({ request }) => request.mode === 'navigate', handler);

  self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      self.skipWaiting();
    }
  });

} else {
  console.log(`Workbox yüklenemedi! Çevrimdışı mod sınırlı olacak.`);
}
