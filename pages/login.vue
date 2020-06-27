<template>
  <div>
    <v-row>
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
            color="success"
            class="mr-4 mt-3"
            @click="onRegister"
          >
            Залогінитись
          </v-btn>
        </v-form>
        <nuxt-link class="mt-3" :to="'/register'">Немає акаунту</nuxt-link>
      </v-col>
      <v-col md="2" lg="4"/>
    </v-row>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';

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
      ]
    }),
    methods: {
      ...mapActions('auth', ['postUserData']),
      ...mapMutations('auth', ['setSubmitType', 'setError']),
      async onRegister() {
        const user = {};
        const valid = this.$refs.form.validate();
        if (valid) {
          this.setSubmitType('login');
          user.email = this.email;
          user.password = this.password;
          const user = await this.postUserData(user);
          console.log(user);
        }
      }
    }
  }
</script>

<style scoped>

</style>
