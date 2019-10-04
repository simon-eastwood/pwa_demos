


self.addEventListener('fetch', function (event) {
	console.log('[Service Worker] Fetch requested');
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;
	console.log('[Service Worker] Doing Fetch');
	return fetch(event.request);
});


addEventListener('activate', (event) => {
	console.log('[Service Worker] Activate Event ', event)
})
