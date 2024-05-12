// import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler';
import './style.styl'
import {createTranslationOptions} from './createTranslationOptions.js'
import Pearbook from './components/Pearbook.vue'
import router from './router.js'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'


const pinia = createPinia()
const i18n = createI18n(createTranslationOptions())
const app = createApp(Pearbook).use(i18n).use(pinia).use(router).mount('#app')
