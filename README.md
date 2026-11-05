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

## Founder
Sayed Moheb Ullah Hashimi
phone :+93787111414   +93782111414
