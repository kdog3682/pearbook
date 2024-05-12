// import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler';
import './style.styl'
import Pearbook from './components/Pearbook.vue'
import router from './router.js'
import { createPinia } from 'pinia'


const pinia = createPinia()
createApp(Pearbook).use(pinia).use(router).mount('#app')
