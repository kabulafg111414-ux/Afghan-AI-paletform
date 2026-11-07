# Afghan AI — PostgreSQL Database and Staging Rollout Plan

**Status:** Design specification only. No database is provisioned or connected yet.

## 1. Release principle

Do not collect real student, parent, seller, or founder credentials until the database, authentication, authorization, backups, privacy notice, and operational monitoring are implemented and tested. GitHub Pages remains a public static frontend; database credentials and privileged operations must stay behind the Flask backend.

## 2. Proposed staging architecture

- Frontend: GitHub Pages for the public static experience.
- API: Flask application hosted separately on a managed application service.
- Database: managed PostgreSQL, private to the API service where the provider supports private networking.
- Secrets: hosting-provider environment variables or secret manager only. Never commit database URLs, passwords, API keys, session secrets, or production data.
- Environments: separate staging and production services and databases; never reuse production credentials in tests.

The browser must never connect directly to PostgreSQL.

## 3. Initial database entities

| Table | Purpose | Minimum data |
|---|---|---|
| accounts | Login identity | UUID, normalized email or phone, password hash, status, timestamps |
| role_assignments | Authorization | account UUID, role, granted-by, timestamps |
| sessions | Server-side sessions | hashed session token, account UUID, expiry, revocation |
| audit_events | Security trace | actor UUID, action, target type/id, timestamp, limited metadata |
| guardian_links | Parent/guardian relationship | guardian UUID, student UUID, relationship, consent state |
| learning_progress | Optional learning sync | account UUID, course/item identifiers, progress summary, timestamps |

Use UUID primary keys, foreign keys, unique constraints, UTC timestamps, and indexes on login identifiers and foreign keys. Avoid collecting birth dates, home addresses, identity documents, precise location, or other unnecessary student data.

## 4. Founder access and roles

Initial roles are Founder/Super Admin, Security Admin, Content Editor, Teacher, Parent/Guardian, Student, Seller, and Moderator. Role checks must run on the server for every protected action. Hiding a button in JavaScript is not authorization.

Founder account creation must be an invitation or controlled bootstrap process:
1. Deploy staging API and database.
2. Run migrations.
3. Generate a one-time setup invitation using a cryptographically secure random token.
4. Store only a hash of that token, with short expiry and one-time use.
5. Set a strong password through HTTPS; store an adaptive password hash (Argon2id or bcrypt with reviewed parameters).
6. Require MFA for privileged roles before production.
7. Revoke the bootstrap invitation and record an audit event.

Never hard-code a founder username/password or add a front-end password prompt as a substitute for authentication.

## 5. Required controls before real accounts

- HTTPS for all authenticated traffic.
- Secure, HttpOnly, SameSite cookies; rotate session IDs after login and privilege changes.
- CSRF protection for cookie-authenticated state-changing requests.
- Password hashing; login throttling; generic login and recovery errors.
- MFA for founder and security administrators.
- Server-side role checks and deny-by-default authorization.
- Input validation, output encoding, parameterized SQL, and safe error messages.
- Secret rotation and least-privilege database credentials.
- Database backups, restore drills, retention policy, and access logging.
- Rate limits and abuse monitoring for AI endpoints.
- Data minimization, deletion/export process, and clear privacy notice.
- Child-safety review and guardian-consent design before any child accounts or personal data are collected.

## 6. Migration and deployment sequence

1. Choose a managed PostgreSQL provider and create a staging database.
2. Configure DATABASE_URL and a separate application secret in the staging host's secret settings.
3. Add a migration framework (for example, Flask-Migrate/Alembic) and commit schema migrations.
4. Apply migrations to staging only; verify constraints and indexes.
5. Implement and test registration/invitation, login, logout, session revocation, password recovery, MFA, and role authorization.
6. Add audit events and backup/restore verification.
7. Perform security and privacy review; test on mobile.
8. Obtain explicit approval before creating production resources or importing any real user data.

### 6.1 Initial staging migration procedure

The repository currently contains `migrations/001_initial_schema.sql`. It is a first-install schema, not an automatically executed migration and not yet applied to any database.

Before running it:
- Confirm the target is a brand-new, empty **staging** PostgreSQL database. Do not point this command at production or a database containing valuable data.
- Use a dedicated database user with only the permissions needed for this staging application.
- Set `DATABASE_URL` in a trusted local shell or the hosting provider's private secret settings. Never paste it into chat, a GitHub issue, a source file, or a screenshot.
- Ensure the connection uses the provider's required TLS/SSL settings. Do not disable certificate verification to work around connection errors.

For an operator with the PostgreSQL client installed, the one-time command is:

```sh
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f migrations/001_initial_schema.sql
```

This SQL file uses ordinary `CREATE TABLE` statements and is **not idempotent**. Do not run it a second time on a database where it has already succeeded. Record the migration filename, commit, date, environment, and outcome in a restricted deployment log; never record credentials.

After a successful run, verify the expected tables and indexes using a database console connected to staging:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'accounts', 'role_assignments', 'sessions', 'bootstrap_invites',
    'audit_events', 'guardian_links', 'learning_progress'
  )
ORDER BY table_name;

SELECT indexname
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN (
    'accounts', 'role_assignments', 'sessions', 'bootstrap_invites',
    'audit_events', 'guardian_links', 'learning_progress'
  )
ORDER BY indexname;
```

Expected result: seven tables and their declared indexes. Also confirm the application can connect using its private staging configuration, while unauthenticated requests remain unable to read or modify account data. A successful schema install alone does **not** implement login, permissions, invitation redemption, MFA, or student data isolation.

Before writing application queries, align the implementation with the actual SQL names and constraints in `migrations/001_initial_schema.sql` (for example, the schema currently uses `phone_normalized`, and guardian consent is represented by `consent_status`). Treat the SQL migration as the source of truth until a reviewed follow-up migration changes it.

## 7. Acceptance criteria

- No database secret or API key appears in Git history, frontend bundles, logs, or API responses.
- Unauthenticated requests cannot access protected endpoints.
- A student or seller cannot invoke founder-only operations by changing a request.
- Expired, revoked, and reused invitation/session tokens are rejected.
- Passwords are never stored or logged in plaintext.
- Migrations can create a fresh database and upgrade a prior staging schema.
- Backup restoration is demonstrated before production launch.
- Automated tests cover authentication, authorization, CSRF, validation, and data isolation.
- The privacy notice accurately describes what is collected, why, retention, and deletion.

## 8. Current limitations

This document is a plan, not an implementation. Afghan AI does not yet have a connected PostgreSQL database, real user accounts, founder login, role enforcement, cloud learning sync, or production seller verification. Do not advertise these as active features until they pass the acceptance criteria above.
