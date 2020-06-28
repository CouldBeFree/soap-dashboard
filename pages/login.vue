<template>
  <div>
    <v-row class="align">
      <v-col md="2" lg="4"/>
      <v-col md="8" lg="4">
        <v-form
          ref="form"
          lazy-validation
          class="pb-3"
        >

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Імейл"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Пароль"
            type="password"
            required
          ></v-text-field>

          <v-btn
            :loading="loading"
            color="success"
            class="mr-4 mt-3"
            @click="onLogin"
          >
            Залогінитись
          </v-btn>
        </v-form>
        <nuxt-link class="mt-3" :to="'/register'">Немає акаунту</nuxt-link>
      </v-col>
      <v-col md="2" lg="4"/>
    </v-row>
    <v-snackbar
      v-model="isSnackBarOpen"
      :timeout="timeout"
      color="red"
    >
      {{ error }}
    </v-snackbar>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';

  export default {
    name: "login",
    data: () => ({
      password: '',
      email: '',
      emailRules: [
        v => !!v || 'Введіть імейл',
        v => /.+@.+\..+/.test(v) || 'Імейл має бути валідним'
      ],
      passwordRules: [
        v => !!v || "Введіть пароль"
      ],
      timeout: 4000,
      loading: false
    }),
    destroyed() {
      this.setError('');
    },
    computed: {
      ...mapState('auth', {
        error: state => state.error
      }),
      isSnackBarOpen:{
        get() {
          return !!this.error
        },
        set(val) {
          this.setError(val);
        }
      }
    },
    methods: {
      ...mapActions('auth', ['postUserData']),
      ...mapMutations('auth', ['setSubmitType', 'setError']),
      async onLogin() {
        const userData = {};
        const valid = this.$refs.form.validate();
        if (valid) {
          this.setSubmitType('login');
          userData.email = this.email;
          userData.password = this.password;
          this.loading = true;
          await this.postUserData(userData);
          this.loading = false;
        }
      }
    }
  }
</script>

<style scoped>

</style>
