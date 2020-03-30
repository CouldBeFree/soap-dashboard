<template>
  <div>
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
</template>

<script>
  export default {
    name: "ImageUpload",
    props: ['image', 'index', 'value'],
    data: () => ({
      src: '',
    }),
    methods: {
      onImageRemove () {
        this.$emit('remove', this.index)
      },
      getImageUrl () {
        if(this.image && !this.image.url) {
          return this.src = window.URL.createObjectURL(this.image);
        } else {
          return this.src = `http://localhost:5050/${this.image.url}`
        }
      }
    }
  }
</script>

<style scoped>

</style>
