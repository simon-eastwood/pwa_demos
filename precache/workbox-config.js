module.exports = {
  "globDirectory": ".",
  "globPatterns": [
    "**/*.{json,png,html,webmanifest,js}"
  ],
  globIgnores: ['**/index.html'],
  "swDest": "sw.js",
  "swSrc": "./service-worker.js"
};