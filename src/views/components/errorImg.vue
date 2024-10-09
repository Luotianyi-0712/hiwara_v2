<template>
  <StackLayout class="loading-container">
    <Image :src="src"  width="300px"/>
  </StackLayout>
</template>
<script lang="ts" setup>
import { ref } from "nativescript-vue";
const src = ref<string>();
src.value = "~/assets/img/error-huawu/" + (Math.floor(Math.random() * 8) + 1) + ".png";
</script>
<style lang="scss" scoped>
.loading-container {
  width: 100%;
  vertical-align: center;
}
</style>