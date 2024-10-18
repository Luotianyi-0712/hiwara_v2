<template>
  <StackLayout class="loading-container">
    <Image :src="src" width="360px" height="240px" />
    <Label :text="loadingText" textAlignment="center" />"/>
  </StackLayout>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "nativescript-vue";
const src = ref<string>('~/assets/img/loading-huawu/1.png');
let i = 1;
let animation: any;
let loadingText = ref('数据加载中.');
let loadingTextAnime: any;
onMounted(() => {
  animation = setInterval(() => {
    src.value = "~/assets/img/loading-huawu/" + i + ".png";
    if (i < 33) {
      i++
    } else {
      i = 1
    }
  }, 75);
  loadingTextAnime = setInterval(() => {
    if (loadingText.value.length < 11) {
      loadingText.value = loadingText.value + '.'
    } else {
      loadingText.value = '数据加载中.'
    }
  }, 250);
})
onUnmounted(() => {
  clearInterval(animation);
  clearInterval(loadingTextAnime);
})
</script>
<style lang="scss" scoped>
.loading-container {
  width: 100%;
  vertical-align: center;
}

Label {
  color: #00796B;
  font-size: 16px;
  font-family: "Alimama FangYuanTi VF Thin", "AlimamaFangYuanTiVF-Thin-2";
  font-weight: 400;
}
</style>