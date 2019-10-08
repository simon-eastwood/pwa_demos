module.exports = {
  "globDirectory": "./dist",
  "globPatterns": [
    "**/*.{json,png,html,webmanifest,js}"
  ],
  globIgnores: ['**/index.html','**/api/**'],
  "swDest": "./dist/sw.js",
  "swSrc": "./service-worker.js"
};