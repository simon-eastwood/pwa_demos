
var CACHE_VERSION = 1;
var CURRENT_CACHES = {
	prefetch: 'prefetch-cache-v' + CACHE_VERSION
};
var urlsToPrefetchOnSpaStartup = [
	'data.json'
];


function prefetch(urlList) {
	var cachePromises = urlsToPrefetch.map(function (urlToPrefetch) {
		// This constructs a new URL object using the service worker's script location as the base
		// for relative URLs.
		var url = new URL(urlToPrefetch, location.href);
		// Append a cache-bust=TIMESTAMP URL parameter to each URL's query string.
		// This is particularly important when precaching resources that are later used in the
		// fetch handler as responses directly, without consulting the network (i.e. cache-first).
		// If we were to get back a response from the HTTP browser cache for this precaching request
		// then that stale response would be used indefinitely, or at least until the next time
		// the service worker script changes triggering the install flow.
		//url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;

		var request = new Request(url, {});
		return fetch(request).then(function (response) {
			if (response.status >= 400) {
				throw new Error('request for ' + urlToPrefetch +
					' failed with status ' + response.statusText);
			}

			// Use the original URL without the cache-busting parameter as the key for cache.put().
			return cache.put(urlToPrefetch, response);
		}).catch(function (error) {
			console.error('Not caching ' + urlToPrefetch + ' due to ' + error);
		});
	});

	return Promise.all(cachePromises).then(function () {
		console.log('Pre-fetching complete.');
	});
}



self.addEventListener('fetch', function (event) {
	const requestURL = new URL(event.request.url);
	console.log('[Service Worker] Fetch requested for ' + requestURL.pathname);
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

	if (requestURL.pathname.endsWith('.webmanifest')) {
		console.log('[Service Worker] SPA is starting up');
		prefetch (urlsToPrefetchOnSpaStartup);
	}
	console.log('[Service Worker] Doing Fetch');
	return fetch(event.request);
});


addEventListener('activate', (event) => {
	console.log('[Service Worker] Activate Event ', event)
})
