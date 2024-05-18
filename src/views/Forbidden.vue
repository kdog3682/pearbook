<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleGoBack = () => {
 router.push({name: 'home'})
}
const local = useLocalData()
const username = computed(() => local.get('username'))
const pinFetch = usePiniaFetchStudentData()
const accountData = pinFetch.getStorage('accountData')

function goStudentHome() {
    router.push({name: 'student-home', params: {username: accountData.username}})
}
</script>

<template lang="pug">
div.forbidden
 h1.forbidden__title Access Forbidden
 p.forbidden__message Permission not granted to access the account of {{username}}.
 button.forbidden__button(@click="handleGoBack") Home Page
 button.student-home(@click="goStudentHome" v-if = 'accountData') Account Page
</template>

<style lang="stylus" scoped>
.forbidden
 display: flex
 flex-direction: column
 align-items: center
 background-color: #f5f5f5

 &__title
   font-size: 2.5rem
   font-weight: bold
   color: #333
   margin-bottom: 1rem

 &__message
   font-size: 1.2rem
   color: #666
   margin-bottom: 2rem

 &__button
   padding: 0.8rem 1.6rem
   background-color: #007bff
   color: #fff
   border: none
   border-radius: 0.25rem
   font-size: 1rem
   cursor: pointer
   transition: background-color 0.3s ease

   &:hover
     background-color: #0056b3
</style>
