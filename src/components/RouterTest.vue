<template>
  <button @click="redirect">Click to Edit</button>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps({
  isAuthenticated: Boolean
})

const router = useRouter()
const route = useRoute()

const redirect = () => {
  if (props.isAuthenticated) {
    router.push(`/posts/${route.params.id}/edit`)
  } else {
    router.push("/404")
  }
}
</script>

