<template>
  <GridLayout columns="auto,*,auto" rows="50px,auto,30px">
    <GridLayout row="0" col="0" colSpan="3" rows="30px,20px" columns="50px,*">
      <StackLayout col="0" row="0" rowSpan="2">
        <Img src="https://www.iwara.tv/images/default-avatar.jpg" failureImageUri="~/assets/img/not-img.jpg"
          placeholderImageUri="~/assets/img/placeholder.png" stretch="aspectFill" class="avatar" fadeDuration="300" />
      </StackLayout>
      <Label col="1" row="0" class="userName" :text="userName" />
      <Label col="1" row="1" class="createdAt" :text="formatIsoToChineseDate(createdAt)" />
    </GridLayout>
    <StackLayout row="1" col="0" colSpan="3" class="body">
      <Label class="comment" :text="body" textWrap="true" />
    </StackLayout>
    <StackLayout row="2" col="0" orientation="horizontal" class="options">
      <Label text="&#x1f5e9; " class="font-awesome-regular" />
      <Label text="回复" />
    </StackLayout>
    <StackLayout row="2" col="2" orientation="horizontal" class="options" horizontalAlignment="right"
      v-if="numReplies > 0" @tap="$emit('detail', id, index)">
      <Label text="&#xf103; " class="font-awesome-solid" />
      <Label :text="'查看' + numReplies + '条回复'" />
    </StackLayout>
  </GridLayout>
</template>
<script setup lang="ts">
import { defineProps } from 'nativescript-vue'
const props = defineProps<{
  id: string
  index: number
  userName: string
  createdAt: string
  body: string
  numReplies: number
}>()
function formatIsoToChineseDate(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() 返回的月份是从0开始的
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // 将数字转换为两位字符串，例如 9 变为 '09'
  const pad = (num: number) => num.toString().padStart(2, '0');
  // 拼接成 '2024年9月11日 8:47' 格式的字符串
  return `${year}年${pad(month)}月${pad(day)}日 ${pad(hours)}:${pad(minutes)}`;
}
</script>
<style scoped lang="scss">
.avatar {
  border-radius: 50%;
  overflow: hidden;
  margin: 20px;
}

.userName {
  color: #262626;
}

.createdAt {
  font-size: 12px;
}

.body {
  padding: 20px 40px;
  color: #262626;
}

.options {
  padding: 0 40px;
  font-size: 12px;
}
</style>