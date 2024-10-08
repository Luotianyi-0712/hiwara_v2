<template>
  <GridLayout rows="auto, *">
    <GridLayout row="0" rows="35px,3px" columns="*,*">
      <Label text="视频" row="0" col="0" @tap="onTabPress(0)" textAlignment="center" />
      <Label text="图片" row="0" col="1" @tap="onTabPress(1)" textAlignment="center" />
      <StackLayout row="1" col="0" class="tab-bar" :class="{ 'hidden': tab == 1, 'visible': tab != 1 }"></StackLayout>
      <StackLayout row="1" col="1" class="tab-bar" :class="{ 'hidden': tab == 0, 'visible': tab != 0 }"></StackLayout>
    </GridLayout>
    <ContentView row="1" v-if="onLoading">
      <loadingAnimation />
    </ContentView>
    <ContentView row="1" v-else>
      <videoList v-if="tab == 0" :data="videoListData" @loadMoreItems="getVideoList" />
      <imageList v-if="tab == 1" :data="imageListData" @loadMoreItems="getImageList" />
    </ContentView>
  </GridLayout>
</template>
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import videoList from '../Lists/videoList.vue';
import imageList from '../Lists/imageList.vue';
import loadingAnimation from '../components/loadingAnimation.vue';
import {
  getSubscribeVideoList,
  getSubscribeImageList
} from '../../script/api';
interface VideoItem {
  id: string,
  title: string,
  up: string,
  numViews: number,
  numLikes: number,
  duration: string,
  createdAt: string,
  updatedAt: string,
  ecchi: boolean,
  img: string,
  loss: boolean
}
interface ImageItem {
  id: string,
  title: string,
  up: string,
  numImages: number,
  numViews: number,
  numLikes: number,
  createdAt: string,
  updatedAt: string,
  ecchi: boolean,
  img: string
}
const videoListData = ref<VideoItem[]>([]);
const imageListData = ref<ImageItem[]>([]);
const onLoading = ref(true)
const tab = ref(0)
var page = 0;
var isLoading = false;
getVideoList();
function getVideoList() {
  if (!isLoading) {
    isLoading = true;
    getSubscribeVideoList(page).then(res => {
      videoListData.value = videoListData.value.concat(res);
      onLoading.value = false;
      isLoading = false;
      page++;
    })
  }
}
function getImageList() {
  if (!isLoading) {
    isLoading = true;
    getSubscribeImageList(page).then(res => {
      imageListData.value = imageListData.value.concat(res);
      onLoading.value = false;
      isLoading = false;
      page++;
    })
  }
}
function onTabPress(target: number) {
  tab.value = target;
  onLoading.value = true;
  if (target == 0) {
    imageListData.value = [];
    getVideoList();
  } else {
    videoListData.value = [];
    getImageList();
  }
}
</script>
<style lang="scss" scoped>
.tab-bar {
  background-color: #00796B;
  height: 8px;
  border-radius: 50%;
  width: 100px;
}

.hidden {
  animation-name: animeHidden;
  animation-duration: 100ms;
  animation-fill-mode: forwards;
}

.visible {
  animation-name: animeVisible;
  animation-duration: 100ms;
  animation-fill-mode: forwards;
}

@keyframes animeHidden {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes animeVisible {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>