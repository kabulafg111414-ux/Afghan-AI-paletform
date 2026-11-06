# Afghan AI — Developer Guide

## Main project files
- index.html — page structure and navigation markup.
- app.js — application behavior and page interactions.
- styles.css — visual styles and responsive layout.
- sw.js — service-worker caching behavior.
- manifest.json — Progressive Web App metadata.

Check the current repository before assuming this list is exhaustive.

## Local review
Serve the repository root with a static HTTP server. Test in a browser; service workers require a secure context such as HTTPS or localhost.

If Node.js is available, run:

```sh
node --check app.js
node --check sw.js
```

Validate manifest.json as JSON after changes.

## Safe change process
1. Inspect the current file and its latest version.
2. Make the smallest practical change.
3. Run syntax and configuration checks.
4. Test affected flows, mobile width, and RTL languages.
5. Review the diff before publishing.
6. Record verified changes in CHANGELOG.md.

## Backend boundary
GitHub Pages is static hosting. Never implement secret-bearing API calls in browser code. The /api/chat route needs a separately deployed backend that authenticates requests, protects credentials, validates input, applies rate limits, and handles errors safely.
