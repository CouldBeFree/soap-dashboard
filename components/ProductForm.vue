<template>
  <v-row justify="center">
    <v-dialog
      :value="value"
      max-width="600px"
      @click:outside="$emit('input', false)"
    >
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
                  @change="$emit('data', ['price', $event])"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" class="ma-0 pr-1 pl-0 pt-0 pb-0">
                <v-file-input
                  accept="image/*"
                  single
                  label="Картинки товарів"
                  v-model="image"
                ></v-file-input>
                <image-handler
                  v-if="image"
                  :image="image"
                  :single="true"
                ></image-handler>
              </v-col>
              <v-col cols="12" sm="12" class="ma-0 pl-1 pr-0 pt-0 pb-0">
                <v-file-input
                  accept="image/*"
                  multiple
                  label="Картинки товарів"
                  v-model="images"
                ></v-file-input>
              </v-col>
              <v-col
                v-if="images.length > 0"
                cols="3"
                xs="3"
                v-for="(image, index) in images"
              >
                <image-handler
                  :image="image"
                  :index="index"
                  :multiple="true"
                  @remove="onImageRemove"
                ></image-handler>
              </v-col>
            </v-row>
          </v-container>
          <small>*обов'язкові поля для заповнення</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$emit('input', false)"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="$emit('save')"
            :loading="loading"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import ImageHandler from "./ImageHandler";

  export default {
    name: "ProductForm",
    props: ['value', 'loading'],
    components: {
      ImageHandler
    },
    data: () => ({
      dialog: false,
      category: ['woman', 'man', 'baby-soap', 'bouquets', 'kits', 'natural'],
      image: null,
      images: []
    }),
    methods: {
      onImageRemove(index) {
        this.images.splice(index, 1);
      }
    },
    watch: {
      images: function (val) {
        this.$emit('data', ['images', val])
      },
      image: function (val) {
        this.$emit('data', ['thumb', val])
      }
    }
  }
</script>

<style scoped>

</style>
