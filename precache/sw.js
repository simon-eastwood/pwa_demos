importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// This will trigger the importScripts() for workbox.strategies and its dependencies:
const {strategies, broadcastUpdate} = workbox;

const  broadcastPlugin = new broadcastUpdate.Plugin('apis-update', {headersToCheck: ['etag', 'date']});




workbox.precaching.precacheAndRoute([
  {
    "url": "icon-192.png",
    "revision": "50f4c945d4e4eb01e400d8c2304c98af"
  },
  {
    "url": "icon-512.png",
    "revision": "ef0a59bd6c4430a098eea37a93b5cf9a"
  },
  {
    "url": "index.html",
    "revision": "5c21fed6a9f6fa27edead03eff5ac42b"
  },
  {
    "url": "mypwa.webmanifest",
    "revision": "abec96ef0755a4733219cbebc36aeda6"
  },
  {
    "url": "oldsw.js",
    "revision": "54dbab1703a25e13c18c81bab5089577"
  },
  {
    "url": "service-worker.js",
    "revision": "d6edb08c725bc1c41d29366718551a21"
  },
  {
    "url": "workbox-config.js",
    "revision": "c513ba9a6a24b652c66e2f146125b6f6"
  }
]);



self.addEventListener('fetch', (event) => {
	const requestURL = new URL(event.request.url);
	console.log('[Service Worker] Fetch requested for ' + requestURL.hostname + ':' + requestURL.pathname);
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

	if (event.request.url.endsWith('/.test')) {
		// Using the previously-initialized strategies will work as expected.
		console.log ('[Service worker] using SWR');
		const swr = new strategies.StaleWhileRevalidate({
			plugins: [
				broadcastPlugin 
			],
		  });
		event.respondWith(swr.makeRequest({request: event.request}));
	} 
	
	// else default

});


