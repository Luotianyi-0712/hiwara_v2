<template>
  <ListView :items="replys" @loadMoreItems="nextPage">
    <template #default="{ item, index }">
      <commentItem :id="item.id" :index="index" :userName="item.userName" :body="item.body" :createdAt="item.createdAt"
        :numReplies="item.numReplies" @detail="" :reply="false" />
    </template>
  </ListView>
</template>
<script setup lang="ts">
import commentItem from './commentItem.vue';
import { ref, defineProps, watch } from 'nativescript-vue'
import { getVideoComments } from '../../core/api'
const props = defineProps<{
  id: string,
  detailId: string
}>()
interface Comments {
  id: string,
  body: string,
  createdAt: string,
  updatedAt: string,
  userName: string,
  uid: string,
  avatar: string,
  numReplies: number
}
const replys = ref<Comments[]>([])
let isLoading = false
let page = 0
let isEnd = false
watch(() => props.detailId, val => {
  page = 0
  isEnd = false
  replys.value = []
  if (val != '') {
    isLoading = true
    replys.value = []
    getVideoComments(props.id, page, val).then(res => {
      replys.value = res
      isLoading = false
      page++
    })
  }
})
function nextPage() {
  if (!isLoading) {
    isLoading = true
    getVideoComments(props.id, page, props.detailId).then(res => {
      if (res.length > 0) {
        replys.value = replys.value.concat(res)
        isLoading = false
        page++
      } else {
        isEnd = true
      }
    })
  }
}
function flush() {
  page = 0
  isEnd = false
  isLoading = true
  replys.value = []
  getVideoComments(props.id, page, props.detailId).then(res => {
    replys.value = res
    isLoading = false
    page++
  })
}
</script>
<style scoped lang="scss"></style>