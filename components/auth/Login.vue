<template>
  <v-form v-model="isFormValid" @submit="handleLogin">
    <v-row class="wrapper">
      <v-col class="logo__wrapper" align="center">
        <logo :width="160" :height="40" />
      </v-col>
      <v-col>
        <v-text-field
          ref="loginRef"
          v-model="login"
          outlined
          rounded
          placeholder="Логин"
          color="black"
          :rules="textAreaRules"
          :disabled="isLoading"
          @keyup.enter="handleEnterInputPress(0)"
        />
        <v-text-field
          ref="passwordRef"
          v-model="password"
          outlined
          rounded
          type="password"
          placeholder="Пароль"
          color="black"
          :rules="textAreaRules"
          :disabled="isLoading"
          @keyup.enter="handleEnterInputPress(1)"
        />
        <v-btn
          block
          rounded
          color="primary"
          :disabled="!isFormValid"
          :loading="isLoading"
          @click="handleLogin"
          >Войти</v-btn
        >
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="6000" top right color="error"
      >{{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          color="white"
          v-bind="attrs"
          :ripple="false"
          @click="snackbar = false"
        >
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>

<style lang="scss" scoped>
.wrapper {
  flex-direction: column;
}

.logo__wrapper {
  padding-bottom: 48px;
}
</style>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      isFormValid: false,
      login: '',
      password: '',
      textAreaRules: [(v) => !!v || 'Пожалуйста, заполните поле'],
      errorMessage: '',
      snackbar: false,
    }
  },
  computed: {
    ...mapState(['isLoading']),
  },
  methods: {
    ...mapMutations(['setUser', 'setLoading']),
    async handleLogin() {
      if (!this.isFormValid) {
        return
      }

      const data = {
        login: this.login,
        password: this.password,
      }

      this.setLoading(true)

      try {
        const {
          data: { user },
        } = await this.$api.auth.login(data)

        this.setUser(user)
        this.$router.push({ path: '/' })
      } catch ({ message }) {
        if (message) {
          this.snackbar = true
          this.errorMessage = message
        }
      } finally {
        this.setLoading(false)
      }
    },
    handleEnterInputPress(number) {
      const { passwordRef } = this.$refs

      switch (number) {
        case 0: {
          if (passwordRef.$refs.input) {
            passwordRef.$refs.input.focus()
          }

          break
        }
        case 1: {
          if (this.isFormValid) {
            this.handleLogin()
          }

          break
        }
      }
    },
  },
}
</script>
