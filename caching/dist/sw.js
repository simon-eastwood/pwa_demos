importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// This will trigger the importScripts() for workbox.strategies and its dependencies:
const {strategies, broadcastUpdate} = workbox;

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
    "url": "./css/theme-corporate.css"
  }, 
  {
    "url": "./css/layout.css"
  }, 
  {
    "url": "./css/grid.css"
  }, 
  {
    "url": "./css/responsive.css"
  }, 
  {
    "url": "./css/materialdesignicons.css"
  }, 
  {
    "url": "./fonts/Open_Sans/bold.woff2"
  }, 
  {
    "url": "./fonts/Open_Sans/regular.woff2"
  }, 
  {
    "url": "https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-window.prod.mjs"
  }, 
]);

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





