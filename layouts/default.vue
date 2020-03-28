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

        <v-toolbar-title>Title</v-toolbar-title>
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
            <v-list-item>
              <nuxt-link :to="'/'" style="text-decoration: none;">
                <v-list-item-icon>
                  <v-icon>mdi-star-three-points</v-icon>
                </v-list-item-icon>
              </nuxt-link>
              <v-list-item-title>Products</v-list-item-title>
            </v-list-item>

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
  export default {
    data () {
      return {
        drawer: false,
        height: '100%',
        color: 'info'
      }
    }
  }
</script>
