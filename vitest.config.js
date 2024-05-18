import { fileURLToPath } from "node:url"
import { defineConfig, mergeConfig, } from "vitest/config"
import viteConfig from "./vite.config.js"

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: "jsdom",
            globals: true,
            exclude: [
                "tests/1.js",
                "tests/2.js",
                "tests/3.js",
            ],

            include: [
                "tests/*.js"
            ],
            root: fileURLToPath(new URL("./", import.meta.url)),
        },
    }),
)
