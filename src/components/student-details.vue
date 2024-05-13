<script setup>


function get(username) {
const data = {
  fullName: username
  cohort: {
    name: "Cohort A",
    startDate: "2023-01-01",
    endDate: "2023-06-30",
    students: [
      {
        name: "John Doe",
        enrollment: "2022-12-15",
        gradeLevel: "12th Grade"
      },
      {
        name: "Jane Smith",
        enrollment: "2022-11-01",
        gradeLevel: "11th Grade"
      },
      {
        name: "Bob Johnson",
        enrollment: "2023-01-15",
        gradeLevel: "10th Grade"
      },
      {
        name: "Alice Williams",
        enrollment: "2022-09-01",
        gradeLevel: "12th Grade"
      }
    ]
  },
  studentGroup: ["Jane Smith", "Bob Johnson"],
  registrationDate: "2022-12-15",
  funFacts: [
    "Loves reading books",
    "Plays guitar as a hobby",
    "Interested in AI and machine learning"
  ],
  estimatedGraduationDate: "2024-06-30",
  gradeLevel: "12th Grade"
}

}

const t = (x) => x

const props = defineProps(['username'])
const data = reactive(get(props.username))
const showCohortMembers = ref(false)
const toggleCohortMembers = () => {
 showCohortMembers.value = !showCohortMembers.value
}
</script>

<template lang="pug">

h1 {{fullName}}
h2 {{className}}

table.student-details
 tr
   th {{ t('gradeLevel') }}
   td {{ gradeLevel }}
 tr
   th {{ t('estimatedGraduationDate') }}
   td {{ estimatedGraduationDate }}
 tr
   th {{ t('studentGroup') }}
   td
     ul
       li(v-for="member in studentGroup" :key="member") {{ member }}
 tr
   th {{ t('cohort') }}
   td
      table.cohort
        tr
            th {{t('cohortDate')}}
            td {{cohort.startDate}}
        tr
            th {{t('students')}}
            td
                div(v-if = 'showCohortMembers')
                    cohort-member(v-bind = 'student' v-for = 'student in cohort.students')
                div(v-else)
                    span {{cohort.students.length}} students
                    span
                        button.show-cohort-button(@click = 'showCohortMembers = true') {{ t('show details') }}
      Members
       .group(@click="toggleCohortMembers")
         span {{ cohort.name }}
         span(v-if="showCohortMembers")
           span.cohort-member(v-for="member in cohort.members" :key="member") {{ member }}
 tr(v-if="funFacts.length > 0")
   th {{ t('funFacts') }}
   td
     ul
       li(v-for="fact in funFacts" :key="fact") {{ fact }}
</template>

<style lang="stylus">
.student-details
 width: 100%
 border-collapse: collapse

th
 font-weight: bold
 text-align: left
 padding: 0.5rem
 width: 10rem
 vertical-align: top

td
 padding: 0.5rem
 cursor: pointer

.cohort-member
 display: block
 margin-left: 1rem
</style>
