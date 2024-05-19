<script setup>
onMounted(async () => {
    // WORKING
    // await sleepGo('hampsters')
    // await sleepGo('blogs/1')
    // await sleepGo('blogs/abcde')
    // await sleepGo('blogs/abcde/abcde', 3)
    // await sleepGo('ceasar/salad', 3)
    // await sleepGo('@')
    //////////////////////////////////////////////
    await sleepGo('auth-handler')

    // loginWithGoogle,
    // signInWithEmail,
    // loginAnonymously,
})

const input = ref(null)

function onSubmit(name) {
    router.push({name})
}
const showInput = ref(true)
const router = useRouter()
function onSelect(val) {
    console.log(val, 'was selected')
}
function onClose() {
    showInput.value = false
}
const items = ['abc', 'aaa', 'dd']
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

useKeyListener(keyHandlers)


function clearStorage() {
    localStorage.clear()
    console.log(localStorage)
}

function loadSam() {
    const obj = {
        "1910171a1818140e150f3f1a0f1a": "00591e030b12091a0f12141559414a4c4f4d4c48424f4e4248494c57590d1a170e1e594100590e081e09151a161e594159081a165957590b1a08080c14091f5941591a19185957591c091a1f1e371e0d1e1759414a4b57591d0e1717351a161e594159311413155b3914195b2816120f13590606",
        "1910171a0808121c15161e150f3f1a0f1a280f14091a1c1e301e02": "00591e030b12091a0f12141559414a4c4a4e43424a4948484d4b4957590d1a170e1e5941204a574957482606"
    }
    for (const [k, v] of Object.entries(obj)) {
        localStorage.setItem(k, v)
    }
    console.log('set sam!')
}


import * as utils from "/home/kdog3682/2023/utils.js"

async function sleepGo(url, delayAfter = 1) {
    const curl = utils.conditionalPrefix('/', url)
    router.push(curl)
    await utils.sleep(delayAfter * 1000)

}
</script>

<template lang= 'pug'>

    div.abs
        language-button
        v-account-button

    p {{ $t('examples.sayhi') }}
    button(@click = 'loadSam') loadSam
    button(@click = 'clearStorage') clearStorage

    RouterView(v-slot="{ Component }")
      template(v-if = 'Component')
        Suspense
          component(:is="Component")
          template(#fallback)
              span loading

    keep-alive
        v-fzf(:value = 'items' @select = 'onSelect' @close = 'onClose' ref = 'input' v-show = 'showInput')

    v-info(:value = '$route', label = 'currentRoute')
</template>

    <style lang = 'stylus' scoped>

.abs
    position: absolute
    top: 25px
    right: 85px
</style>
