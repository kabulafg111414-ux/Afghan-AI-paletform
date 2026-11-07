-- Run only against the disposable PostgreSQL service in CI.
DO $$
DECLARE
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name IN (
        'accounts', 'role_assignments', 'sessions', 'bootstrap_invites',
        'audit_events', 'guardian_links', 'learning_progress'
      );

    IF table_count <> 7 THEN
        RAISE EXCEPTION 'Expected 7 application tables, found %', table_count;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes
        WHERE schemaname = 'public'
          AND indexname = 'accounts_status_created_idx'
    ) THEN
        RAISE EXCEPTION 'Required accounts status index is missing';
    END IF;

    -- An active account without a verified email or phone must be rejected.
    BEGIN
        INSERT INTO accounts (id, email_normalized, status)
        VALUES ('00000000-0000-0000-0000-000000000001',
                'ci-unverified@example.invalid', 'active');
        RAISE EXCEPTION 'Unverified active account was incorrectly accepted';
    EXCEPTION
        WHEN check_violation THEN
            NULL;
    END;

    -- A verified active account must be accepted.
    INSERT INTO accounts (
        id, email_normalized, email_verified_at, status
    ) VALUES (
        '00000000-0000-0000-0000-000000000002',
        'ci-verified@example.invalid', NOW(), 'active'
    );

    -- Session and invitation tokens must be exact lowercase SHA-256 hex.
    BEGIN
        INSERT INTO sessions (
            id, account_id, token_hash, created_at, expires_at
        ) VALUES (
            '00000000-0000-0000-0000-000000000004',
            '00000000-0000-0000-0000-000000000002',
            'short', NOW(), NOW() + INTERVAL '1 hour'
        );
        RAISE EXCEPTION 'Short session token hash was incorrectly accepted';
    EXCEPTION
        WHEN check_violation THEN
            NULL;
    END;

    BEGIN
        INSERT INTO bootstrap_invites (
            id, token_hash, role, created_at, expires_at
        ) VALUES (
            '00000000-0000-0000-0000-000000000005',
            repeat('G', 64), 'founder_admin',
            NOW(), NOW() + INTERVAL '1 hour'
        );
        RAISE EXCEPTION 'Non-hex invitation token hash was incorrectly accepted';
    EXCEPTION
        WHEN check_violation THEN
            NULL;
    END;

    -- Expiry must be later than creation.
    BEGIN
        INSERT INTO sessions (
            id, account_id, token_hash, created_at, expires_at
        ) VALUES (
            '00000000-0000-0000-0000-000000000003',
            '00000000-0000-0000-0000-000000000002',
            repeat('a', 64), NOW(), NOW() - INTERVAL '1 minute'
        );
        RAISE EXCEPTION 'Expired-at-creation session was incorrectly accepted';
    EXCEPTION
        WHEN check_violation THEN
            NULL;
    END;
END
$$;
