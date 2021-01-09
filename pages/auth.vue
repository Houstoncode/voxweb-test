<template>
  <div>
    <login v-if="!isGuest" />
    <register v-else />
  </div>
</template>

<script>
import Login from '~/components/auth/Login.vue'
import Register from '~/components/auth/Register.vue'

export default {
  components: { Login, Register },
  middleware: ['guest'],
  layout: 'auth',
  computed: {
    isGuest() {
      return !localStorage.getItem('isAlreadyRegister')
    },
  },
}
</script>
