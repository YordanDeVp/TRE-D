import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import test from "node:test";
import { setTimeout as pause } from "node:timers/promises";

async function availablePort() {
  const probe = createServer();
  probe.listen(0, "127.0.0.1");
  await once(probe, "listening");
  const address = probe.address();
  if (typeof address !== "object" || address === null) {
    throw new Error("No se obtuvo un puerto local");
  }
  await new Promise((resolve) => probe.close(resolve));
  return address.port;
}

test("la portada responde por HTTP", { timeout: 60000 }, async () => {
  const port = await availablePort();
  const server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "dev", "--hostname", "127.0.0.1", "--port", String(port)],
    { cwd: process.cwd(), stdio: "ignore" },
  );

  try {
    for (let attempt = 0; attempt < 120; attempt += 1) {
      if (server.exitCode !== null) {
        throw new Error("Next.js terminó antes de responder");
      }

      try {
        const response = await fetch("http://127.0.0.1:" + port);
        if (response.ok) {
          assert.match(await response.text(), /Tienda en preparación/);
          return;
        }
      } catch {
        // El servidor todavía se está iniciando.
      }

      await pause(250);
    }

    throw new Error("Next.js no respondió dentro del plazo");
  } finally {
    server.kill();
  }
});
