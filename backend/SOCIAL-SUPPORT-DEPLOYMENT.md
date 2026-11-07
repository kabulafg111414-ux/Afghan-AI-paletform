# Afghan AI — Social Support API (deployment preparation)

This is a backend starter, not a live service. Do not collect real applications until every deployment step below is complete and tested.

## Architecture
- Cloudflare Worker handles intake and status lookup.
- Cloudflare D1 stores the encrypted request payload and workflow status.
- Cloudflare KV enforces a basic per-IP submission cooldown.
- Cloudflare Turnstile is required to reduce automated abuse.
- AES-256-GCM encrypts request details before database insertion.
- A random status token is returned once; only its SHA-256 hash is stored.
- No admin/list/export endpoint is exposed publicly. Staff review must be performed through a separately access-controlled process.

## Data minimization
The API accepts only a support category, broad district choice, short summary and optional callback number. Never ask for a child's name, exact home address, identity document, password, bank details, or detailed medical records through this form. Do not upload documents in this first release.

## Required Cloudflare resources
1. Create a D1 database, then run `backend/social-support-schema.sql`.
2. Create a KV namespace for rate limiting.
3. Create a Turnstile widget restricted to the eventual Afghan AI domain.
4. Generate a random 32-byte encryption key and base64-encode it. Store it as Worker secret `CONTACT_ENCRYPTION_KEY`.
5. Set Worker secrets `TURNSTILE_SECRET` and `CONTACT_ENCRYPTION_KEY`.
6. Set `ALLOWED_ORIGIN` to the exact HTTPS origin (scheme + hostname, no path).
7. Bind D1 as `DB` and KV as `RATE_LIMIT`.
8. Deploy this Worker separately from the static GitHub Pages site.

The example Wrangler config is `wrangler.support.example.jsonc`. Replace all placeholder database and KV identifiers before deploying. Do not commit real secret values.

## Endpoints
- `POST /api/support/requests`: requires category, district, summary (20–1200 chars), consent=true and a valid Turnstile token. Optional callback number is encrypted with the rest of the payload.
- `GET /api/support/status?ticket=...&token=...`: returns only workflow status and creation time. Keep the status token private.

## Workflow and governance still required
- Configure Cloudflare Access for staff-only access to D1/admin tooling.
- Appoint at least two authorized reviewers and document approval thresholds.
- Maintain a separate ledger for received funds, fees, disbursements and receipts; never mix platform operating funds with humanitarian donations.
- Publish only aggregate totals after manual verification; suppress small groups that could identify a family.
- Define retention/deletion periods and a process for urgent referrals.
- Test abuse controls, encryption-key backup/rotation, restore procedures and access logs.
- Complete an independent security and privacy review before announcing production readiness.

## Important limitations
- The API intentionally has no public admin endpoint and no payment processing.
- The current social-support page is still a demo and does not submit to this API.
- The sample IP cooldown uses KV and is a basic abuse control, not a substitute for a managed WAF/rate-limiting policy.
- This code is a foundation for review, not a security certification or legal compliance claim.
