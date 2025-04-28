-- This will run automatically in the default "postgres" database
-- So we add logic to create the table **only if** already inside tasksdb
\connect tasksdb;

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL
);