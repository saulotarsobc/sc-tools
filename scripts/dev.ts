import { spawn } from 'child_process';
import { createServer } from 'vite';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const electronPath = require('electron');

(async () => {
    const server = await createServer({ configFile: "vite.config.ts" });
    spawn(electronPath, ["."], { stdio: "inherit" }).once("exit", process.exit);
    await server.listen();
})();
