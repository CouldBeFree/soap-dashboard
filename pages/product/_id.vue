<template>
  <div>
    <v-row>
      <v-col md="2" lg="2"/>
      <v-col md="9"  lg="9">
        <v-card
          class="pa-6"
          outlined
          light
        >
          <v-text-field
            label="Назва товару"
            :value="details.name"
          />
          <v-select
            :items="category"
            :value="selectedCategory"
            label="Категорія"
          ></v-select>
          <v-text-field
            label="Ціна"
            type="number"
            :value="details.price"
            :rules="[v => !!v || 'Веедіть ціну']"
            required
          ></v-text-field>
          <span class="label">Опис товару</span>
          <ckeditor :editor="editor" @input="onEditorUpdate"></ckeditor>
        </v-card>

        <image-upload-v2/>
      </v-col>
      <v-col md="2" lg="2"/>
    </v-row>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import ImageUploadV2 from "../../components/ImageUploadV2";

  const categoriesEng = {
    'woman': 'жіноче',
    'man': 'чоловіче',
    'baby-soap': 'дитяче',
    'bouquets': 'букети',
    'kits': 'набори',
    'natural': 'натуральне'
  };

  export default {
    name: "product",
    data: () => ({
      category: ['жіноче', 'чоловіче', 'дитяче', 'букети', 'набори', 'натуральне'],
      editor: ClassicEditor
    }),
    components: {
      ImageUploadV2
    },
    async mounted() {
      await this.getProduct(this.$route.params.id);
    },
    methods: {
      ...mapActions('products', ['getProduct']),
      onEditorUpdate(val) {
        console.log(val);
      }
    },
    computed: {
      ...mapState('products', {
        details: state => state.details
      }),
      selectedCategory() {
        return categoriesEng[this.details.category]
      },
      url() {
        return this.details.thumb && this.details.thumb.url ? `http://localhost:5050/${this.details.thumb.url}` : ''
      }
    }
  }
</script>

<style scoped>

</style>
