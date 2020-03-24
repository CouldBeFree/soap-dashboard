<template>
  <v-row justify="center">
    <v-dialog :value="value" max-width="600px">
      <v-card color="accent">
        <v-card-title class="pb-0">
          <slot name="title"></slot>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" class="ma-0 pa-0">
                <v-text-field
                  class="mt-0 pt-0"
                  label="Назва продукту*"
                  required
                  @change="$emit('data', ['name', $event])"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="ma-0 pr-1 pl-0 pt-0 pb-0">
                <v-select
                  :items="category"
                  label="Категорія*"
                  required
                  @change="$emit('data', ['category', $event])"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" class="ma-0 pl-1 pr-0 pt-0 pb-0">
                <v-text-field
                  label="Ціна*"
                  type="number"
                  required
                  @change="$emit('price', ['category', $event])"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" class="ma-0 pr-1 pl-0 pt-0 pb-0">
                <v-file-input
                  accept="image/*"
                  label="Головна картинка"
                  @change="onInput('single', $event)"
                ></v-file-input>
                <v-img
                  max-height="200px"
                  :contain="true"
                  v-if="localImage"
                  :src="localImage"
                ></v-img>
              </v-col>
              <v-col cols="12" sm="12" class="ma-0 pl-1 pr-0 pt-0 pb-0">
                <v-file-input
                  @change="onInput('multiple', $event)"
                  accept="image/*"
                  multiple label="Картинки товарів"
                  v-model="imageItems"
                ></v-file-input>
              </v-col>
              <v-col
                v-for="(image, index) in localImages"
                cols="12"
                sm="2"
                class="pa-1"
                style="text-align: right;"
              >
                <v-badge
                  color="transparent"
                  left
                  style="cursor: pointer;"
                >
                  <v-icon
                    color="grey lighten-1"
                    x-small
                    @click="onImageRemove(index)"
                  >
                    mdi-close
                  </v-icon>
                </v-badge>
                <v-img
                  max-height="300px"
                  :contain="true"
                  v-if="localImages.length > 0"
                  :src="image"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
          <small>*обов'язкові поля для заповнення</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('input', false)">Close</v-btn>
          <v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    name: "ProductForm",
    props: ['value'],
    data: () => ({
      dialog: false,
      category: ['woman', 'man', 'baby-soap', 'bouquets', 'kits', 'natural'],
      localImage: '',
      localImages: [],
      imageItems: [],
      imageItem: '',
      hover: false
    }),
    methods: {
      onInput(type, val) {
        if(type === 'single' && val) {
          this.localImage = window.URL.createObjectURL(val);
          this.imageItem = val;
        } else if(type === 'single' && !val) {
          this.localImage = '';
          this.imageItem = '';
        }

        if(type === 'multiple' && val && val.length) {
          val.forEach((file) => {
            this.localImages.push(window.URL.createObjectURL(file));
          });
        } else if(type === 'multiple' && val && !val.length) {
          this.localImages = [];
        }
      },
      onSave(){
        this.$emit('save');
      },
      onImageRemove(index) {
        this.localImages.splice(index, 1);
        this.imageItems.splice(index, 1);
      }
    }
  }
</script>

<style scoped>

</style>
