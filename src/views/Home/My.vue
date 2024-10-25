<template>
  <StackLayout>
    <Label :text="title" />
    
  </StackLayout>
</template>
<script setup lang="ts">
import { ref } from 'nativescript-vue'
const title = ref('')

declare const com: any
const MainActivity = new com.example.MainActivity

title.value = MainActivity.getString()
</script>
<style lang="scss" scoped>

</style>