importScripts('cache-polyfill.js');

self.addEventListener('fetch', function(event) {
  console.log(event.request.hostname);
  console.log(fetch('https://cors-anywhere.herokuapp.com/' + event.request));
  event.respondWith(event.respondWith(new Response(fetch('https://cors-anywhere.herokuapp.com/' + event.request)));
});
