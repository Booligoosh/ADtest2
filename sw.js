importScripts('cache-polyfill.js');

self.addEventListener('fetch', function(event) {
  console.log(event.request.hostname);
  console.log(fetch('https://cors-anywhere.herokuapp.com/' + event.request));
  event.respondWith(event.respondWith(new Response(httpGet('https://cors-anywhere.herokuapp.com/' + event.request)));
});

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
