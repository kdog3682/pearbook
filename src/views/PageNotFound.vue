<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
// const temp = useTemp()
const url = computed(() => {
    
    const prefix = 'https://brooklynlearning.github.io'
    return prefix + '/' + props.id
})
</script>

<template lang="pug">
div.container
  h1.title 404 - Page Not Found
  p.description Oops! The page you're looking for ({{ url }}) couldn't be found.
  router-link.back-link(to="/") Go Back Home
</template>

<style lang="stylus" scoped>
.container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  height: 100vh
  text-align: center

.title
  font-size: 3rem
  font-weight: bold
  margin-bottom: 1rem

.description
  font-size: 1.2rem
  margin-bottom: 2rem

.back-link
  font-size: 1.1rem
  text-decoration: none
  color: #42b983
  transition: color 0.3s ease

  &:hover
    color: #2c3e50
</style>
