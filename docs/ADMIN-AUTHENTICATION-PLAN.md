# Afghan AI — Secure Admin and User Access Architecture

Status: **architecture proposal only — no authentication or user database is implemented**.

This document defines a safe implementation sequence for founder, staff, teacher, parent, student, and seller access. The current founder control-center page is not a protected admin console.

## 1. Recommended architecture

- Keep the public website on GitHub Pages or serve it from the same-origin Flask deployment.
- Use server-side authentication. The browser must never decide whether a person is an administrator.
- Use PostgreSQL for accounts, role assignments, sessions, moderation records, and audit events.
- Keep secrets in the hosting provider's secret manager/environment settings.
- Prefer a maintained identity provider or mature authentication library over custom password/session code.
- For a browser app, use secure, HttpOnly, SameSite cookies over HTTPS. Add CSRF protection to state-changing requests.
- Never store passwords, session tokens, recovery codes, or API keys in localStorage, sessionStorage, frontend source, or repository files.

## 2. Initial roles and least-privilege permissions

| Role | Allowed scope | Explicit restrictions |
|---|---|---|
| Founder / Super Admin | Manage platform settings, assign staff roles, review audit events, manage modules | Require MFA; sensitive actions require re-authentication |
| Security Admin | Review security events, manage sessions and security settings | Cannot silently change financial or seller-verification records |
| Content Editor | Draft and edit educational content | Cannot publish without the approval workflow |
| Teacher | Manage assigned classes and learning materials | Cannot access unrelated students or platform-wide user records |
| Parent / Guardian | View only linked child accounts and permitted progress | No access to other families; guardian relationship must be verified |
| Student | Use learning tools and view own progress | No access to other users' records or administrative endpoints |
| Seller | Manage own profile and own listings | Cannot self-approve verification or edit another seller's records |
| Moderator | Review seller applications, listings, and reports | Cannot assign admin roles or alter security configuration |

Every permission must be checked on the server for every protected request. Hiding a button in the UI is not access control.

## 3. Proposed database entities

### accounts
- id: UUID primary key
- email_normalized: nullable unique email
- phone_e164: nullable unique phone
- password_hash: only if local password authentication is selected; use a maintained password-hashing library
- status: pending, active, locked, or disabled
- email_verified_at, phone_verified_at: nullable timestamps
- created_at, updated_at: timestamps

At least one verified login method is required. Do not store plain-text passwords or verification codes.

### role_assignments
- id: UUID primary key
- account_id: foreign key to accounts
- role: controlled role enum
- scope_type, scope_id: optional class, seller, or organization scope
- granted_by: admin account UUID
- created_at, revoked_at: timestamps

### sessions
- Store only hashed opaque session identifiers, account reference, expiry, creation time, and revocation time.
- Rotate session identifiers after login, privilege changes, and re-authentication.
- Revoke sessions after password reset, account disablement, or suspected compromise.

### audit_events
- Record actor, action, target type/id, timestamp, outcome, and a minimal safe metadata summary.
- Never log passwords, tokens, API keys, full identity documents, or private student messages.
- Make administrative audit records append-only to ordinary application roles.

### guardian_links
- Link guardian and student account IDs with verification status, consent basis, and revocation timestamp.
- Enforce that guardians can read only the children explicitly linked to them.

## 4. Required security controls

1. HTTPS only; enable HSTS after confirming every production subdomain is HTTPS-ready.
2. MFA for founder and all privileged staff; prefer passkeys or TOTP.
3. Secure, HttpOnly, SameSite cookies; CSRF tokens for state-changing cookie-authenticated requests.
4. Login and recovery rate limits, generic login errors, and temporary abuse controls.
5. Password reset tokens must be random, single-use, short-lived, and stored hashed.
6. Server-side authorization on every API route; deny by default.
7. Input validation, output encoding, safe file uploads, and strict file-size/type limits.
8. Audit logs for role changes, account disablement, seller moderation, exports, and security-sensitive actions.
9. Backups encrypted at rest, with documented retention and tested restoration.
10. Data minimization, clear privacy notice, deletion/correction workflow, and incident response plan.

## 5. Child and student privacy

