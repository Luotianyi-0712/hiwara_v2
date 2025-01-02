<template>
  <Frame>
    <home />
  </Frame>
</template>
<script lang="ts" setup>
import home from "./views/home.vue"
import { watch } from 'nativescript-vue'
import { useMainStore } from './core/store'
const mainStore = useMainStore()
watch(() => mainStore.dark, (val) => {
  // console.log(val)
})
</script>
<style lang="scss"></style>
