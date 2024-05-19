
<template lang = 'pug'>

    ol(v-if = 'numbered')
        li(v-for = 'item, index in value')
            slot(v-bind = 'item' :index= 'index')
                v-pre(:value = 'item')
    ul(v-else)
        li(v-for = 'item, index in value')
            slot(v-bind = 'item' :index= 'index')
                v-pre(:value = 'item')
</template>


<script setup>

const props = defineProps(['value', 'numbered'])

</script>
