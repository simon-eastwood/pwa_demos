importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// This will trigger the importScripts() for workbox.strategies and its dependencies:
const {strategies, broadcastUpdate} = workbox;

//const  broadcastPlugin = new broadcastUpdate.Plugin('apis-update', {headersToCheck: ['etag']});




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
    "url": "mypwa.webmanifest",
    "revision": "abec96ef0755a4733219cbebc36aeda6"
  },
  {
    "url": "oldsw.js",
    "revision": "54dbab1703a25e13c18c81bab5089577"
  },
  {
    "url": "service-worker.js",
    "revision": "56ba3499a2dcd8183a54b86857edb8f4"
  },
  {
    "url": "workbox-config.js",
    "revision": "1627dc73d8407f1c7c3cdea05c29241c"
  }
]);

workbox.routing.registerRoute(
	new RegExp('.test'),
	new workbox.strategies.StaleWhileRevalidate({
	  plugins: [
		new workbox.broadcastUpdate.Plugin({
		  channelName: 'api-updates',
		}),
	  ],
	})
  );



/* self.addEventListener('fetch', (event) => {
	const requestURL = new URL(event.request.url);
	console.log('[Service Worker] Fetch requested for ' + requestURL.hostname + ':' + requestURL.pathname);
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

	if (event.request.url.endsWith('.test')) {
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

}); */


