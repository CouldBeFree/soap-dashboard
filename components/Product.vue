<template>
  <v-card>
    <v-img
      :src="`http://localhost:5050/${product.thumb.url}`"
      :lazy-src="image"
      class="white&#45;&#45;text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
    >
      <v-card-title class="pb-0 subtitle-1" v-text="product.name"></v-card-title>
      <v-card-subtitle class="pb-0 pt-4" v-text="product.category"></v-card-subtitle>
    </v-img>

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

  export default {
    name: "Product",
    data: () => ({
      image: imgLink
    }),
    props: ['product']
  }
</script>

<style scoped>

</style>
