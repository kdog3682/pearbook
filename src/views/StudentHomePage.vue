<template lang="pug">
    h1 {{student.name}}

    // m-list(accessor = 'internalLinks')
        // template(#default = "item")
            // router-link(:to = "computeLinkAddress(item)") {{$t(item.name)}}

    // m-list(accessor = 'externalLinks')
        // template(#default = "item")
            // router-link(:to = "computeLinkAddress(item)") {{item.name}}

    // .router-container
        // router-view
        
     // .assignments
         // assignment-snippet(v-for = "id in student.assignmentIds" :assignmentId = 'id')
</template>

<script setup>
    import {routes} from '../router.js'
const assignmentIds = [1,2,3]
    const route = useRoute()
console.log(route.params)
    const router = useRouter()
    const [first, ...externalLinks] = routes[2].children
    const internalLinks = first.children
    defineExpose({internalLinks, externalLinks})

const students = {
    sam: { name: 'sammy', assignmentIds },
    ham: { name: 'hammy' },
}
function get(username) {
    return students[username  ]
}
const student = reactive(get(route.params.username))

const computeLinkAddress = (link) => {
    return {
        name: link.name,
    }
}

</script>


<style lang="stylus">

.router-container
    border: 1px solid red
    min-height: 100px
</style>
