<template>
  <GridLayout rows="60px, auto, *">
    <topBar row="0" />
    <GridLayout row="1" rows="35px,3px" columns="*,*" class="tab">
      <Label text="视频" row="0" col="0" @tap="onTabPress(0)" textAlignment="center" />
      <Label text="图片" row="0" col="1" @tap="onTabPress(1)" textAlignment="center" />
      <StackLayout row="1" col="0" class="tab-bar" :class="{ 'hidden': tab != 0, 'visible': tab == 0 }"></StackLayout>
      <StackLayout row="1" col="1" class="tab-bar" :class="{ 'hidden': tab != 1, 'visible': tab == 1 }"></StackLayout>
    </GridLayout>
    <GridLayout row="2" rows="*">
      <Pager row="1" col="0" colSpan="2" :selectedIndex="tab" @selectedIndexChange="onTabChange">
        <PagerItem>
          <GridLayout rows="*">
            <videoList row="0" :data="videoListData" @loadMoreItems="videoNextPage"
              :class="{ 'visible': videoOnload && !videoLoadError, 'hidden': !videoOnload || videoLoadError }" />
            <loadingAnimation row="0" v-show="!videoOnload"
              :class="{ 'visible': !videoOnload, 'hidden': videoOnload }" />
            <errorImg text="数据加载失败，请点击重试" @tap="videoRetry" v-show="videoLoadError"
              :class="{ 'visible': videoLoadError, 'hidden': !videoLoadError }" />
          </GridLayout>
        </PagerItem>
        <PagerItem>
          <GridLayout rows="*">
            <imageList row="0" :data="imageListData" @loadMoreItems="imageNextPage"
              :class="{ 'visible': imageOnload && !imageLoadError, 'hidden': !imageOnload || imageLoadError }" />
            <loadingAnimation row="0" :class="{ 'visible': !imageOnload, 'hidden': imageOnload }" />
            <errorImg text="数据加载失败，请点击重试" @tap="imageRetry"
              :class="{ 'visible': imageLoadError, 'hidden': !imageLoadError }" />
          </GridLayout>
        </PagerItem>
      </Pager>
    </GridLayout>
  </GridLayout>
</template>
<script lang="ts" setup>
import { ref, watch, onBeforeUnmount } from 'nativescript-vue'
import topBar from './topBar.vue'
import videoList from '../lists/videoList.vue'
import imageList from '../lists/imageList.vue'
import loadingAnimation from '../components/loadingAnimation.vue'
import errorImg from '../components/errorImg.vue'
import {
  getSubscribeVideoList,
  getSubscribeImageList
} from '../../core/api'
import { toasty } from '../../core/viewFunction'
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
const videoListData = ref<VideoItem[]>([])
const imageListData = ref<ImageItem[]>([])
const videoOnload = ref(false)
const imageOnload = ref(false)
const videoLoadError = ref(false)
const imageLoadError = ref(false)
const tab = ref(0)
let videoPage = 0;
let imagePage = 0;
let videoLoading = false;
let imageLoading = false;
getVideoList().then((res) => {
  if (res) {
    videoListData.value = res
  }
}).catch(() => {
  videoLoadError.value = true
}).finally(() => {
  videoOnload.value = true
})
watch(tab, (val) => {
  if (val == 0) {
    if (imageListData.value.length == 0) {
      getVideoList().then((res) => {
        if (res) {
          videoListData.value = res;
        }
      }).catch(() => {
        videoLoadError.value = true
      }).finally(() => {
        videoOnload.value = true
      })
    }
  } else {
    if (imageListData.value.length == 0) {
      getImageList().then((res) => {
        if (res) {
          imageListData.value = res;
        }
      }).catch(() => {
        imageLoadError.value = true
      }).finally(() => {
        imageOnload.value = true
      })
    }
  }
})
function videoRetry() {
  videoPage = 0
  videoListData.value = []
  videoOnload.value = false
  videoLoadError.value = false
  getVideoList().then((res) => {
    if (res) {
      videoListData.value = videoListData.value.concat(res)
    }
  }).catch(res => {
    videoLoadError.value = true
  }).finally(() => {
    videoOnload.value = true
  })
}
function imageRetry() {
  imagePage = 0
  imageListData.value = []
  imageOnload.value = false
  imageLoadError.value = false
  getImageList().then((res) => {
    if (res) {
      imageListData.value = imageListData.value.concat(res)
    }
  }).catch(res => {
    imageLoadError.value = true
  }).finally(() => {
    imageOnload.value = true
  })
}
function videoNextPage() {
  getVideoList().then((res) => {
    if (res) {
      videoListData.value = videoListData.value.concat(res)
    }
  })
}
function imageNextPage() {
  getImageList().then((res) => {
    if (res) {
      imageListData.value = imageListData.value.concat(res)
    }
  })
}
function getVideoList(): Promise<VideoItem[] | null> {
  return new Promise((resolve, reject) => {
    if (!videoLoading) {
      videoLoading = true
      getSubscribeVideoList(videoPage).then(res => {
        videoPage++
        resolve(res)
      }).catch(() => {
        reject()
        toasty('数据加载失败了喵~', 'Error')
      }).finally(() => {
        videoLoading = false
      })
    } else {
      resolve(null)
    }
  })
}
function getImageList(): Promise<ImageItem[] | null> {
  return new Promise((resolve, reject) => {
    if (!imageLoading) {
      imageLoading = true;
      getSubscribeImageList(imagePage).then(res => {
        imagePage++
        resolve(res)
      }).catch(() => {
        reject()
        toasty('数据加载失败了喵~', 'Error')
      }).finally(() => {
        imageLoading = false
      })
    } else {
      resolve(null)
    }
  })
}
function onTabPress(target: number) {
  if (tab.value != target) {
    tab.value = target;
  }
}
function onTabChange(args: any) {
  tab.value = args.value
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