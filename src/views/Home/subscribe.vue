<template>
  <GridLayout rows="auto, *">
    <GridLayout row="0" rows="35px,3px" columns="*,*" class="tab">
      <Label text="视频" row="0" col="0" @tap="onTabPress(0)" textAlignment="center" />
      <Label text="图片" row="0" col="1" @tap="onTabPress(1)" textAlignment="center" />
      <StackLayout row="1" col="0" class="tab-bar" :class="{ 'hidden': tab != 0, 'visible': tab == 0 }"></StackLayout>
      <StackLayout row="1" col="1" class="tab-bar" :class="{ 'hidden': tab != 1, 'visible': tab == 1 }"></StackLayout>
    </GridLayout>
    <ContentView row="1" v-if="onLoading">
      <loadingAnimation />
    </ContentView>
    <ContentView row="1" v-if="onError">
      <ErrorImg />
    </ContentView>
    <ContentView row="1" v-else>
      <videoList v-if="tab == 0" :data="videoListData" @loadMoreItems="nextPage" />
      <imageList v-if="tab == 1" :data="imageListData" @loadMoreItems="nextPage" />
    </ContentView>
  </GridLayout>
</template>
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import videoList from '../Lists/videoList.vue';
import imageList from '../Lists/imageList.vue';
import loadingAnimation from '../Components/loadingAnimation.vue';
import ErrorImg from '../Components/errorImg.vue';
import {
  getSubscribeVideoList,
  getSubscribeImageList
} from '../../core/api';
import { Toasty } from "@imagene.me/nativescript-toast"
import { ToastVariant } from '@imagene.me/nativescript-toast/enums/toast-variant';
import { ToastDuration } from '@imagene.me/nativescript-toast/enums/toast-duration';
interface VideoItem {
  id: string,
  title: string,
  up: string,
  numViews: number,
  numLikes: number,
  duration: number,
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
const onError = ref(false)
const tab = ref(0)
var page = 0;
var isLoading = false;
getVideoList().then((res) => {
  videoListData.value = res;
}).catch(() => {
  onError.value = true;
}).finally(() => {
  onLoading.value = false;
})
function nextPage() {
  if (!isLoading) {
    isLoading = true;
    if (tab.value == 0) {
      getVideoList().then((res) => {
        videoListData.value = videoListData.value.concat(res);
        isLoading = false;
      })
    } else {
      getImageList().then((res) => {
        imageListData.value = imageListData.value.concat(res);
        isLoading = false;
      })
    }
  }
}
function getVideoList(): Promise<VideoItem[]> {
  return new Promise((resolve, reject) => {
    getSubscribeVideoList(page).then(res => {
      page++;
      resolve(res);
    }).catch(err => {
      reject()
      const toast = new Toasty({
        text: '数据获取失败',
        duration: ToastDuration.Short,
        variant: ToastVariant.Error
      })
      toast.show()
    })
  });
}
function getImageList(): Promise<ImageItem[]> {
  return new Promise((resolve, reject) => {
    getSubscribeImageList(page).then(res => {
      page++;
      resolve(res);
    }).catch(err => {
      reject()
      const toast = new Toasty({
        text: '数据获取失败',
        duration: ToastDuration.Short,
        variant: ToastVariant.Error
      })
      toast.show()
    })
  })
}
function onTabPress(target: number) {
  if (tab.value != target) {
    onLoading.value = true;
    tab.value = target;
    page = 0;
    if (target == 0) {
      imageListData.value = [];
      getVideoList().then((res) => {
        videoListData.value = res;
      }).catch(() => {
        onError.value = true;
      }).finally(() => {
        onLoading.value = false
      })
    } else {
      videoListData.value = [];
      getImageList().then((res) => {
        imageListData.value = res;
      }).catch(() => {
        onError.value = true;
      }).finally(() => {
        onLoading.value = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.tab {
  background-color: #fff;
}

.tab-bar {
  background-color: #00796B;
  height: 8px;
  border-radius: 50%;
  width: 100px;
}

.hidden {
  opacity: 0;
}

.visible {
  animation-name: animeVisible;
  animation-duration: 100ms;
  animation-fill-mode: forwards;
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