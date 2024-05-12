<template lang="pug">
div
  h2 {{ assignment.title }}
  p {{ assignment.description }}
  p Due Date: {{ assignment.dueDate }}
  button(@click = '$router.go(-1)') back
</template>

<script setup>
import { computed } from 'vue'
import { useAssignmentStore } from '@/stores/useAssignmentStore'

const props = defineProps({
  assignmentId: {
    required: true
  }
})



const store = useAssignmentStore()
const assignment = store.get(props.assignmentId)

// import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteUpdate(async (to, from) => {
    console.log(to, 'to')
    console.log(from, 'from')
})
</script>

<style lang="stylus" scoped>
div
  padding: 1rem
  border: 1px solid #ccc
  border-radius: 0.5rem
  margin-bottom: 1rem
</style>
