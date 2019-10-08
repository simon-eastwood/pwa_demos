importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// This will trigger the importScripts() for workbox.strategies and its dependencies:
const {strategies, broadcastUpdate} = workbox;

workbox.precaching.precacheAndRoute([
  {
    "url": "api/fast/data.json",
    "revision": "dfb9863dfc3cabeef9ab6b08a99c29d3"
  },
  {
    "url": "api/slow/data.json",
    "revision": "3f4547a781d4f36ec277e1ae78b71cc4"
  },
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
    "url": "service-worker.js",
    "revision": "7e801bd4b0d5eb9b94a5b5c88680a87a"
  },
  {
    "url": "workbox-config.js",
    "revision": "82b3eea5b8d73696d3507d79674aab80"
  }
]);

workbox.routing.registerRoute(
	new RegExp('slow'),
	new strategies.StaleWhileRevalidate({
	  plugins: [
		new broadcastUpdate.Plugin({
		  channelName: 'api-updates',
		}),
	  ],
	})
);

workbox.routing.registerRoute(
	new RegExp('fast'),
	new strategies.NetworkFirst()
);






