// import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler';
import './style.styl'
import Pearbook from './components/Pearbook.vue'
import router from './router.js'
createApp(Pearbook).use(router).mount('#app')
