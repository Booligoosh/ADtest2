importScripts('cache-polyfill.js');

self.addEventListener('fetch', function(event) {

  var location = self.registration.scope;
  
  console.log("loc", location)

  var url = new URL(location).searchParams.get('url').toString();
  
  console.log(event.request.hostname);
  console.log(fetch('https://cors-anywhere.herokuapp.com/' + event.request));
  var toRequest = event.request.url;
  console.log("Req:", toRequest);
  
  var parser3 = new URL(url);
  
  var parser;
  var pat = /^https?:\/\//i;
  if (pat.test(urlString)){
      parser = new URL(toRequest);
  } else {
    parser = new URL(toRequest, parser3.protocol + '//' +  parser3.host);
  }
  
  
  
  var parser2 = new URL(location);
  
  if(parser.host === parser2.host) {
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
