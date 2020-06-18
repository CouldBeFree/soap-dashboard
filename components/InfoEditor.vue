<template>
  <v-card
    class="pa-6"
    outlined
    light
  >
    <v-text-field
      label="Назва товару"
      :value="product.name"
      @change="$emit('input',['name', $event])"
    />
    <v-select
      :items="category"
      :value="product.category"
      @change="$emit('input',['category', $event])"
      label="Категорія"
    ></v-select>
    <v-text-field
      label="Ціна"
      type="number"
      :value="product.price"
      :rules="[v => !!v || 'Веедіть ціну']"
      @change="$emit('input',['price', $event])"
      required
    ></v-text-field>
    <span class="label">Опис товару</span>
    <ckeditor :editor="editor" @input="onEditorUpdate"></ckeditor>
  </v-card>
</template>

<script>
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
    }
  }
</script>

<style scoped>

</style>
