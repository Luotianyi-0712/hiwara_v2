<template>
  <StackLayout class="item">
    <GridLayout class="item-content" rows="60px,60px,50px,20px" columns="*,*">
      <Img @tap="onTouch()" row="0" col="0" rowSpan="2" colSpan="2" :src="img"
        failureImageUri="~/assets/img/not-img.jpg" placeholderImageUri="~/assets/img/placeholder.png"
        stretch="aspectFill" class="img" fadeDuration="300" />
      <StackLayout row="0" col="1" class="r18" style="horizontal-align: right;">
        <Label v-show="ecchi" text="R-18" class="label" />
      </StackLayout>
      <StackLayout orientation="horizontal" row="1" col="0" class="tip">
        <Label verticalAlignment="bottom" text="&#xf144; " class="text font-awesome-regular" />
        <Label verticalAlignment="bottom" :text="numViews" class="text" />
        <Label verticalAlignment="bottom" text=" &#x1f9e1; " class="text font-awesome-regular" />
        <Label verticalAlignment="bottom" :text="numLikes" class="text" />
      </StackLayout>
      <StackLayout orientation="horizontal" row="1" col="1" class="tip" style="horizontal-align: right;">
        <Label verticalAlignment="bottom" :text="numImages" class="text" />
      </StackLayout>
      <Label @tap="onTouch()" row="2" col="0" colSpan="2" :text="title" class="title" textWrap="true"
        android:maxLines="2" ios:lineBreakMode="tailTruncation" ios:.numberOfLines="2" />
      <StackLayout orientation="horizontal" row="3" col="0" class="info">
        <Label text="&#x1f464; " class="font-awesome-regular" />
        <Label :text="up" />
      </StackLayout>
      <StackLayout orientation="horizontal" row="3" col="1" class="info" style="horizontal-align: right;">
        <Label text="&#x1f553; " class="font-awesome-regular" />
        <Label :text="createdAt" />
      </StackLayout>
    </GridLayout>
  </StackLayout>
</template>

<script lang="ts" setup>
import { defineProps } from 'nativescript-vue';
const props = defineProps<{
  id: string;
  title: string;
  img: string;
  up: string;
  numImages:number,
  createdAt: string;
  numViews: number;
  numLikes: number;
  ecchi: boolean;
}>();
function onTouch() {
  console.log()
}
</script>

<style scoped lang="scss">
.item {
  padding: 6px;
}

.item-content {
  box-shadow: 1px 1px 4px #00000080;
  border-radius: 10px;
  overflow: hidden;
  // background-color: aqua;
}

.tip {
  font-size: 10px;
  color: #fff;
  padding: 20px;

  .text {
    text-shadow: 1px 1px 1px #000000;
  }
}

.r18 {
  padding: 10px;

  .label {
    background-color: #F44336a2;
    padding: 4px 8px;
    font-weight: bold;
    font-size: 10px;
    color: #fff;
  }
}

.img {
  width: 100%;
  height: 100%;
  border-radius: 10px 10px 0 0;
}

.title {
  padding: 0 20px;
  font-size: 14px;
  color: #262626;
}

.info {
  padding: 10px 20px;
  font-size: 10px;
}
</style>