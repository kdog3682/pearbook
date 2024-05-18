<template lang="pug">
div
  p {{ problem }}
  div(v-if="choices")
    div(v-for="choice in choices" :key="choice")
      label
        input(type="radio" :value="choice" v-model="selectedChoice")
        span {{ choice }}
  div(v-else)
    label
      span Answer:
      input(type="text" v-model="userAnswer")
  p(v-if="isCorrect") Correct!
  p(v-else-if="showIncorrect") Incorrect. {{ hint }}
  p(v-if="!showFeedback") Please provide an answer.
</template>

<script setup>
const props = defineProps({
  problem: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    default: ''
  },
  choices: {
    type: Array,
    default: () => []
  }
})

import { ref, computed } from 'vue'

const selectedChoice = ref(null)
const userAnswer = ref('')

const isCorrect = computed(() => {
  if (props.choices) {
    return selectedChoice.value === props.answer
  } else {
    return userAnswer.value.trim().toLowerCase() === props.answer.trim().toLowerCase()
  }
})

const showIncorrect = computed(() => {
  if (props.choices) {
    return selectedChoice.value !== null && selectedChoice.value !== props.answer
  } else {
    return userAnswer.value.trim() !== '' && !isCorrect.value
  }
})

const showFeedback = computed(() => {
  if (props.choices) {
    return selectedChoice.value !== null
  } else {
    return userAnswer.value.trim() !== ''
  }
})
</script>
