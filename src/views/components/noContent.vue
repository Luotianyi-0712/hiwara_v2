<template>
  <GridLayout rows="*,auto,*" class="noContent">
    <StackLayout row="1">
      <Img src="~/assets/icon/cactus.png" />
      <Label text="此处没有任何内容" />
    </StackLayout>
  </GridLayout>
</template>
<style scoped lang="scss">
.noContent {
  text-align: center;

  Img {
    width: 160px;
    height: 160px;
  }

  Label {
    padding: 20px 0;
    font-size: 16px;
    font-family: "Alimama FangYuanTi VF Thin", "AlimamaFangYuanTiVF-Thin-2";
    font-weight: 400;
  }
}
</style>