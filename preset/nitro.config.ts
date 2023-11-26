import type { NitroPreset } from "nitropack";
import { fileURLToPath } from "node:url"

export default <NitroPreset>{
    extends: "vercel", // You can extend existing presets
    entry: fileURLToPath(new URL("./entry.ts", import.meta.url)),
    serveStatic: true,
    hooks: {
        compiled() {
            // ...
        },
    },
};