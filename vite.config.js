import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"

import Vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"


function componentPath(key) {
    return `/home/kdog3682/projects/${key}/src/components`
}


function resolvePackage(name) {
    const path = `../../packages/${name}/src/index.js`
    return fileURLToPath(new URL(path, import.meta.url))
}

export default defineConfig({
    plugins: [
        Vue(),
        Components({
            dirs: [
                "src/components",
                "src/layouts",
                "src/pages",
                "src/views",
            ],
        }),
        AutoImport({
            imports: [
                "vue",
                "vue-router",
            ],
            dirs: [
                "src/composables/**",
            ],
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@foxscribe": componentPath('foxscribe')
        },
    },
    base: "/pearbook/",
})
