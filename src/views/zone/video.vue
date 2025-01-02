<template>
  <GridLayout rows="*">
    <videoList row="0" :data="listData" :loading="isLoading" @loadMoreItems="nextPage"
      :class="{ 'visible': onloaded && !loadError, 'hidden': !onloaded || loadError }" />
    <loadingAnimation row="0" v-show="!onloaded" :class="{ 'visible': !onloaded, 'hidden': onloaded }" />
    <errorImg text="数据加载失败，请点击重试" @tap="retry" v-show="loadError"
      :class="{ 'visible': loadError, 'hidden': !loadError }" />
  </GridLayout>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'nativescript-vue'
import videoList from '../lists/videoList.vue'
import loadingAnimation from '../components/loadingAnimation.vue'
import errorImg from '../components/errorImg.vue'
import { getUserZoneVideoList } from '../../core/api'
const props = defineProps<{
  uid: string
}>();
interface Item {
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
const listData = ref<Item[]>([])
const onloaded = ref(false)
const loadError = ref(false)
const isLoading = ref(false)
let page = 0
let isEnd = false
getListData().then(res => {
  if (res) {
    listData.value = res
  }
}).catch(err => {
  loadError.value = true
}).finally(() => {
  onloaded.value = true
})
function getListData(): Promise<Item[] | null> {
  return new Promise((resolve, reject) => {
    if (!isLoading.value) {
      isLoading.value = true
      getUserZoneVideoList(props.uid, page, 'date').then(res => {
        if (res.length > 0) {
          page++
          resolve(res)
        } else {
          resolve(null)
        }
      }).catch(err => {
        reject()
      }).finally(() => {
        isLoading.value = false
      })
    } else {
      resolve(null)
    }
  })
}
function nextPage() {
  if (!isEnd) {
    getListData().then(res => {
      if (res) {
        if (res.length > 0) {
          listData.value = listData.value.concat(res)
        } else {
          isEnd = true
        }
      }
    })
  }
}
function retry() {
  page = 0
  isEnd = false
  listData.value = []
  onloaded.value = false
  loadError.value = false
  getListData().then(res => {
    if (res) {
      listData.value = res
    }
  }).catch(err => {
    loadError.value = true
  }).finally(() => {
    onloaded.value = true
  })
}
</script>
<style scoped lang="scss">
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