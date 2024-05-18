// import { createApp } from 'vue'
import { createApp } from "vue/dist/vue.esm-bundler"
import "./style.styl"
import { createTranslationOptions } from "./createTranslationOptions.js"
import { createNavigationGuards } from "./createNavigationGuards.js"
import Pearbook from "./components/Pearbook.vue"
import router from "./router.js"
import { createPinia } from "pinia"
import { createI18n } from "vue-i18n"

const pinia = createPinia()
const i18n = createI18n(createTranslationOptions())
const app = createApp(Pearbook)

app.use(i18n)
app.use(router)
app.use(pinia)

router.beforeEach(createNavigationGuards(pinia))

app.mount("#app")
