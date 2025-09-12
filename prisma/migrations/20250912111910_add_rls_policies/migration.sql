-- ─────────────────────────────────────────────────────────────────────────────
-- GRANT TABLE-LEVEL RIGHTS
-- ─────────────────────────────────────────────────────────────────────────────

GRANT USAGE ON SCHEMA public TO app_user;

GRANT SELECT, INSERT, UPDATE, DELETE
  ON ALL TABLES IN SCHEMA public
  TO app_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_user;

-- ─────────────────────────────────────────────────────────────────────────────
-- USERS TABLE
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY insert_policy_app_user
  ON public.users
  FOR INSERT
  TO app_user
  WITH CHECK (true);

CREATE POLICY select_policy_app_user
  ON public.users
  FOR SELECT
  TO app_user
  USING (true);

CREATE POLICY update_policy_app_user
  ON public.users
  FOR UPDATE
  TO app_user
  USING (true)
  WITH CHECK (true);

CREATE POLICY delete_policy_app_user
  ON public.users
  FOR DELETE
  TO app_user
  USING (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- SESSION TABLE
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY insert_policy_app_user
  ON public.sessions
  FOR INSERT
  TO app_user
  WITH CHECK (true);

CREATE POLICY select_policy_app_user
  ON public.sessions
  FOR SELECT
  TO app_user
  USING (true);

CREATE POLICY update_policy_app_user
  ON public.sessions
  FOR UPDATE
  TO app_user
  USING (true)
  WITH CHECK (true);

CREATE POLICY delete_policy_app_user
  ON public.sessions
  FOR DELETE
  TO app_user
  USING (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- POLL TABLE
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;

CREATE POLICY insert_policy_app_user
  ON public.polls
  FOR INSERT
  TO app_user
  WITH CHECK (true);

CREATE POLICY select_policy_app_user
  ON public.polls
  FOR SELECT
  TO app_user
  USING (true);

CREATE POLICY update_policy_app_user
  ON public.polls
  FOR UPDATE
  TO app_user
  USING (true)
  WITH CHECK (true);

CREATE POLICY delete_policy_app_user
  ON public.polls
  FOR DELETE
  TO app_user
  USING (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- OPTION TABLE
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.options ENABLE ROW LEVEL SECURITY;

CREATE POLICY insert_policy_app_user
  ON public.options
  FOR INSERT
  TO app_user
  WITH CHECK (true);

CREATE POLICY select_policy_app_user
  ON public.options
  FOR SELECT
  TO app_user
  USING (true);

CREATE POLICY update_policy_app_user
  ON public.options
  FOR UPDATE
  TO app_user
  USING (true)
  WITH CHECK (true);

CREATE POLICY delete_policy_app_user
  ON public.options
  FOR DELETE
  TO app_user
  USING (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- VOTE TABLE
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY insert_policy_app_user
  ON public.votes
  FOR INSERT
  TO app_user
  WITH CHECK (true);

CREATE POLICY select_policy_app_user
  ON public.votes
  FOR SELECT
  TO app_user
  USING (true);

CREATE POLICY update_policy_app_user
  ON public.votes
  FOR UPDATE
  TO app_user
  USING (true)
  WITH CHECK (true);

CREATE POLICY delete_policy_app_user
  ON public.votes
  FOR DELETE
  TO app_user
  USING (true);
