# Afghan AI — Project Roadmap

This roadmap describes intended work; an item is not a claim that the feature is already implemented.

## Phase 1 — Stabilize the interface
- Review every navigation item and confirm its destination.
- Check buttons, forms, validation, empty states, and error messages.
- Remove duplicate or misleading actions without removing useful features.
- Verify Dari, Pashto, and English layouts, including right-to-left behavior.
- Test mobile layout, readability, contrast, and offline app-shell behavior.

## Phase 2 — Quality and repository safeguards
- Run automated JavaScript and configuration checks on changes.
- Review security alerts and dependency/action updates where supported by GitHub.
- Maintain release notes and a tested rollback process.
- Add focused tests for navigation and important user flows.

## Phase 3 — Complete product workflows
- Complete learning, translation, tools, library, quizzes, progress, family, publishing, and support workflows.
- Clearly label demo-only, locally stored, and backend-dependent features.
- Verify support or donation flows before describing online payments as operational.

## Phase 4 — Backend and API planning
Start after the interface and workflows have been reviewed. Design authentication, authorization, storage, privacy, rate limits, logging, backups, and abuse protection before connecting an AI provider. Keep provider credentials on the server.

## Phase 5 — Controlled release
- Test supported mobile and desktop browsers.
- Review accessibility, privacy notices, and content accuracy.
- Publish a versioned release and retain a recovery point.
