<template>
  <StackLayout class="loading-container">
    <Image :src="src" width="360px" height="240px" />
  </StackLayout>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "nativescript-vue";
const src = ref<string>('~/assets/img/loading-huawu/1.png');
var i = 1;
var animation: any;
onMounted(() => {
  animation = setInterval(() => {
    src.value = "~/assets/img/loading-huawu/" + i + ".png";
    if (i < 33) {
      i++
    } else {
      i = 1
    }
  }, 75);
})
onUnmounted(() => {
  clearInterval(animation);
})
</script>
<style lang="scss" scoped>
.loading-container {
  width: 100%;
  vertical-align: center;
}
</style>