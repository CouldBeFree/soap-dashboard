<template>
  <div>
    <v-row>
      <v-col md="2" lg="2"/>
      <v-col md="8" lg="8">
        <info-editor
          :product="product"
          @input="setDetailsParam"
        />
        <image-upload-v2
          :images="product.images"
          @input="setDetailsParam"
        />
        <div class="d-flex justify-sm-end">
          <v-btn
            @click="onSave"
            right
            color="primary"
            medium
            class="mt-4"
            :loading="loading"
          >
            Save
          </v-btn>
        </div>
      </v-col>
      <v-col md="2" lg="2"/>
    </v-row>
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
  import { mapState, mapActions, mapMutations } from 'vuex';
  import ImageUploadV2 from "../../components/ImageUploadV2";
  import InfoEditor from "../../components/InfoEditor";

  export default {
    name: "product",
    data: () => ({
      loading: false,
      snackbar: false
    }),
    components: {
      ImageUploadV2,
      InfoEditor
    },
    async mounted() {
      await this.getProduct(this.$route.params.id);
    },
    methods: {
      ...mapActions('products', ['getProduct', 'saveProduct']),
      ...mapMutations('products', ['setDetailsParam']),
      async onSave() {
        this.loading = true;
        await this.saveProduct();
        this.snackbar = true;
        this.loading = false;
      },
      onImagesUpdate(images) {
        console.log(images);
      }
    },
    computed: {
      ...mapState('products', {
        product: state => state.details,
        error: state => state.error,
        success: state => state.success
      })
    }
  }
</script>

<style scoped>

</style>
