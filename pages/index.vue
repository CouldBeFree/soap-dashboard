<template>
  <div>
    <v-btn
      class="mx-2 mt-2"
      fab
      dark
      color="info"
      :right="true"
      :class="{sticky: sticky}"
      style="transition: .9s"
      fixed
      @click="isOpen = !isOpen"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <v-row>
      <v-col
        v-for="product in products"
        :key="product._id"
        cols="12"
        sm="4"
        md="2"
      >
        <product
          :product="product"
          @remove="onRemove"
        >
        </product>
      </v-col>
    </v-row>
    <product-form
      v-model="isOpen"
      @data="setDetailsParam"
      @save="onSubmit"
      :loading="loading"
      :product="details"
    />
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
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title>Ви впевнені що хочете видалити цей продукт?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="info"
            text
            @click="dialog = false"
          >
            Відмінити
          </v-btn>
          <v-btn
            color="info"
            text
            @click="onProductRemove"
            :loading="loading"
          >
            Видалити
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import ProductForm from "../components/ProductForm";
import Product from '../components/Product';

export default {
  data: () => ({
    isOpen: false,
    loading: false,
    snackbar: false,
    sticky: false,
    dialog: false,
    productId: ''
  }),
  components: {
    ProductForm,
    Product
  },
  methods: {
    ...mapMutations('products', ['setDetailsParam', 'setDetails']),
    ...mapActions('products', ['saveProduct', 'getProducts', 'removeProduct', 'getProduct']),
    async onSubmit() {
      this.loading = true;
      await this.saveProduct();
      await this.getProducts();
      this.snackbar = true;
      this.isOpen = false;
      this.loading = false;
    },
    async onProductRemove() {
      this.loading = true;
      await this.removeProduct(this.productId);
      await this.getProducts();
      this.dialog = false;
      this.loading = false;
    },
    onRemove(id) {
      this.productId = id;
      this.dialog = true;
    }
  },
  async mounted() {
    await this.getProducts();
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapState('products', {
      details: state => state.details,
      error: state => state.error,
      success: state => state.success,
      products: state => state.products
    })
  },
  watch: {
    isOpen(val) {
      if(val !== true) {
        this.setDetails({})
      }
    }
  }
}
</script>

<style scoped>
  .sticky {
    top: 0;
    transition: .8s;
  }
</style>
