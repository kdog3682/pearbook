<template lang = 'pug'>
    h3 {{$t(accessor)}}

    ol(v-if = 'numbered')
        li(v-for = 'item, index in items')
            slot(v-bind = 'item' :index= 'index')
                v-pre(:value = 'item')
    ul(v-else)
        li(v-for = 'item, index in items')
            slot(v-bind = 'item' :index= 'index')
                v-pre(:value = 'item')
</template>

<script setup>
const props = defineProps(['accessor', 'numbered'])
const parent = getCurrentInstance().proxy.$parent
const items = shallowRef(parent[props.accessor])

</script>

