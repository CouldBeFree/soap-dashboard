<template>
  <v-card>
    <v-img
      :src="`http://localhost:5050/${product.thumb.url}`"
      lazy-src="https://picsum.photos/id/1/200/200"
      class="white&#45;&#45;text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
    >
      <v-card-title v-text="product.name"></v-card-title>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: "Product",
    props: ['product']
  }
</script>

<style scoped>

</style>
