importScripts('cache-polyfill.js');

self.addEventListener('fetch', function(event) {

const promiseChain = doSomethingAsyncThatReturnsAURL()
      .then(someUrl => fetch(someUrl));
event.respondWith(promiseChain);
});


function doSomethingAsyncThatReturnsAURL() {
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
  
  var parser = new URL(toRequest);
  
  console.log("if",parser.host,parser2.host,parser.host === parser2.host);
  if(parser.host === parser2.host) {
    toRequest = toRequest.replace('https://booligoosh.github.io',parser3.protocol + '//' +  parser3.host);
    console.log("ifdone",toRequest);
  }
  
  console.log("toRequest:",toRequest);
    
  return('https://cors-anywhere.herokuapp.com/' + toRequest);
  
  });
}
