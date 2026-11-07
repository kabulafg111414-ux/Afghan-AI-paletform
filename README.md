# Afghan AI — معلم هوشمند افغانستان

Afghan AI is a mobile-first learning platform prototype for students in Afghanistan, with Dari, Pashto and English interface support.

## Current features
- Responsive dashboard and navigation
- AI tutor interface (requires a separately deployed secure backend)
- Sample subject library and practice quiz
- Local learning progress stored in the current browser
- Parent and teacher guidance
- Progressive Web App manifest, app icon and offline app-shell caching

## Deploy on GitHub Pages
1. Open **Settings → Pages**.
2. Select **Deploy from a branch**.
3. Choose **main** and **/(root)**, then save.
4. Wait for the Pages deployment to finish.

## Important technical notes
- The tutor endpoint `/api/chat` is not included in this static GitHub Pages project. A serverless or hosted backend must be deployed separately.
- Never put an AI provider API key in browser JavaScript or commit it to this repository.
- User accounts, cloud sync, and production admin roles are not implemented in this prototype.
- Learning statistics are stored locally in the browser and are not synchronized between devices.
- The lesson content is illustrative; verify official curriculum content against approved textbooks before classroom use.

## Deploy the AI backend (separate from GitHub Pages)

The repository includes a Flask backend and a Render Blueprint (render.yaml).

1. In Render, choose **New → Blueprint** and connect this GitHub repository.
2. Review the proposed web service named afghan-ai.
3. Add your provider key as the secret environment variable OPENAI_API_KEY in the hosting dashboard. Do not paste it into GitHub, source files, screenshots, or browser settings.
4. Keep OPENAI_MODEL as gpt-4.1-mini unless you intentionally choose another model.
5. Deploy, then check /api/health. The response reports whether a key is configured; it never returns the key.
6. Open the deployed service URL and test the tutor there. The backend serves the app and its required static assets from the same origin.

GitHub Pages is static hosting and cannot execute server.py. The Render Blueprint is an optional hosting path, not a requirement to use Cloudflare. Review the host's current pricing, free-tier limits, data location, and availability before deployment; usage of the AI provider may incur separate charges.

### Backend security notes

- The Flask app serves only an explicit allowlist of website files; it does not expose the whole repository directory.
- API requests have a size limit, input validation, bounded provider timeouts, and no-store response headers.
- Keep secrets in the hosting provider's environment settings. Rotate any key that has ever been committed or shared.
- This is still a prototype backend. Before public launch, add persistent rate limiting/abuse protection, user authentication or another access-control strategy, monitoring, and a privacy/data-retention policy. Do not collect children's personal information until appropriate safeguards and legal review are in place.
- Health endpoint only reports whether the key is configured; it does not prove that provider billing, network access, or model requests are working.

## Founder
Sayed Moheb Ullah Hashimi
phone :+93787111414   +93782111414

## Intellectual property and licensing
- The repository's `LICENSE` file contains the Afghan AI proprietary licence and intellectual-property notice as a **draft for legal review**, not a final signed agreement.
- No open-source reuse, redistribution, modification, or commercial-use permission is granted by that draft.
- Rights in third-party software, open-source components, AI models, APIs, and educational materials remain with their respective owners and are governed by their own licences and terms.
- Confirm ownership evidence, company registration details, governing law, and the final signed terms with a qualified lawyer before relying on the notice as a legal agreement.
