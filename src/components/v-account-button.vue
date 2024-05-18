<script setup>
import { ref } from 'vue'

const isDropdownOpen = ref(false)

const openDropdown = () => {
  isDropdownOpen.value = true
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const links = [
  { name: 'Settings', path: '/settings' },
  { name: 'Inbox', path: '/inbox' },
  { name: 'Preferences', path: '/preferences' },
  { name: 'Sign Out', path: '/signout' }
]
</script>

<template lang="pug">
.account-button(@mouseover="openDropdown" @mouseleave="closeDropdown")
  button
    | Account
    i.fas.fa-chevron-down
  .dropdown(v-show="isDropdownOpen" @mouseover="openDropdown" @mouseleave="closeDropdown")
    ul
      li(v-for="link in links" :key="link.path")
        router-link(:to="link.path") {{ link.name }}
</template>

<style lang="stylus" scoped>
.account-button
  position relative
  button
    background-color #333
    color #fff
    border none
    padding 0.5rem 1rem
    cursor pointer
    display flex
    align-items center
    i
      margin-left 0.5rem
  .dropdown
    position absolute
    top 100%
    right 0
    background-color #fff
    box-shadow 0 2px 5px rgba(0, 0, 0, 0.1)
    ul
      list-style none
      padding 0
      margin 0
      li
        a
          display block
          padding 0.5rem 1rem
          text-decoration none
          color #333
          &:hover
            background-color #f5f5f5
</style>
