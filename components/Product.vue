<template>
  <v-card>
    <nuxt-link :to="`product/${product._id}`" style="text-decoration: none;">
      <v-img
        style="cursor: pointer;"
        :src="url"
        :lazy-src="image"
        class="white&#45;&#45;text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
      >
        <v-card-title style="color: white;" class="pb-0 subtitle-1" v-text="product.name"></v-card-title>
        <v-card-subtitle style="color: white;" class="pb-0 pt-4" v-text="convertCategory(product.category)"></v-card-subtitle>
      </v-img>
    </nuxt-link>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        @click="$emit('remove', product._id)"
        icon
      >
        <v-icon>mdi-beaker-remove</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  const imgLink = require('../assets/images/no-image.png');
  const categories = {
    'woman': 'жіноче',
    'man': 'чоловіче',
    'baby-soap': 'дитяче',
    'bouquets': 'букети',
    'kits': 'набори',
    'natural': 'натуральне'
  };

  export default {
    name: "Product",
    props: ['product'],
    data: () => ({
      image: imgLink
    }),
    methods: {
      convertCategory(category) {
        return categories[category]
      }
    },
    computed: {
      url() {
        if (this.product.images && this.product.images[0] && this.product.images[0].path) {
          return `http://localhost:5050/${this.product.images[0].path}`;
        } else {
          return this.image;
        }
      }
    }
  }
</script>

<style scoped>

</style>
