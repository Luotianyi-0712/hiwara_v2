<template>
  <StackLayout class="loading-container">
    <Image ref="ImageRef" src="~/assets/img/loading-huawu/1.png" width="360px" height="240px" />
  </StackLayout>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "nativescript-vue";
const ImageRef = ref();
var i = 1;
var animation: any;
onMounted(() => {
  animation = setInterval(() => {
    ImageRef.value.nativeView.src = "~/assets/img/loading-huawu/" + i + ".png";
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