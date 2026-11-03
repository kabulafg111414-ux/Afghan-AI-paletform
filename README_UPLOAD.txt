# Afghan AI — GitHub Pages package

Founder / project owner: Sayed Moheb Ullah Hashimi

## Files
- index.html — main page
- styles.css — responsive design
- app.js — browser-side interactions

## Publish on GitHub Pages
Upload these three files into the repository's main branch at the top level (root), not inside another folder. Keep the filenames exactly as shown.

Then open Settings → Pages:
- Source: Deploy from a branch
- Branch: main
- Folder: /(root)
- Save

Wait for the Pages deployment to finish, then open the published URL.

## Important limitation
GitHub Pages hosts static files only. The current AI tutor in app.js calls `/api/chat`, and the admin health check calls `/api/health`. Those endpoints require a separately deployed backend; they will not work on GitHub Pages by themselves. Do not put API keys or passwords in these files or in the public repository.

The existing license notice in the page is retained. Add your separate LICENSE file to the repository as well.
