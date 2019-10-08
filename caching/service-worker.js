importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// This will trigger the importScripts() for workbox.strategies and its dependencies:
const {strategies, broadcastUpdate} = workbox;

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
	new RegExp('index.html|\/dist\/$'),
	new strategies.NetworkFirst()  // always try to read index.html from backed. Fallback to cache if offline
);

workbox.routing.registerRoute(
	new RegExp('slow'),
	new strategies.StaleWhileRevalidate({ // These API calls read from cache and update from the network later
	  plugins: [
		new broadcastUpdate.Plugin({
		  channelName: 'api-updates',
		  headersToCheck: ['etag']  // if the network call returns a version with different eTag, inform the client windows
		}),
	  ],
	})
);

workbox.routing.registerRoute(
	new RegExp('fast'),
	new strategies.NetworkFirst()  // These API calls call the network first with fallback to cache if offline
);





