
<script setup>
import * as utils from "/home/kdog3682/2023/utils.js"
import {onBeforeEnter, onEnter, onAfterEnter, onBeforeLeave, onLeave, onAfterLeave} from "../animations.js"
import {routes} from "../router.js"
import VInput from "@foxscribe/v-input.vue"
function push(name, params = {}) {
    router.push({ name, params})
}
onMounted(async () => {
    await utils.sleep(2000)
    push('students', {username: 'sam'})
    input.value.focus()
    // console.log(Object.keys(val))
    // push('home')
})

const input = ref(null)

function onSubmit(name) {
    router.push({name})
}
const showInput = ref(true)
const router = useRouter()


function toggleShow() {
    showInput.value =! showInput.value
    if (showInput.value) {
        touchInput()
    }
}
function goNext() {
    router.push({ name: 'profile', params: { username: 'erina' } })
}
function onKeypress(s) {
    console.log({key: s})
}
async function touchInput() {
        await utils.sleep(50)
        input.value.focus()
}
const keyHandlers = [
    { trigger: 'ctrl-/', callback: toggleShow },
    { trigger: 'ctrl-n', callback: goNext },
    { trigger: 'x', callback: onKeypress },
    { trigger: 'y', callback: touchInput },
]

import {useKeyListener} from '../composables/useKeyListener.js'
useKeyListener(keyHandlers)

</script>


<template lang= 'pug'>
    router-view
    keep-alive
        v-input(@submit = 'onSubmit' v-show = 'showInput' ref = 'input')

    v-info(:value = '$route', label = '$route')
    v-info(:value = 'routes', label = 'routes')
</template>

