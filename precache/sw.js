


self.addEventListener('fetch', function (event) {
	return fetch(event.request);
});


addEventListener('activate', (event) => {
	console.log('[Service Worker] Activate Event ', event)
})
