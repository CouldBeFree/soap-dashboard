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
                <v-text-field class="mt-0 pt-0" label="Назва продукту*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="ma-0 pr-1 pl-0 pt-0 pb-0">
                <v-select
                  :items="category"
                  label="Категорія*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" class="ma-0 pl-1 pr-0 pt-0 pb-0">
                <v-text-field label="Ціна*" type="number" required></v-text-field>
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
                  v-if="mainImage"
                  :src="mainImage"
                ></v-img>
              </v-col>
              <v-col cols="12" sm="12" class="ma-0 pl-1 pr-0 pt-0 pb-0">
                <v-file-input
                  @change="onInput('multiple', $event)"
                  accept="image/*"
                  multiple label="Картинки товарів"
                ></v-file-input>
                <v-img
                  max-height="200px"
                  :contain="true"
                  v-if="images.length > 0"
                  v-for="(image, index) in images"
                  :src="image"
                ></v-img>
                {{images}}
              </v-col>
            </v-row>
          </v-container>
          <small>*обов'язкові поля для заповнення</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('input', false)">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
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
      mainImage: '',
      images: []
    }),
    methods: {
      onInput(type, val) {
        if(type === 'single' && val.length) {
          this.mainImage = window.URL.createObjectURL(val);
        } else if(type === 'single' && !val.length) {
          this.mainImage = ''
        }

        if(type === 'multiple' && val.length) {
          val.forEach((file) => {
            this.images.push(window.URL.createObjectURL(file));
          });
        } else if(type === 'multiple' && !val.length) {
          this.images = [];
        }
      }
    }
  }
</script>

<style scoped>

</style>
