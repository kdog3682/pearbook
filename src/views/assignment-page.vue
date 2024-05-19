<template lang="pug">
div
  h2(v-if="desc") {{ desc }}
  p Points: {{ points }}
  p(v-if="topics") Topics: {{ topics.join(', ') }}
  p(v-if="difficulty") Difficulty: {{ difficulty }}
  div
    button(@click="toggleShowAll") {{ showAll ? 'Show One at a Time' : 'Show All' }}
  div(v-if="showAll")
    div(v-for="(problem, index) in problemset" :key="index")
      problem-set-item(:problem="problem")
  div(v-else)
    div(v-if="currentProblem")
      problem-set-item(:problem="currentProblem")
    div
      button(@click="prevProblem" :disabled="currentIndex === 0") Previous
      button(@click="nextProblem" :disabled="currentIndex === problemset.length - 1") Next
</template>

<script setup>
import { ref, reactive } from 'vue'
import ProblemSetItem from './ProblemSetItem.vue'

const props = defineProps({
  points: {
    type: Number,
    required: true
  },
  id: {
    type: String,
    default: ''
  },
  difficulty: {
    type: Number,
    default: 0
  },
  desc: {
    type: String,
    default: ''
  },
  snippet: {
    type: String,
    default: ''
  },
  resources: {
    type: String,
    default: ''
  },
  template: {
    type: String,
    default: ''
  },
  topics: {
    type: Array,
    default: () => []
  },
  problemset: {
    type: Array,
    default: () => []
  }
})

const showAll = ref(false)

const toggleShowAll = () => {
  showAll.value = !showAll.value
  currentIndex.value = 0
}

export function useProblemNavigation(problemset) {
  const currentIndex = ref(0)

  const prevProblem = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--
    }
  }

  const nextProblem = () => {
    if (currentIndex.value < problemset.length - 1) {
      currentIndex.value++
    }
  }

  const currentProblem = computed(() => {
    return problemset[currentIndex.value]
  })

  return {
    currentIndex,
    prevProblem,
    nextProblem,
    currentProblem
  }
}

const { currentIndex, prevProblem, nextProblem, currentProblem } = useProblemNavigation(props.problemset)

</script>

<style lang="stylus" scoped>
button
  margin-right: 10px
</style>
