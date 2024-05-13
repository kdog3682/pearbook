<script setup>
const props = defineProps({
 fullName: {
   type: String,
   required: true
 },
 enrollment: {
   type: String,
   required: true
 },
 gradeLevel: {
   type: String,
   required: true
 }
})

const computedTable = computed(() => {
    const rows = [
        ['Name', props.fullName],       
        ['Grade Level', props.gradeLevel],       
        ['Enrollment', props.enrollment],       
    ]
    return {
        rows
    }
})
</script>

<template lang="pug">

 v-tooltip(:label = 'fullName')
     template #tooltip
        v-table(v-bind = 'computedTable')

</template>

<style lang="stylus">
.cohort-member
 position: relative
 display: inline-block
 padding: 0.25rem 0.5rem
 background-color: #f0f0f0
 border-radius: 0.25rem
 cursor: pointer

.details
 position: absolute
 top: calc(100% + 0.5rem)
 left: 50%
 transform: translateX(-50%)
 background-color: #333
 color: #fff
 padding: 0.5rem
 border-radius: 0.25rem
 z-index: 1
 white-space: nowrap

.detail
 font-size: 0.9rem
</style>
