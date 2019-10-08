module.exports = {
  "globDirectory": ".",
  "globPatterns": [
    "**/*.{json,png,html,webmanifest,js}"
  ],
  globIgnores: ['**/index.html','**/api/'],
  "swDest": "sw.js",
  "swSrc": "./service-worker.js"
};