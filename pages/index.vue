<template>
  <div>
    <v-btn
      class="mx-2 mt-2"
      fab
      dark
      color="info"
      :right="true"
      absolute
      @click="isOpen = !isOpen"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <product-form
      v-model="isOpen"
      @data="setDetailsParam"
    >
      <template v-slot:title>
        <p class="mb-0" v-if="details._id">Редагувати продукт</p>
        <p class="mb-0" v-else>Створити новий продукт</p>
      </template>
    </product-form>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import ProductForm from "../components/ProductForm";

export default {
  data: () => ({
    isOpen: false
  }),
  components: {
    ProductForm
  },
  methods: {
    ...mapMutations('products', ['setDetailsParam'])
  },
  computed: {
    ...mapState('products', {
      details: state => state.details
    })
  }
}
</script>
