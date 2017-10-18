importScripts('cache-polyfill.js');

var location = self.registration.scope;
var locationParser = document.createElement('a');
locationParser.href = location;

// urlParams from /urlParams/urlParams.js with modifications
      var params = locationParser.search.split('&');
      params[0] = params[0].slice(1, params[0].length);
      var urlParams = {}
      for (var loop = 0; loop < params.length; loop++) {
        var cur = params[loop].split('');
        for (var i = 0; i < cur.length; i++) {
          if (cur[i] === '%') {
            var hexString = cur[i + 1] + cur[i + 2];
            cur.splice(i, 3, String.fromCharCode(parseInt('0x' + hexString)))
          }
          if (cur[i] === '+') {
            cur[i] = ' ';
          }
        }
        cur = cur.join('').split('=');
        var k = cur[0];
        urlParams[k] = cur[1];
      }
      if (params[2] != "on") {
        var icon = params[2];
      }
// end urlParams
var url = urlParams.url;

self.addEventListener('fetch', function(event) {
  console.log(event.request.hostname);
  console.log(fetch('https://cors-anywhere.herokuapp.com/' + event.request));
  var toRequest = event.request;
  
  var parser = document.createElement('a');
  parser.href = toRequest;
  
  var parser2 = document.createElement('a');
  parser2.href = location;
  
  if(parser.host === parser2.host) {
    var parser3 = document.createElement('a');
    parser3.href = url;
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
