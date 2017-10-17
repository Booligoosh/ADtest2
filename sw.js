importScripts('cache-polyfill.js');

importScripts('/urlParams/urlParams.js');
var url = urlParams.url;

self.addEventListener('fetch', function(event) {
  console.log(event.request.hostname);
  console.log(fetch('https://cors-anywhere.herokuapp.com/' + event.request));
  var toRequest = event.request;
  
  var parser = document.createElement('a');
  parser.href = toRequest;
  
  if(parser.host === window.location.host) {
    parser = document.createElement('a');
    parser.href = url;
    toRequest = parser.protocol + '//' +  parser.host + toRequest;
  }
  
  console.log("toRequest:",toRequest);
  
  event.respondWith(new Response(httpGet('https://cors-anywhere.herokuapp.com/' + toRequest)));
});

function httpGet(theUrl) {
    /*var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;*/
    return(fetch(theUrl));
}
