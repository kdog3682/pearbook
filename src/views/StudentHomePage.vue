<template lang="pug">
    h1 {{student.name}}
    router-view
</template>

<script setup>

    const route = useRoute()
const students = {
    sam: { name: 'sammy' },
    ham: { name: 'hammy' },
}
function get(username) {
    return students[username  ]
}
    const student = reactive(get(route.params.username))


</script>


<style lang="stylus">

</style>
