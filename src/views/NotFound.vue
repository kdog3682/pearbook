<template lang="pug">
    v-templater(value = '$url is an invalid url.' :arg = 'url')
    button(@click = '$router.push({name: "Home"})') go home
</template>

<script setup>

const props = defineProps(['pathMatch'])

const url = computed(() => {
    const prefix = 'https://pearbook.github.io/'
    return prefix + props.pathMatch.join('/')
})

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



