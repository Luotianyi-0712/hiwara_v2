<template>
  <StackLayout class="loading-container">
    <Image :src="src" width="300px" />
    <Label text="数据加载失败，请点击尝试" textAlignment="center" />"/>
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

Label {
  color: #00796B;
  font-size: 16px;
  padding: 20px;
  font-family: "Alimama FangYuanTi VF Thin", "AlimamaFangYuanTiVF-Thin-2";
  font-weight: 400;
}
</style>