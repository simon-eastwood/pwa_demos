


self.addEventListener('fetch', function (event) {
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;
	return fetch(event.request);
});


addEventListener('activate', (event) => {
	console.log('[Service Worker] Activate Event ', event)
})
