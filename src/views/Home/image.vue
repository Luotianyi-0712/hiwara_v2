<template>
  <GridLayout rows="auto, *">
    <GridLayout row="0" rows="35px,3px" columns="*,*,*,*,*" class="tab">
      <Label text="最新" row="0" col="0" @tap="onTabPress(0)" textAlignment="center" />
      <Label text="流行" row="0" col="1" @tap="onTabPress(1)" textAlignment="center" />
      <Label text="人气" row="0" col="2" @tap="onTabPress(2)" textAlignment="center" />
      <Label text="观看量" row="0" col="3" @tap="onTabPress(3)" textAlignment="center" />
      <Label text="点赞量" row="0" col="4" @tap="onTabPress(4)" textAlignment="center" />
      <StackLayout row="1" col="0" class="tab-bar" :class="{ 'hidden': tab != 0, 'visible': tab == 0 }"></StackLayout>
      <StackLayout row="1" col="1" class="tab-bar" :class="{ 'hidden': tab != 1, 'visible': tab == 1 }"></StackLayout>
      <StackLayout row="1" col="2" class="tab-bar" :class="{ 'hidden': tab != 2, 'visible': tab == 2 }"></StackLayout>
      <StackLayout row="1" col="3" class="tab-bar" :class="{ 'hidden': tab != 3, 'visible': tab == 3 }"></StackLayout>
      <StackLayout row="1" col="4" class="tab-bar" :class="{ 'hidden': tab != 4, 'visible': tab == 4 }"></StackLayout>
    </GridLayout>
    <ContentView row="1" v-if="onLoading">
      <loadingAnimation />
    </ContentView>
    <ContentView row="1" v-if="onError" @tap="retry">
      <ErrorImg />
    </ContentView>
    <ContentView row="1" v-if="!onError && !onLoading">
      <imageList :data="listData" @loadMoreItems="nextPage" />
    </ContentView>
  </GridLayout>
</template>

<script lang="ts" setup>
import loadingAnimation from '../Components/loadingAnimation.vue';
import ErrorImg from '../Components/errorImg.vue';
import imageList from '../Lists/imageList.vue';
import { ref } from 'nativescript-vue';
import { getImageList } from '~/core/api';
import { Toasty } from "@imagene.me/nativescript-toast"
import { ToastVariant } from '@imagene.me/nativescript-toast/enums/toast-variant';
import { ToastDuration } from '@imagene.me/nativescript-toast/enums/toast-duration';
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
const listData = ref<ImageItem[]>([])
const tab = ref(0)
const onLoading = ref(true)
const onError = ref(false)
let page = 0;
let isLoading = false;
getList('date').then((res) => {
  listData.value = res;
}).catch(() => {
  onError.value = true
}).finally(() => {
  onLoading.value = false
})
function retry() {
  onError.value = false;
  onLoading.value = true;
  let sort: string = 'date'
  switch (tab.value) {
    case 0: sort = 'date'; break;
    case 1: sort = 'trending'; break;
    case 2: sort = 'popularity'; break;
    case 3: sort = 'views'; break;
    case 4: sort = 'likes'; break;
    default: sort = 'date'; break;
  }
  getList(sort).then((res) => {
    listData.value = res;
  }).catch(() => {
    onError.value = true
  }).finally(() => {
    onLoading.value = false
  })
}
function nextPage() {
  if (!isLoading) {
    isLoading = true;
    let sort: string = 'date'
    switch (tab.value) {
      case 0:
        sort = 'date'
        break;
      case 1:
        sort = 'trending'
        break;
      case 2:
        sort = 'popularity'
        break;
      case 3:
        sort = 'views'
        break;
      case 4:
        sort = 'likes'
        break;
    }
    getList(sort).then((res) => {
      listData.value = listData.value.concat(res);
      isLoading = false;
    })
  }
}
function getList(sort: string): Promise<ImageItem[]> {
  return new Promise((resolve, reject) => {
    getImageList(page, sort).then(res => {
      page++;
      resolve(res);
    }).catch(err => {
      reject()
      const toast = new Toasty({
        text: '数据加载失败了喵~',
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
    listData.value = [];
    let sort: string = 'date'
    switch (target) {
      case 0:
        sort = 'date'
        break;
      case 1:
        sort = 'trending'
        break;
      case 2:
        sort = 'popularity'
        break;
      case 3:
        sort = 'views'
        break;
      case 4:
        sort = 'likes'
        break;
    }
    getList(sort).then((res) => {
      listData.value = res;
    }).catch(() => {
      onError.value = true
    }).finally(() => {
      onLoading.value = false
    })
  }
}
</script>

<style lang="scss" scoped>
.tab {
  // background-color: #fff;
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