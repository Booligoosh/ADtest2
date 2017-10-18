importScripts('cache-polyfill.js');

var location = self.registration.scope;

var url = new URL(location).searchParams.get('url');

self.addEventListener('fetch', function(event) {
  console.log(event.request.hostname);
  console.log(fetch('https://cors-anywhere.herokuapp.com/' + event.request));
  var toRequest = event.request;
  
  var parser = new URL(toRequest);
  
  var parser2 = new URL(location);
  
  if(parser.host === parser2.host) {
    var parser3 = new URL(url);
    toRequest = parser3.protocol + '//' +  parser3.host + toRequest;
  }
  
  console.log("toRequest:",toRequest);
  
  event.respondWith(httpGet('https://cors-anywhere.herokuapp.com/' + toRequest));
});

function httpGet(theUrl) {
    /*var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;*/
    return(fetch(theUrl));
}
