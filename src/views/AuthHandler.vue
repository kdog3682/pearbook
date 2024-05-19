<!-- src/components/AuthHandler.vue -->
<template>
  <div v-if="user">
    <h1>Welcome, {{ user.displayName || user.email }}</h1>
    <button @click="signOut">Sign Out</button>
  </div>
  <div v-else>
    <h1>Please sign in</h1>
    <button @click="signIn">Sign In</button>
  </div>
</template>

<script setup>
const fb = useAuth()
</script>


