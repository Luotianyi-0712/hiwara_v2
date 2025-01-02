<template>
  <StackLayout class="loading-container">
    <Img :src="src" width="300px" />
    <Label :text="text" textAlignment="center" />"/>
  </StackLayout>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "nativescript-vue";
const src = ref<string>();
const props = defineProps<{
  text: string;
}>();
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