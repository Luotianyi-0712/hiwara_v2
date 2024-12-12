<template>
  <GridLayout rows="*">
    <videoList row="0" :data="listData" @loadMoreItems="nextPage"
      :class="{ 'visible': onloaded && !loadError, 'hidden': !onloaded || loadError }" />
    <!-- <ListView :items="listData" @loadMoreItems="nextPage">
      <template #default="{ item, index }">
        <StackLayout>
          <Label :text="index" />
          <Label :text="item.id" />
          <Label :text="item.title" />
          <Label :text="item.up" />
          <Label :text="item.loss" />
        </StackLayout>
      </template>
</ListView> -->
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
const listData = ref<VideoItem[]>([])
const onloaded = ref(false)
const loadError = ref(false)
let page = 0
let loading = false
getListData().then(res => {
  if (res) {
    listData.value = res
  }
}).catch(err => {
  loadError.value = true
}).finally(() => {
  onloaded.value = true
})
function getListData(): Promise<VideoItem[] | null> {
  return new Promise((resolve, reject) => {
    if (!loading) {
      loading = true
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
        loading = false
      })
    } else {
      resolve(null)
    }
  })
}
function nextPage() {
  getListData().then(res => {
    if (res) {
      listData.value = listData.value.concat(res)
    }
  })
}
function retry() {
  page = 0
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
<style scoped lang="scss"></style>