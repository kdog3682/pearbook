<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})

const show = ref(false)
const abcInput = ref('')
const computedInputValue = computed(() => {
    return abcInput.value.repeat(2)
})
</script>

<template lang="pug">
  input.abc(v-model = 'abcInput')
  p {{computedInputValue}}
  button.greetings(@click= 'show = !show')
    h1.green(v-if = 'show')  {{ msg }}
    h3
      | You’ve successfully created a project with
      a(href="https://vitejs.dev/" target="_blank" rel="noopener") Vite
      |  +
      a(href="https://vuejs.org/" target="_blank" rel="noopener") Vue 3
      | .
</template>

<style scoped lang="stylus">
h1
  font-weight 500
  font-size 2.6rem
  position relative
  top -10px

h3
  font-size 1.2rem

.greetings
  h1, h3
    text-align center

  @media (min-width: 1024px)
    h1, h3
      text-align left
</style>

