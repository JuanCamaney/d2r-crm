/* eslint-disable no-console */
// D2R: connect this CRM to an EXISTING Supabase project and set it up.
// Usage: npm run d2r:connect
// Steps: login -> link -> push database schema -> set secrets -> deploy edge functions -> write .env.production.local
import { input, password } from "@inquirer/prompts";
import { execa } from "execa";
import fs from "node:fs";

const DEFAULT_REF = "efwpbjqpcbaxvzjxqclv";
const run = (args, opts = {}) =>
  execa("npx", ["--yes", "supabase", ...args], { stdio: "inherit", ...opts });

(async () => {
  const projectRef = await input({
    message: "Supabase project ref:",
    default: DEFAULT_REF,
  });

  console.log("\n1/6 Logging in to Supabase (a browser window will open)...");
  await run(["login"]);

  const dbPassword = await password({
    message:
      "Database password (Supabase dashboard > Project Settings > Database):",
    mask: "*",
  });

  console.log("\n2/6 Linking project...");
  await run(["link", "--project-ref", projectRef, "--password", dbPassword]);

  console.log(
    "\n3/6 Pushing database schema (tables, views, D2R job fields)...",
  );
  await run(["db", "push", "--password", dbPassword]);

  const publishableKey = await input({
    message:
      "Publishable key (dashboard > Project Settings > API Keys, starts with sb_publishable_):",
    validate: (v) =>
      v.startsWith("sb_publishable_") || "Should start with sb_publishable_",
  });

  console.log("\n4/6 Setting edge function secrets...");
  await run([
    "secrets",
    "set",
    `SB_PUBLISHABLE_KEY=${publishableKey}`,
    "--project-ref",
    projectRef,
  ]);

  console.log("\n5/6 Deploying edge functions...");
  await run(["functions", "deploy", "--project-ref", projectRef, "--use-api"]);

  console.log("\n6/6 Writing .env.production.local ...");
  fs.writeFileSync(
    `${process.cwd()}/.env.production.local`,
    `VITE_SUPABASE_URL=https://${projectRef}.supabase.co
VITE_SB_PUBLISHABLE_KEY=${publishableKey}
VITE_IS_DEMO=false
VITE_ATTACHMENTS_BUCKET=attachments
`,
  );

  await execa("npx", ["--yes", "supabase", "logout", "--yes"], {
    reject: false,
  });
  console.log(`
Done. Next:
  npm run build && npm run preview   -> open the URL shown, sign up (first user becomes admin)
The Supabase login token was revoked locally; also check https://supabase.com/dashboard/account/tokens`);
})().catch((e) => {
  console.error("\nSetup stopped:", e.shortMessage ?? e.message);
  process.exit(1);
});
