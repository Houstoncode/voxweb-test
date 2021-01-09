<template>
  <v-row align="center">
    <heading caption="Мой профиль" />
    <v-col cols="12">
      <div class="text-center"></div>
      <v-card elevation="0">
        <v-form v-model="isFormValid">
          <v-card-text>
            <v-row no-gutters class="inputs">
              <v-col cols="12">
                <v-row no-gutters class="input-group">
                  <v-col cols="12" sm="6" md="6" lg="6">
                    <v-text-field
                      v-model="form.name"
                      color="second"
                      label="Имя"
                      :rules="validRules"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6">
                    <v-text-field
                      v-model="form.password"
                      color="second"
                      label="Сменить пароль"
                      type="password"
                      :rules="validRules"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-row no-gutters class="input-group">
                  <v-col cols="12" sm="6" md="6" lg="6">
                    <v-text-field
                      v-model="form.surname"
                      color="second"
                      label="Фамилия"
                      :rules="validRules"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6">
                    <v-text-field
                      v-model="form.login"
                      :rules="validRules"
                      color="second"
                      label="Сменить логин"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              width="202"
              color="primary"
              class="input-btn"
              rounded
              :disabled="!isFormValid"
              @click="handleSave"
              >Сохранить</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
    <v-snackbar
      v-model="snackbar.enabled"
      top
      right
      :color="getSnackBarColor"
      :timeout="6000"
      >{{ snackbar.message }}</v-snackbar
    >
  </v-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import omit from 'lodash/omit'
import Heading from '~/components/Heading'
export default {
  components: { Heading },
  data() {
    return {
      isFormValid: false,
      form: {},
      validRules: [(v) => !!v || 'Пожалуйста, заполните поле'],
      snackbar: {
        enabled: false,
        message: '',
        success: false,
      },
    }
  },
  computed: {
    ...mapState(['user']),
    user: {
      get() {
        return this.$store.state.user
      },
      set(value) {
        this.setUser(value)
        this.form = { ...value }
      },
    },
    getSnackBarColor() {
      return this.snackbar.success ? 'green' : 'error'
    },
  },
  mounted() {
    this.form = omit(this.user, 'password')
  },
  methods: {
    ...mapMutations(['setLoading', 'setUser']),
    setSnackbarData(data) {
      const { message, success } = data

      this.snackbar = { message, success, enabled: true }
    },
    async handleSave() {
      const data = {
        ...this.user,
        ...this.form,
      }

      this.setLoading(true)

      try {
        const { data: responseData } = await this.$api.user.saveSettings(data)

        this.user = responseData.user
        this.setSnackbarData(responseData)
      } catch (error) {
        this.setSnackbarData(error)
      } finally {
        this.setLoading(false)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.input-btn {
  max-width: 600px {
    width: 100% !important;
  }
}
</style>
