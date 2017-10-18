importScripts('cache-polyfill.js');

self.addEventListener('fetch', function(event) {

  var location = self.location;
  
  console.log("loc", location)
  
  self.clients.matchAll({includeUncontrolled: true}).then(clients => {
    for (const client of clients) {
      const clientUrl = new URL(client.url);
      console.log("SO", clientUrl);
      if(clientUrl.searchParams.get("url") != undefined && clientUrl.searchParams.get("url") != '') {
        location = client.url;
      }
    }
    
  console.log("loc2", location)
    
  var url = new URL(location).searchParams.get('url').toString();
  
  console.log(event.request.hostname);
  var toRequest = event.request.url;
  console.log("Req:", toRequest);
  
  var parser2 = new URL(location);
  var parser3 = new URL(url);
  
  var parser;
  var pat = /^https?:\/\//i;
  if (pat.test(toRequest.toString())){
      parser = new URL(toRequest);
  } else {
    var str = toRequest.replace('https://booligoosh.github.io/',parser3.protocol + '//' +  parser3.host);
    parser = new URL(str);
  }
  
  
  
  
  
  if(parser.host === parser2.host) {
    toRequest = parser3.protocol + '//' +  parser3.host + toRequest;
  }
  
  console.log("toRequest:",toRequest);
  
  event.respondWith(httpGet('https://cors-anywhere.herokuapp.com/' + toRequest));
  });
});

function httpGet(theUrl) {
    /*var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;*/
    return(fetch(theUrl));
}
