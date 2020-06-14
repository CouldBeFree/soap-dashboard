<template>
  <div>
    <v-row>
      <v-col md="2" lg="2"/>
      <v-col md="9"  lg="9">
        <info-editor
          :product="product"
        />
        <image-upload-v2
          :images="product.images"
        />
      </v-col>
      <v-col md="2" lg="2"/>
    </v-row>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import ImageUploadV2 from "../../components/ImageUploadV2";
  import InfoEditor from "../../components/InfoEditor";

  export default {
    name: "product",
    components: {
      ImageUploadV2,
      InfoEditor
    },
    async mounted() {
      await this.getProduct(this.$route.params.id);
    },
    methods: {
      ...mapActions('products', ['getProduct'])
    },
    computed: {
      ...mapState('products', {
        product: state => state.details
      })
    }
  }
</script>

<style scoped>

</style>
