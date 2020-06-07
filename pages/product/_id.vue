<template>
  <div>
    <v-row>
      <v-col lg="3"/>
      <v-col lg="6">
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
        <v-card
          class="pa-6 mt-6"
          outlined
          light
        >
          <v-card-title class="pa-0">Картинки товару</v-card-title>
          <div class="grid-container">
            <div class="item" v-for="i in 19" :key="i"></div>
            <div class="upload-button">
              <input type="file" id="file" accept="image/*">
              <label class="upload-label" for="file">Завантажити картинку</label>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col lg="3"/>
    </v-row>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    async mounted() {
      await this.getProduct(this.$route.params.id);
    },
    methods: {
      ...mapActions('products', ['getProduct']),
      onEditorUpdate(val) {

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
  .label {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.6);
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-gap: .8rem;
  }

  .item {
    border: 1px solid red;
    border-radius: 3px;
  }

  .item:first-child {
    grid-column: 1/span 2;
    grid-row: 1/span 2;
    height: 100%;
  }

  .item:not(:first-child) {
    height: 110px;
  }

  .upload-button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 3px;
    border: .2rem dashed #dfe3e8;
    overflow: hidden;
  }

  input[type="file"] {
    display: none;
  }

  .upload-label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
</style>
