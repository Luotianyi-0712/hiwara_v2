<template>
  <StackLayout class="item">
    <GridLayout class="item-content" rows="60px,60px,50px,20px" columns="*,*">
      <Img @tap="onTouch()" row="0" col="0" rowSpan="2" colSpan="2" :src="img"
        failureImageUri="~/assets/img/not-img.jpg" placeholderImageUri="~/assets/img/placeholder.png"
        stretch="aspectFill" class="img" fadeDuration="300" />
      <StackLayout row="0" col="1" class="r18" horizontalAlignment="right">
        <Label v-show="ecchi" text="R-18" class="label" />
      </StackLayout>
      <StackLayout orientation="horizontal" row="1" col="0" class="tip">
        <Label verticalAlignment="bottom" text="&#xf144; " class="text font-awesome-regular" />
        <Label verticalAlignment="bottom" :text="formatNumber(numViews)" class="text" />
        <Label verticalAlignment="bottom" text=" &#x1f9e1; " class="text font-awesome-regular" />
        <Label verticalAlignment="bottom" :text="formatNumber(numLikes)" class="text" />
      </StackLayout>
      <StackLayout orientation="horizontal" row="1" col="1" class="tip" horizontalAlignment="right">
        <Label verticalAlignment="bottom" :text="formatDuration(duration)" class="text" />
      </StackLayout>
      <Label @tap="onTouch()" row="2" col="0" colSpan="2" :text="title" class="title" textWrap="true"
        android:maxLines="2" ios:lineBreakMode="tailTruncation" ios:.numberOfLines="2" />
      <StackLayout orientation="horizontal" row="3" col="0" class="info">
        <Label text="&#x1f464; " class="font-awesome-regular" />
        <Label :text="up" />
      </StackLayout>
      <StackLayout orientation="horizontal" row="3" col="1" class="info" horizontalAlignment="right">
        <Label text="&#x1f553; " class="font-awesome-regular" />
        <Label :text="formatIsoToChineseDate(createdAt)" />
      </StackLayout>
    </GridLayout>
  </StackLayout>
</template>

<script lang="ts" setup>
import { defineProps } from 'nativescript-vue';
import { navigateTo } from "../../core/navigate";
const props = defineProps<{
  id: string;
  title: string;
  img: string;
  up: string;
  createdAt: string;
  duration: number;
  numViews: number;
  numLikes: number;
  ecchi: boolean;
}>();
function onTouch() {
  navigateTo("/player", {
    id: props.id
  })
}
function formatNumber(num: number): string {
  if (num < 10000) {
    return num.toString();
  } else if (num < 100000000) {
    let wan = num / 10000;
    return wan.toFixed(1).replace(/\.0$/, '') + '万';
  } else {
    let yi = num / 100000000;
    return yi.toFixed(1).replace(/\.0$/, '') + '亿';
  }
}
function formatIsoToChineseDate(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `${day}` : day;
  return `${year}-${formattedMonth}-${formattedDay}`;
}
function formatDuration(seconds: number): string {
  if (seconds == 0) {
    return '';
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  let formattedTime = '';
  if (hours > 0) {
    formattedTime += `${hours}:`;
  }
  formattedTime += `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  return formattedTime;
}
</script>

<style scoped lang="scss">
.item {
  padding: 4px 6px;
}

.item-content {
  box-shadow: 1px 1px 4px #00000040;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
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
  padding: 0 20px;
  font-size: 11px;
}
</style>