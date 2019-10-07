importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// This will trigger the importScripts() for workbox.strategies and its dependencies:
const {strategies} = workbox;


workbox.precaching.precacheAndRoute([]);



self.addEventListener('fetch', (event) => {
	const requestURL = new URL(event.request.url);
	console.log('[Service Worker] Fetch requested for ' + requestURL.hostname + ':' + requestURL.pathname);
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

	if (event.request.url.endsWith('.json')) {
		// Using the previously-initialized strategies will work as expected.
		console.log ('[Service worker] usig cache first');
		const cacheFirst = new strategies.CacheFirst();
		event.respondWith(cacheFirst.makeRequest({request: event.request}));
	} 
	
	// else default

});


