


self.addEventListener('fetch', function (event) {
	const requestURL = new URL(event.request.url);
	console.log('[Service Worker] Fetch requested for ' +requestURL.pathname);
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

	if (requestURL.pathname.endsWith('.webmanifest')) {
		console.log ('[Service Worker] SPA is starting up');
	}
	console.log('[Service Worker] Doing Fetch');
	return fetch(event.request);
});


addEventListener('activate', (event) => {
	console.log('[Service Worker] Activate Event ', event)
})
