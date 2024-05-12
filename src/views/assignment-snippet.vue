<template lang="pug">
    
h2 {{ assignment.title }}
button(@click = 'accessAssignment') open

</template>

<script setup>

const props = defineProps({
    assignmentId: {required: true}
})
const router = useRouter()
function accessAssignment() {
    router.push({name: 'assignments', params: {assignmentId : props.assignmentId    }})
}

const store = useAssignmentStore()
const assignment = store.get(props.assignmentId)

</script>


<style lang="stylus">

</style>
