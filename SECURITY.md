# Security Policy

Afghan AI is currently a browser-based prototype hosted as a static website. The in-app checks are preliminary client-side checks, not a professional security audit.

## Reporting a vulnerability

Do not publish passwords, API keys, personal information, or exploitable details in a public issue. If private vulnerability reporting is enabled, use the repository Security tab. Otherwise contact the repository owner through the contact method on the owner's GitHub profile.

Include the affected page or file, steps to reproduce, and expected impact. Do not access or modify another person's data.

## Current limitations

- GitHub Pages is static hosting and does not provide the /api/chat backend.
- Never place provider API keys, passwords, or tokens in browser files or commits.
- Authentication, server-side authorization, cloud sync, payment processing, and production admin roles require a separately secured backend.
- Browser local storage is not a secure vault.
- The in-app security panel performs limited browser-side checks only.

## Maintainer checklist

- Review changes before merging.
- Keep dependencies and GitHub Actions updated.
- Revoke and rotate any accidentally exposed secret; deleting a commit does not invalidate a leaked secret.
- Back up important project data and test restoration.
- Do not claim production security until server controls and an independent review are in place.
