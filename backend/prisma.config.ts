import { config as loadEnv } from "dotenv";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, env } from "prisma/config";

const backendRoot = fileURLToPath(new URL(".", import.meta.url));
const repositoryRoot = resolve(backendRoot, "..");

loadEnv({ path: resolve(repositoryRoot, ".env") });

export default defineConfig({
  schema: resolve(backendRoot, "prisma/schema.prisma"),
  migrations: {
    path: resolve(backendRoot, "prisma/migrations"),
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
