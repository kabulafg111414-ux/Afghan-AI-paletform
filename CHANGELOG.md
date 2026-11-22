# Changelog

Notable project changes are recorded here. Entries should describe verified changes only.

## 2026-11-22
- Corrected the financial-ledger and demonstration-complaint date defaults/stamps to use the browser's local calendar date rather than the UTC date, preventing a previous-day value during early local hours in positive UTC offsets.
- Added regression assertions to Project checks for the local-date helper and its four date call sites, plus a deterministic Asia/Kabul midnight-boundary case; refreshed the app.js cache query and bumped the Service Worker cache from v21 to v22 so the updated app shell is precached.
- Reproduced the edge case with Node: at 2026-11-22 00:30 in Asia/Kabul, the UTC date is 2026-11-21 while the browser-local helper returns 2026-11-22. The targeted local test passed; the GitHub Actions run for this commit remains unverified.


## 2026-11-20
- Documented the tutor-form fallback added in the preceding `index.html` change. If the main application script does not initialize, the fallback prevents native page navigation and presents the backend response in the tutor interface.
- Recorded the user's reported result: submitting a question now reaches the backend and displays the explicit missing-API-key message. This is not evidence that the AI provider is configured or that AI answers are available.
- No AI API key, external provider connection, payment integration, or production account feature was enabled. GitHub Actions and Pages deployment results were not verified in this review.

## 2026-11-19
- Reviewed the main-branch navigation, core interaction and financial-ledger regression checks, localization checks, app-shell checks, and project documentation.
- Confirmed that the repository documentation describes the AI tutor backend, local-only learning progress, prototype authentication/admin limitations, and draft intellectual-property notice; these are not production services.
- Recorded the remaining manual QA and governance items: real-device iPhone/offline testing, review of repository visibility and main-branch protection, and keeping the changelog current.
- No AI provider API, external service, payment integration, or production account feature was enabled or changed.

## 2026-11-11
- Replaced the duplicate inline tutor submit interceptor with one guarded application handler.
- Preserved learning-question counts and activity logging; prevented duplicate requests while waiting and restored the send control after completion.
- Added regression checks and refreshed the app script and service-worker cache versions.
- Restricted offline HTML fallback to navigation requests and added regression checks so missing scripts or stylesheets cannot be served as index.html.

## 2026-11-06
- Added a browser-side Security and Protection Center with limited diagnostic checks.
- Registered the Security page in application navigation.
- Updated the service-worker cache version for the security-center release.
- Corrected the three home-page feature cards to open distinct sections: AI Teacher, Language Help, and Smart Assistant.
- Began adding repository governance and automated quality checks.

## Earlier versions
See the repository commit history for changes not listed above.
