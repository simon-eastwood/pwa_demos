importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// This will trigger the importScripts() for workbox.strategies and its dependencies:
const {strategies, broadcastUpdate} = workbox;

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
	new RegExp('index.html|\/precache\/$'),
	new strategies.NetworkFirst()
);

workbox.routing.registerRoute(
	new RegExp('slow'),
	new strategies.StaleWhileRevalidate({
	  plugins: [
		new broadcastUpdate.Plugin({
		  channelName: 'api-updates',
		  headersToCheck: ['etag']
		}),
	  ],
	})
);

workbox.routing.registerRoute(
	new RegExp('fast'),
	new strategies.NetworkFirst()
);






