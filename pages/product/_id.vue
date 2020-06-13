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
        <v-card
          class="pa-6 mt-6"
          outlined
          light
        >
          <v-card-title class="pa-0 mb-1">Картинки товару</v-card-title>
          <v-btn v-if="selectedImages.length" @click="removeImages" class="mb-2" small color="error">Видалити</v-btn>
          <div>
            <draggable v-model="images" :class="{ 'grid-container': images.length > 0 }" draggable=".item">
              <div class="item" v-for="(image, index) in images" :key="index">
                <v-hover v-slot:default="{ hover }">
                  <v-img
                    :src="image.url"
                    :height="height(index)"
                    :max-width="width(index)"
                    :contain="index === 0 ? false : true"
                  >
                    <v-expand-transition>
                      <div class="checkbox-holder" :class="{ first: index === 0 }">
                        <v-checkbox
                          v-show="hover || image.checked"
                          @change="changeHandler(index)"
                          :input-value="image.checked"
                          dense
                          hide-details
                        ></v-checkbox>
                      </div>
                    </v-expand-transition>
                  </v-img>
                </v-hover>
              </div>
              <div class="upload-button">
                <input @change="onUploadImage" type="file" id="file" multiple accept="image/*">
                <label class="upload-label" for="file">Завантажити зображення</label>
              </div>
            </draggable>
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
      <v-col md="2" lg="2"/>
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
      images: [],
      selectedImages: []
    }),
    async mounted() {
      await this.getProduct(this.$route.params.id);
    },
    methods: {
      ...mapActions('products', ['getProduct']),
      removeImages() {
        this.images = this.images.filter((objFromA) => {
          return !this.selectedImages.find((objFromB) => {
            return objFromA.id === objFromB.id
          });
        });
        this.selectedImages = [];
      },
      height(index) {
        return index === 0 ? '100%' : '110px';
      },
      changeHandler(index) {
        this.images[index].checked = !this.images[index].checked;
        this.selectedImages = this.images.filter((el) => {
          return el.checked === true;
        });
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
        arr.forEach((el, index) => {
          const obj = {};
          obj.id = index;
          obj.url = window.URL.createObjectURL(el);
          obj.checked = false;
          this.images.push(obj);
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

  .checkbox-holder {
    display: flex;
    justify-content: right;
  }

  .checkbox-holder .v-input {
    right: -15px;
    top: -10px;
    position: absolute;
    z-index: 100;
  }

  .v-responsive {
    overflow: unset;
  }

  .checkbox-holder.first .v-input {
    right: 0;
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
    cursor: pointer;
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
    /*width: 100px;*/
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
