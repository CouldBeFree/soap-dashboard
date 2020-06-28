<template>
  <v-app dark>
    <v-card
      class="overflow-hidden"
      :height="height"
    >
      <v-app-bar
        color="info"
        dark
        :collapse-on-scroll="true"
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>
          <nuxt-link :to="'/'" class="link">Soap dashboard</nuxt-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
          v-if="isUser"
          icon
          @click="logOut"
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            active-class="deep-purple--text text--accent-4"
          >
            <nuxt-link :to="'/'" style="text-decoration: none;">
              <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-star-three-points</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Products</v-list-item-title>
              </v-list-item>
            </nuxt-link>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    data: () => ({
      drawer: false,
      height: '100%',
      color: 'info'
    }),
    computed: {
      ...mapState('auth', {
        user: state => state.user
      }),
      isUser() {
        return Object.keys(this.user).length != 0;
      }
    },
    methods: {
      ...mapMutations('auth', ['setUser', 'setToken']),
      logOut() {
        localStorage.removeItem('soap');
        this.setUser({});
        this.setToken('');
        this.$router.push('/login');
      }
    }
  }
</script>
<style scoped>
  .link {
    text-decoration: none;
    color: inherit;
  }
</style>
