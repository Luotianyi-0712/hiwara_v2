<template>
  <Frame>
    <home />
  </Frame>
</template>
<script lang="ts" setup>
import home from "./views/home.vue"
import { useMainStore } from './core/store'
import { isDarkMode } from './core/viewFunction'
const mainStore = useMainStore()
mainStore.changeDarkModeStatus(isDarkMode())
</script>
<style scoped lang="scss"></style>
