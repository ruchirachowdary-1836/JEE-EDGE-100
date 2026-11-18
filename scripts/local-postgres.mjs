// Starts a real PostgreSQL server for local development without Docker or a
// system install. Data lives in ./.pgdata. Stop with Ctrl+C.
import EmbeddedPostgres from "embedded-postgres";
import { existsSync } from "node:fs";
import path from "node:path";

const dataDir = path.resolve(".pgdata");
const pg = new EmbeddedPostgres({
  databaseDir: dataDir,
  user: "jee",
  password: "jee_local_dev",
  port: 5433,
  persistent: true,
  // Force UTF-8 so content with Greek letters, subscripts and math symbols is stored correctly
  // (on Windows initdb otherwise inherits the WIN1252 codepage).
  initdbFlags: ["--encoding=UTF8", "--locale=C"],
});

const fresh = !existsSync(path.join(dataDir, "PG_VERSION"));
if (fresh) await pg.initialise();
await pg.start();
if (fresh) await pg.createDatabase("jee_edge");
console.log("PostgreSQL running on localhost:5433 (database jee_edge). Ctrl+C to stop.");

const stop = async () => { await pg.stop(); process.exit(0); };
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
setInterval(() => {}, 1 << 30);
