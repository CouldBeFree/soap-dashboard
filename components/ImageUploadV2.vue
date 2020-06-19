<template>
  <div>
    <v-card
      class="pa-6 mt-6"
      outlined
      light
    >
      <v-card-title class="pa-0 mb-1">Картинки товару</v-card-title>
      <v-btn v-if="selectedImages.length" @click="selectAll" class="mb-2" small color="primary">Обрати всі</v-btn>
      <v-btn v-if="selectedImages.length" @click="removeImages" class="mb-2" small color="error">Видалити</v-btn>
      <draggable v-model="elements" :class="{ 'grid-container': images.length > 0 }" draggable=".item">
        <div
          class="item"
          v-for="(image, index) in images"
          :key="index"
        >
          <v-hover v-slot:default="{ hover }">
            <v-img
              :src="url(image)"
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
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "ImageUploadV2",
    props: {
      images: { default: () => ([]) }
    },
    data: () => ({
      localImages: [],
      selectedImages: []
    }),
    methods: {
      onReorder(val) {
        console.log(val);
      },
      imagesArray() {
        if(this.localImages.length) {
          return this.localImages;
        } else {
          return this.selectedImages;
        }
      },
      selectAll() {
        this.localImages.forEach(el => {
          el.checked = true
        });
        this.selectedImages = [...this.localImages];
      },
      removeImages() {
        this.localImages = this.localImages.filter((image) => {
          return !this.selectedImages.find((selectedImage) => {
            return image.id === selectedImage.id
          });
        });
        this.selectedImages = [];
      },
      height(index) {
        return index === 0 ? '100%' : '110px';
      },
      changeHandler(index) {
        this.localImages[index].checked = !this.localImages[index].checked;
        this.selectedImages = this.localImages.filter((el) => {
          return el.checked === true;
        });
      },
      width(index) {
        return index === 0 ? '100%' : '110px'
      },
      contain(index) {
        return index === 0 ? true : false;
      },
      onUploadImage(ev) {
        const arr = Array.from(ev.target.files);
        const newArray = this.images.concat(arr);
        this.$emit('input', ['images', [...newArray]]);
        arr.forEach((el, index) => {
          const obj = {};
          obj._id = new Date().getUTCMilliseconds() + index;
          obj.path = window.URL.createObjectURL(el);
          obj.checked = false;
          this.localImages.push(obj);
        });
      },
      url(image) {
        if(image.path) {
          return `http://localhost:5050/${image.path}`
        } else {
          return window.URL.createObjectURL(image);
        }
      }
    },
    computed: {
      elements: {
        get() {
          return [...this.images]
        },
        set(val) {
          this.$emit('input', ['images', [...val]]);
        }
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
  }

  .grid-container .item:not(:first-child) {
    height: 110px;
  }

  .upload-button {
    position: relative;
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
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
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
