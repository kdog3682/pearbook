<script setup>
const { username, rememberMe, password, failedAttempts, status, login } = useFirebaseStudentLogin()
const props = defineProps(['userId'])
import {vFocus} from '../directives/vMarked.js'

const pinia = usePiniaStudent()
const temp = pinia.getTemp()
if (temp) {
    username.value = temp
}

const router = useRouter()
const handleLogin = async () => {
    const status = await login()
    if (status) {
        router.push({name: 'student-home', params: {username: username.value}})
    }
}

onMounted(async () => {
    // await sleep(1000)
    // username.value = 'jean'
    // password.value = 'icecream'
    // await handleLogin() // reset
    // console.log('attempt 1')
    // await sleep(1000)

})


const computedUser = computed(() => {
    return props.userId || username.value
})
const autocompletePassword = computed(() => {
    return rememberMe.value ? 'current-password' : 'new-password'
})

const maxAttempts = 6
const offset = 2

const remainingAttempts = computed(() => {
    return maxAttempts - failedAttempts.value - offset
})

const disableLoginButton = computed(() => {
    return remainingAttempts.value == 0
})
</script>


<template lang="pug">
form.login-form
  div.form-group
    label(for="username") Username
    input(id="username" v-focus v-model="computedUser" type="text" placeholder="Enter your username"     autocomplete="username"
)
  div.form-group
    label(for="password") Password
    input(id="password" v-model="password" type="password" placeholder="Enter your password", :autocomplete = 'autocompletePassword')
  div.form-group
    input(id="remember-me" v-model="rememberMe" type="checkbox")
    label(for="remember-me") Remember me
  button(
    @click="handleLogin"
    type="submit"
    :disabled="disableLoginButton"
  ) Login
  div.attempts-message(v-if="failedAttempts > offset")
    span(v-if="remainingAttempts > 0") {{ remainingAttempts }} attempts remaining
    span(v-else) Too many attempts
  div(v-if = 'status.error')
      span.error {{status.error}}

</template>

<style lang="stylus" scoped>
.login-form
  background-color #e6f0ff
  padding 20px
  border-radius 5px

.form-group
  margin-bottom 15px

label
  display block
  font-weight bold
  color #3f51b5
  margin-bottom 5px

input[type="text"], input[type="password"]
  width 100%
  padding 8px
  border 1px solid #ccc
  border-radius 4px

button[type="submit"]
  background-color #3f51b5
  color white
  padding 10px 20px
  border none
  border-radius 4px
  cursor pointer

.error
    color: red
</style>
