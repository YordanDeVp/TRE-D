import assert from "node:assert/strict";
import { after, test } from "node:test";
import { config as loadEnv } from "dotenv";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createPrismaClient } from "../src/database/prisma.js";

const repositoryRoot = fileURLToPath(new URL("../../", import.meta.url));
loadEnv({ path: resolve(repositoryRoot, ".env") });

const connectionString = process.env["DATABASE_URL"];
if (!connectionString) {
  throw new Error("DATABASE_URL debe estar configurada en el archivo .env de la raíz.");
}

const prisma = createPrismaClient(connectionString);

test("conecta a PostgreSQL 17 y ejecuta una consulta real", async () => {
  const [result] = await prisma.$queryRawUnsafe<
    Array<{ version: string; result: number }>
  >("SELECT version() AS version, 1 AS result");

  assert.ok(result);
  assert.match(result.version, /PostgreSQL 17\./);
  assert.equal(result.result, 1);
});

after(async () => {
  await prisma.$disconnect();
});
