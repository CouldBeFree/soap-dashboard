<template>
    <div>
      <h1>Register</h1>
      <v-row>
        <v-col md="2" lg="4"/>
        <v-col md="8" lg="4">
          <v-form
            ref="form"
            lazy-validation
            class="pb-3"
          >
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Ім'я"
              required
            ></v-text-field>

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
              Зареєструватись
            </v-btn>
          </v-form>
          <nuxt-link :to="'/login'">Залогінитись</nuxt-link>
        </v-col>
        <v-col md="2" lg="4"/>
      </v-row>
    </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';
  export default {
    name: "register",
    data: () => ({
      name: '',
      password: '',
      nameRules: [
        v => !!v || "Введіть ім'я"
      ],
      email: '',
      emailRules: [
        v => !!v || 'Введіть імейл',
        v => /.+@.+\..+/.test(v) || 'Імейл має бути валідним'
      ],
      passwordRules: [
        v => !!v || "Введіть пароль"
      ]
    })
  }
</script>

<style scoped>

</style>
