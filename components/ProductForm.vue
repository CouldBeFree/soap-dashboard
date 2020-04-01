<template>
  <v-row justify="center">
    <v-dialog
      :value="value"
      max-width="600px"
      @click:outside="onClose"
    >
      <v-card color="accent">
        <v-card-title class="pb-0">
          <slot name="title"></slot>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              ref="form"
            >
              <v-row>
                <v-col cols="12" sm="12" class="ma-0 pa-0">
                  <v-text-field
                    :value="product.name"
                    class="mt-0 pt-0"
                    label="Назва продукту*"
                    :rules="[v => !!v || 'Введіть назву продукту']"
                    required
                    @change="$emit('data', ['name', $event])"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="ma-0 pr-1 pl-0 pt-0 pb-0">
                  <v-select
                    :value="product.category"
                    :items="category"
                    label="Категорія*"
                    :rules="[v => !!v || 'Виберіть категорію']"
                    required
                    @change="$emit('data', ['category', $event])"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" class="ma-0 pl-1 pr-0 pt-0 pb-0">
                  <v-text-field
                    label="Ціна*"
                    type="number"
                    :value="product.price"
                    :rules="[v => !!v || 'Веедіть ціну']"
                    required
                    @change="$emit('data', ['price', $event])"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="ma-0 pa-0">
                  <image-upload
                    :single="true"
                    :value="product.thumb"
                    @data="$emit('data', $event)"
                  ></image-upload>
                </v-col>
                <v-col cols="12" sm="12" class="ma-0 pa-0">
                  <image-upload
                    :single="false"
                    :value="product.images"
                    @data="$emit('data', $event)"
                  ></image-upload>
                </v-col>
                <!--<v-col cols="12" sm="12" class="ma-0 pa-0">
                  <v-file-input
                    accept="image/*"
                    single
                    label="Головна картинка*"
                    :rules="[v => !!v || 'Виберіть картинку']"
                    required
                    v-model="image"
                  ></v-file-input>
                  <image-handler
                    @remove="onImageRemove"
                    v-if="image || product.thumb"
                    :image="image || product.thumb"
                    :single="true"
                  ></image-handler>
                </v-col>
                <v-col cols="12" sm="12" class="ma-0 pa-0">
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
                  v-for="(image, index) in (images.length > 0 ? images : product.images)"
                >
                  <image-handler
                    :image="image"
                    :index="index"
                    :multiple="true"
                    @remove="onImageRemove"
                  ></image-handler>
                </v-col>-->
              </v-row>
            </v-form>
          </v-container>
          <small>*обов'язкові поля для заповнення</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="onClose"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="onSubmit"
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
  import ImageUpload from "./ImageUpload";

  export default {
    name: "ProductForm",
    props: ['value', 'loading', 'product'],
    components: {
      ImageUpload
    },
    data: () => ({
      dialog: false,
      category: ['woman', 'man', 'baby-soap', 'bouquets', 'kits', 'natural'],
      image: null,
      images: []
    }),
    methods: {
      onImageRemove(index) {
        alert(index);
        if (!this.index) {
          this.$emit('data', ['thumb', null])
        } else {
          this.images.splice(index, 1);
        }
      },
      onSubmit() {
        if(this.$refs.form.validate()) {
          this.$emit('save');
          this.$refs.form.reset();
        }
      },
      onClose() {
        this.$refs.form.resetValidation();
        this.$refs.form.reset();
        this.$emit('input', false);
      }
    },
    watch: {
      images: function (val) {
        this.$emit('data', ['images', [...val]])
      },
      image: function (val) {
        this.$emit('data', ['thumb', val])
      }
    }
  }
</script>

<style scoped>

</style>
