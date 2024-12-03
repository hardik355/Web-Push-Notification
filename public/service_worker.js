console.log('public')
console.log(' public Service Worker: Loaded!');

self.addEventListener('install', function(event) {
  console.log('public Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('public Service Worker activated...');
  event.waitUntil(clients.claim());
});

self.addEventListener('push', function(event) {
  console.log('public Push event received:', event);

  // Check if there's push data
  if (!event.data) {
    console.log('public No data in push event');
    return;
  }

  const data = event.data.json();
  console.log('public Push data:', data);

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/icon.png', // Make sure to have an icon at this path
  });
});

self.addEventListener('notificationclick', function(event) {
  console.log(' public Notification clicked:', event.notification);
  event.notification.close();
  // Optionally, you can open a page when notification is clicked
  event.waitUntil(clients.openWindow('/some-page'));
});

self.addEventListener('notificationclose', function(event) {
  console.log('public Notification closed:', event.notification);
});
