<template>
  <div>
    <h4>getImageUrl {{getImageUrl()}}</h4>
    <h4>Images {{images}}</h4>
    <h4>Value {{value}}</h4>
    <v-file-input
      accept="image/*"
      :multiple="!isMultiple"
      :label="single ? 'Картинка товару' : 'Картинки товарів'"
      @change="onFileSelect"
    ></v-file-input>
    <div
      v-if="!single"
    >
      <h1>!Single</h1>
      <v-icon
        color="grey lighten-1"
        x-small
        @click="onImageRemove"
      >
        mdi-close
      </v-icon>
      <v-img
        v-for="(image, index) in images"
        :key="index"
        max-height="200px"
        :contain="true"
        :src="getImageUrl(image)"
      ></v-img>
    </div>
    <div
      v-else
    >
      <h5>Single</h5>
      <h5>{{getImageUrl()}}</h5>
      <v-icon
        color="grey lighten-1"
        x-small
        @click="onImageRemove"
      >
        mdi-close
      </v-icon>
      <v-img
        max-height="200px"
        :contain="true"
        :src="getImageUrl()"
      ></v-img>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ImageUpload",
    props: ['single', 'value'],
    data: () => ({
      src: ''
    }),
    methods: {
      onImageRemove () {
        this.$emit('remove', this.index)
      },
      getImageUrl () {
        if(this.value && this.value.url) {
          return `http://localhost:5050/${this.value.url}`;
        } else if(this.value && this.value.length > 0) {
          return window.URL.createObjectURL(this.value[0]);
        }
      },
      onFileSelect(val) {
        if(this.single) {
          this.$emit('data', ['thumb', val[0]]);
        }
      }
    },
    computed: {
      isMultiple() {
        return !!this.single;
      },
      images: {
        get: function () {
          if(this.value) {
            return this.value
          }
        },
        set: function (val) {
          return val
        }
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
