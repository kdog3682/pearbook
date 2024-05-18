<template lang="pug">
    p howdy from not found
    p invalid url https://brooklynlearning.github.io{{$route.fullPath}}
    button(@click = '$router.push({name: "Home"})') go home
</template>

<script setup>

const props = defineProps(['pathMatch'])

const returnLink = computed(() => {
    return props.pathMatch.join('/')
})
</script>


<style lang="stylus">
.templater
    color: black
.url
    color: blue
    
</style>



