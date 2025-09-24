CREATE DATABASE n8n;
START TRANSACTION;

CREATE TABLE public.projects
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
)
WITH (autovacuum_enabled = true);

COMMIT;