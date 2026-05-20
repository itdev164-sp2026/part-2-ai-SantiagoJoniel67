import os from "node:os";
import path from "node:path";

import { defineConfig } from "@playwright/test";
import { config } from "dotenv";

config({ path: ".env.local" });

export default defineConfig({
    testDir: "./tests",
    outputDir:
        process.env.PLAYWRIGHT_OUTPUT_DIR ??
        path.join(os.tmpdir(), "itdev164-course-playwright-results"),
    reporter: "list",
    use: {
    baseURL: "http://localhost:3000",
    },
    webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    },
});
