#!/usr/bin/env node
/**
 * Runs every *.sql file in supabase/migrations/, in filename order, against
 * DATABASE_URL — tracking what's already been applied in a
 * `public.schema_migrations` table so re-running this script is a no-op for
 * anything already applied (idempotent, safe to re-run after adding a new
 * migration file).
 *
 * This project has no local Docker/Supabase-CLI dev stack available, so
 * migrations run directly against the hosted project via a plain `pg`
 * connection instead of `supabase db push`.
 */
import pg from "pg";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.join(__dirname, "..", "supabase", "migrations");

function loadEnv() {
  const envPath = path.join(__dirname, "..", ".env.local");
  const env = {};
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    if (!line.includes("=") || line.trim().startsWith("#")) continue;
    const i = line.indexOf("=");
    env[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return env;
}

async function run() {
  const env = loadEnv();
  const connectionString = env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL not found in .env.local");

  const client = new pg.Client({ connectionString });
  await client.connect();

  await client.query(`
    create table if not exists public.schema_migrations (
      filename text primary key,
      applied_at timestamptz not null default now()
    );
  `);

  const { rows: appliedRows } = await client.query("select filename from public.schema_migrations");
  const applied = new Set(appliedRows.map((r) => r.filename));

  const files = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  let appliedCount = 0;
  for (const file of files) {
    if (applied.has(file)) {
      console.log(`skip  ${file} (already applied)`);
      continue;
    }
    const sql = readFileSync(path.join(MIGRATIONS_DIR, file), "utf8");
    console.log(`apply ${file} ...`);
    try {
      await client.query("begin");
      await client.query(sql);
      await client.query("insert into public.schema_migrations (filename) values ($1)", [file]);
      await client.query("commit");
      console.log(`  ok`);
      appliedCount++;
    } catch (err) {
      await client.query("rollback");
      console.error(`  FAILED: ${err.message}`);
      await client.end();
      process.exit(1);
    }
  }

  console.log(`\nDone. ${appliedCount} migration(s) applied, ${files.length - appliedCount} already up to date.`);
  await client.end();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