- Do not collect a child's exact address, identity documents, health details, or unnecessary contact information.
- Do not enable public student profiles or public progress pages.
- Establish guardian consent and age-appropriate safeguards before creating accounts for children.
- Restrict teacher access to assigned classes and minimum necessary student data.
- Define retention and deletion rules before collecting any student records.
- Obtain qualified legal/privacy review for the jurisdictions in which the service will operate.

## 6. Implementation sequence and acceptance tests

### Phase A — foundation
- Select authentication provider/library and PostgreSQL host.
- Configure production secrets and separate staging/production environments.
- Define data retention, privacy notice, and incident contacts.

Acceptance: no secrets in Git history or browser bundles; database backup and restore test succeeds.

### Phase B — identity and sessions
- Implement verified email/phone sign-in, secure sessions, logout-all-sessions, recovery, and MFA for privileged accounts.
- Create the first founder account through a one-time, server-side bootstrap process; remove the bootstrap secret immediately afterward.

Acceptance: session fixation, expired sessions, replayed reset tokens, brute-force attempts, and revoked sessions are tested.

### Phase C — authorization
- Add server-side role and scope checks to each protected API.
- Start with read-only admin views, then add carefully audited write actions.

Acceptance: automated tests prove students, teachers, sellers, and moderators cannot access founder-only endpoints or other users' records.

### Phase D — user and marketplace workflows
- Add guardian linking, teacher/class assignments, seller applications, moderator review, and audit history.
- Keep seller verification manual and explicitly scoped until documented checks exist.

Acceptance: cross-account access tests, moderation audit tests, and deletion/retention tests pass.

### Phase E — production launch
- Run dependency, configuration, and penetration testing.
- Test backup restoration, monitoring alerts, incident response, and mobile accessibility.
- Publish privacy, terms, support, and reporting channels.

Acceptance: security review is signed off; unresolved critical/high vulnerabilities block launch.

## 7. Current prototype limitations

The existing site has a visual founder control center but no real login, role enforcement, PostgreSQL account store, central student records, seller verification, or protected admin API. Local browser progress is not a cloud account. The current health endpoint is diagnostic only, not an authentication or readiness guarantee.

**Do not deploy a front-end-only password prompt and call it secure admin login.** A password check in JavaScript can be bypassed by anyone who downloads the public files.


## 8. Founder bootstrap invitation — one-time consumption

The `bootstrap_invites` table stores only a SHA-256 token hash, never the raw invitation token. The raw token must be generated with a cryptographically secure random generator, shown once to the authorized founder through a trusted delivery channel, and never written to application logs, analytics, URLs, or audit metadata.

The redemption endpoint must hash the presented token and consume it atomically. A read-then-update sequence is unsafe because two concurrent requests could both observe an unused invitation. Use a single conditional update inside the same database transaction that creates the account and grants the role:

```sql
BEGIN;

UPDATE bootstrap_invites
SET used_at = NOW()
WHERE token_hash = :presented_token_sha256
  AND used_at IS NULL
  AND expires_at > NOW()
RETURNING id, role, issued_by;

-- Continue only if exactly one row was returned.
-- Create the founder/security-admin account and role assignment
-- in this same transaction. Roll back if any step fails.

COMMIT;
```

Implementation requirements:

- Bind `:presented_token_sha256` as a query parameter; never concatenate SQL.
- If zero rows are returned, reject the invitation with a generic invalid-or-expired response.
- If account creation or role assignment fails, roll back so the invitation is not consumed without completing the bootstrap.
- Enforce a short expiry (for example, 15 minutes) in the issuing service and keep the database expiry check authoritative.
- Require MFA enrollment before privileged access is granted; do not treat possession of the invitation as MFA.
- Permit bootstrap only when no active founder administrator exists, enforced server-side within a transaction/lock to prevent two simultaneous first-founder creations.
- Record a safe audit event after successful completion. Do not include the raw token, its hash, passwords, recovery codes, or MFA secrets in audit metadata.
- Rate-limit redemption attempts and alert on repeated failures.
- Do not create or send a real invitation until the production identity provider, HTTPS delivery channel, database, and founder verification process are configured.

This is an implementation contract, not a live invitation system. The current repository contains the schema and design only; no invitation can currently be redeemed.
