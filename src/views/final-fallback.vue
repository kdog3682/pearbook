<template lang="pug">
    p howdy from FINAL FALLBACK
    p invalid url https://brooklynlearning.github.io{{$route.fullPath}}
    button(@click = '$router.push({name: "home"})') go home
</template>


<style lang="stylus">
.templater
    color: black
.url
    color: blue
    
</style>



