<template>
  <div>
    <v-file-input
      accept="image/*"
      :multiple="!isMultiple"
      :label="single ? 'Картинка товару' : 'Картинки товарів'"
      @change="onFileSelect"
    ></v-file-input>
    <v-row
      v-if="!single"
    >
      <v-col
        v-for="(image, index) in value"
        :key="index"
        cols="3"
        xs="3"
      >
        <v-icon
          color="grey lighten-1"
          x-small
          @click="onImageRemove(index)"
        >
          mdi-close
        </v-icon>
        <v-img
          max-height="200px"
          :contain="true"
          :src="getImageUrl(image)"
        ></v-img>
      </v-col>
    </v-row>
    <div
      v-else
    >
      <v-icon
        color="grey lighten-1"
        x-small
        @click="onImageRemove"
        v-if="value"
      >
        mdi-close
      </v-icon>
      <v-img
        max-height="200px"
        :contain="true"
        v-if="value"
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
    mounted() {
      console.info('value', this.value);
    },
    methods: {
      onImageRemove (index) {
        if(index > -1) {
          const images = [...this.value];
          images.splice(index, 1);
          this.$emit('data', ['images', images]);
        } else {
          this.$emit('data', ['thumb', '']);
        }
      },
      getImageUrl (image) {
        if(this.value && this.value.url) {
          return `http://localhost:5050/${this.value.url}`;
        } else if(this.value && this.value.name) {
          return window.URL.createObjectURL(this.value);
        } else if (this.value && image && image.url) {
          return `http://localhost:5050/${image.url}`;
        } else if (this.value && image && image.name) {
          return window.URL.createObjectURL(image);
        }
      },
      onFileSelect(val) {
        if(this.single && val) {
          this.$emit('data', ['thumb', val[0]]);
        } else if(val && val.length === 0) {
          this.$emit('data', ['images', val]);
        } else if(this.value && this.value.length > 0) {
          const newVal = this.value.concat(val);
          this.$emit('data', ['images', newVal]);
        } else if(this.single !== true) {
          this.$emit('data', ['images', val]);
        }
      }
    },
    computed: {
      isMultiple() {
        return !!this.single;
      }
    }
  }
</script>

<style scoped>

</style>
