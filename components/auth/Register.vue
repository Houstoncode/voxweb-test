<template>
  <v-form v-model="isFormValid">
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
          ref="nameRef"
          v-model="name"
          outlined
          rounded
          placeholder="Имя"
          color="black"
          :rules="textAreaRules"
          :disabled="isLoading"
          @keyup.enter="handleEnterInputPress(1)"
        />
        <v-text-field
          ref="surnameRef"
          v-model="surname"
          outlined
          rounded
          placeholder="Фамилия"
          color="black"
          :rules="textAreaRules"
          :disabled="isLoading"
          @keyup.enter="handleEnterInputPress(2)"
        />
        <v-text-field
          ref="passwordRef"
          v-model="password"
          outlined
          rounded
          autocomplete="off"
          placeholder="Пароль"
          type="password"
          color="black"
          :rules="textAreaRules"
          :disabled="isLoading"
          @keyup.enter="handleEnterInputPress(3)"
        />
        <v-text-field
          ref="repeatPasswordRef"
          v-model="repeatPassword"
          outlined
          rounded
          type="password"
          autocomplete="off"
          placeholder="Подтвердите пароль"
          color="black"
          :rules="repeatPasswordRules"
          :disabled="isLoading"
          @keyup.enter="handleEnterInputPress(4)"
        />
        <v-btn
          block
          rounded
          color="primary"
          :disabled="!isFormValid"
          :loading="isLoading"
          @click="handleRegister"
          >Зарегистрироваться</v-btn
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
      name: '',
      surname: '',
      password: '',
      repeatPassword: '',
      textAreaRules: [(v) => !!v || 'Пожалуйста, заполните поле'],
      errorMessage: '',
      snackbar: false,
    }
  },
  computed: {
    ...mapState(['isLoading']),
    repeatPasswordRules() {
      return [
        (v) => !!v || 'Пожалуйста, заполните поле',
        (v) =>
          this.repeatPassword === this.password ||
          'Введенный пароли не совпадают',
      ]
    },
  },
  methods: {
    ...mapMutations(['setUser', 'setLoading']),
    async handleRegister() {
      if (!this.isFormValid) {
        return
      }

      const data = {
        login: this.login,
        name: this.name,
        surname: this.surname,
        password: this.password,
      }

      this.setLoading(true)

      try {
        const {
          data: { user },
        } = await this.$api.auth.register(data)

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

      this.$requestService.post('/register', data)
    },
    handleEnterInputPress(number) {
      const { nameRef, surnameRef, passwordRef, repeatPasswordRef } = this.$refs

      switch (number) {
        case 0: {
          if (nameRef.$refs.input) {
            nameRef.$refs.input.focus()
          }

          break
        }
        case 1: {
          if (surnameRef.$refs.input) {
            surnameRef.$refs.input.focus()
          }

          break
        }
        case 2: {
          if (passwordRef.$refs.input) {
            passwordRef.$refs.input.focus()
          }

          break
        }
        case 3: {
          if (repeatPasswordRef.$refs.input) {
            repeatPasswordRef.$refs.input.focus()
          }

          break
        }
        case 4: {
          if (this.isFormValid) {
            this.handleRegister()
          }

          break
        }
      }
    },
  },
}
</script>
