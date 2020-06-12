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
          <v-card-title class="pa-0 mb-3">Картинки товару</v-card-title>
          <div :class="{ 'grid-container': images.length > 0 }">
            <div class="item" v-for="(image, index) in images" :key="index">
              <v-img
                :src="image"
                :height="height(index)"
                :max-width="width(index)"
                :contain="index === 0 ? false : true"
              ></v-img>
            </div>
            <div class="upload-button">
              <input @change="onUploadImage" type="file" id="file" multiple accept="image/*">
              <label class="upload-label" for="file">Завантажити зображення</label>
            </div>
          </div>
          <div class="d-flex justify-sm-end">
            <v-btn
              @click="onSave"
              right
              color="primary"
              medium
              class="mt-4"
            >
              Save
            </v-btn>
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
      editor: ClassicEditor,
      images: []
    }),
    async mounted() {
      await this.getProduct(this.$route.params.id);
    },
    methods: {
      ...mapActions('products', ['getProduct']),
      height(index) {
        return index === 0 ? '100%' : '110px';
      },
      width(index) {
        return index === 0 ? '100%' : '110px'
      },
      contain(index) {
        return index === 0 ? true : false
      },
      onEditorUpdate(val) {

      },
      onUploadImage(ev) {
        const arr = Array.from(ev.target.files);
        arr.forEach(el => {
          this.images.push(window.URL.createObjectURL(el));
        });
      },
      onSave() {
        console.log(this.images);
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
    grid-template-columns: repeat(6,1fr);
    grid-gap: 15px;
    min-height: 220px;
  }

  .grid-container .item {
    border: 1px solid #dfe3e8;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .grid-container .item:first-child {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: span 2;
    height: 100%;
    max-height: 235px;
  }

  .grid-container .item:not(:first-child) {
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

  .grid-container .upload-button {
    height: 110px;
  }

  input[type="file"] {
    display: none;
  }

  .upload-label {
    height: 235px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100%;
  }

  .grid-container .upload-label {
    height: 100%;
  }
</style>
