<template>
  <v-card
    class="pa-6"
    outlined
    light
  >
    <v-text-field
      label="Назва товару"
      :value="product.name"
    />
    <v-select
      :items="category"
      :value="selectedCategory"
      label="Категорія"
    ></v-select>
    <v-text-field
      label="Ціна"
      type="number"
      :value="product.price"
      :rules="[v => !!v || 'Веедіть ціну']"
      required
    ></v-text-field>
    <span class="label">Опис товару</span>
    <ckeditor :editor="editor" @input="onEditorUpdate"></ckeditor>
  </v-card>
</template>

<script>
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

  const categoriesEng = {
    'woman': 'жіноче',
    'man': 'чоловіче',
    'baby-soap': 'дитяче',
    'bouquets': 'букети',
    'kits': 'набори',
    'natural': 'натуральне'
  };

  export default {
    name: "InfoEditor",
    props: ['product'],
    data: () => ({
      category: ['жіноче', 'чоловіче', 'дитяче', 'букети', 'набори', 'натуральне'],
      editor: ClassicEditor
    }),
    methods: {
      onEditorUpdate(val) {
        console.log(val);
      }
    },
    computed: {
      selectedCategory() {
        return categoriesEng[this.product.category]
      }
    }
  }
</script>

<style scoped>

</style>
