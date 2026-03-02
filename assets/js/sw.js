const CACHE_NAME = 'atla-plant-cache-v1';
const urlsToCache = [
  '/',
  '/fr/',
  '/ht/',
  '/en/',
  '/manifest.json',
  '/assets/js/main.js',
  '/assets/js/plantes-data.js',
  '/assets/js/ressources-data.js'
  // Ajoute ici les chemins vers tes fichiers CSS si tu en as des locaux
];

// Installation du Service Worker et mise en cache des fichiers de base
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interception des requêtes réseau (Mode Hors Ligne)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si le fichier est dans le cache, on le retourne (Offline)
        if (response) {
          return response;
        }
        // Sinon, on va le chercher sur internet (Online)
        return fetch(event.request);
      }
    )
  );
});

// Mise à jour du cache quand tu modifies ton site
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Supprime les anciens caches
          }
        })
      );
    })
  );
});
