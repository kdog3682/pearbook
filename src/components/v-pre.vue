<template lang="pug">
div
  div.name(v-if = 'name')
  pre {{ formattedValue }}
</template>

<script setup>
import { computed, toValue } from 'vue'

const props = defineProps({
  value: {
    type: [Object, Array, String, Number, Boolean, Function, Symbol, null],
    required: true
  },
  name: {
      type: String
  }
})

const formattedValue = computed(() => {
  const value = toValue(props.value)
  return JSON.stringify(value, null, 2)
})
</script>

<style lang="stylus" scoped>
pre
  white-space pre-wrap
  word-break break-all
  background-color #f5f5f5
  padding 1rem
  border-radius 0.25rem
  overflow-x auto
</style>
