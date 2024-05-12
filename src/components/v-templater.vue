<template lang="pug">
    render
</template>

<script setup>

defineProps(['arg', 'value', 'template'])
const render = () => {
    return h('div', 'hiii')
}

</script>


<style lang="stylus">

</style>
