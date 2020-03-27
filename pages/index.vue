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
      @save="onSubmit"
      :loading="loading"
    >
      <template v-slot:title>
        <p class="mb-0" v-if="details._id">Редагувати продукт</p>
        <p class="mb-0" v-else>Створити новий продукт</p>
      </template>
    </product-form>
    <v-snackbar
      v-model="snackbar"
      :color="error ? 'error' : 'success'"
      :timeout="5000"
    >
      {{ error ? error : success }}
      <v-btn
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import ProductForm from "../components/ProductForm";

export default {
  data: () => ({
    isOpen: false,
    loading: false,
    snackbar: false
  }),
  components: {
    ProductForm
  },
  methods: {
    ...mapMutations('products', ['setDetailsParam']),
    ...mapActions('products', ['saveProduct']),
    async onSubmit() {
      this.loading = true;
      await this.saveProduct();
      this.snackbar = true;
      this.isOpen = false;
      this.loading = false;
    }
  },
  computed: {
    ...mapState('products', {
      details: state => state.details,
      error: state => state.error,
      success: state => state.success
    })
  }
}
</script>
