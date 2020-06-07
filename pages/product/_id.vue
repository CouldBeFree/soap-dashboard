<template>
    <div>
      <v-card>

      </v-card>
      {{details}}
      <h1>{{details.name}}</h1>
      <h4>{{details.category}}</h4>
      <h4>{{details.price}} uah</h4>
      <v-img :src="url"></v-img>
    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: "product",
    async mounted() {
      await this.getProduct(this.$route.params.id);
    },
    methods: {
      ...mapActions('products', ['getProduct'])
    },
    computed: {
      ...mapState('products', {
        details: state => state.details
      }),
      url() {
        return this.details.thumb && this.details.thumb.url ? `http://localhost:5050/${this.details.thumb.url}` : ''
      }
    }
  }
</script>

<style scoped>

</style>
