<template lang="pug">
    div

        h1 Student Home Page
        h2 {{username}}

        v-info(:value = 'accountData', label = 'accountData')

        v-links(:value = 'links')

        .router-container
            router-view

        v-list(:value = "assignmentItems")
            template(#default = "item")
                assignment-snippet(v-bind = 'item')
        
</template>

<script setup>
const props = defineProps(['userId'])
const links = ['details', 'timeline']

const {
    accountData,
    assignmentItems,
    username,
} = usePiniaStudent()

</script>


<style lang="stylus">

.router-container
    border: 1px solid red
    min-height: 100px
</style>
