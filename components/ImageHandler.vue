<template>
  <div>
      <v-icon
        v-if="index > -1"
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
    props: ['image', 'index'],
    data: () => ({
      src: '',
    }),
    methods: {
      onImageRemove () {
        this.$emit('remove', this.index)
      },
      getImageUrl () {
        if(this.image) {
          return this.src = window.URL.createObjectURL(this.image);
        }
      }
    }
  }
</script>

<style scoped>

</style>
