# Afghan AI — Seller Marketplace Implementation Plan

Status: **design specification only**. The current website contains a seller-interest email draft form. It does not create accounts, store applications, verify sellers, publish listings, or process payments.

## 1. Release gates

Do not display a "verified seller" badge or accept a live listing until all of the following exist and have been tested:

- A persistent PostgreSQL database with backups and a documented retention policy.
- Server-side authentication, secure sessions, role-based access control, and multi-factor authentication for administrators.
- An authenticated seller application workflow and a separate moderator approval workflow.
- Audit records for approval, rejection, suspension, and edits.
- Server-side validation, CSRF protection where cookie sessions are used, rate limiting, abuse reporting, and security logging.
- A privacy notice, seller terms, prohibited-items policy, complaint process, and clear explanation of what "verified" means.
- A safe image upload service with file type/size checks, malware scanning, and private storage; never trust a file extension alone.
- Manual operational procedures for identity/business checks. Do not collect identity documents until a lawful, secure process and retention schedule are approved.

## 2. Suggested data model

### sellers
- id: UUID primary key
- account_id: UUID, unique foreign key to authenticated account
- display_name: required, maximum 100 characters
- province_code: required, controlled list
- public_contact_method: optional, seller-controlled public channel
- verification_status: pending | approved | rejected | suspended
- verification_checked_at: nullable timestamp
- verification_checked_by: nullable admin account UUID
- verification_scope: nullable text describing exactly what was checked
- created_at, updated_at: timestamps

### listings
- id: UUID primary key
- seller_id: UUID foreign key
- title: required, maximum 140 characters
- category: controlled list (textiles, food/agriculture, handicrafts, other)
- description: required, bounded length
- province_code: required
- price_amount and price_currency: optional; if shown, seller supplied and date-stamped
- stock_status: unknown | available | unavailable
- moderation_status: draft | pending | published | rejected | suspended
- created_at, updated_at: timestamps

### moderation_events
- id: UUID primary key
- actor_admin_id: required
- entity_type and entity_id: required
- action: submitted | approved | rejected | suspended | edited
- reason: required for rejection/suspension
- created_at: timestamp

Never expose private account identifiers, internal notes, or verification evidence through public listing APIs.

## 3. API outline (not implemented)

- POST /api/seller/applications — authenticated seller submits an application; status starts as pending.
- GET /api/seller/me — seller reads only their own profile and application state.
- POST /api/seller/listings — authenticated approved seller creates a draft listing.
- PATCH /api/seller/listings/<id> — owner edits only their own listing.
- GET /api/market/listings — public endpoint returns published listings only.
- GET /api/admin/seller-applications — admin-only queue.
- POST /api/admin/seller-applications/<id>/decision — admin-only approval/rejection with an audit event.
- POST /api/admin/listings/<id>/decision — admin-only listing moderation.

Every endpoint must enforce authorization on the server. Hiding buttons in the browser is not access control.

## 4. Meaning of verification

A badge must state the limited checks completed (for example, "contact checked" or "business documents reviewed") and the date. Do not imply that product quality, origin, safety, authenticity, stock, or delivery has been independently guaranteed unless each claim has actually been checked.

## 5. Deployment sequence

1. Choose and configure a persistent database and secure hosting.
2. Implement account/session and admin role controls.
3. Implement application submission and moderation audit trail.
4. Add listing creation and public display for approved sellers only.
5. Add image upload safeguards, reporting, and seller suspension.
6. Run authorization, privacy, abuse, backup-restore, and mobile usability tests.
7. Launch a small pilot with manual review before opening registrations widely.

## 6. Current prototype limitations

GitHub Pages cannot run the Flask API. The existing Flask backend is a prototype and currently has no seller database, authentication, admin authorization, or marketplace endpoints. The email-draft form is not a secure application intake system. Do not ask users to email passwords, identity numbers, or identity documents.
