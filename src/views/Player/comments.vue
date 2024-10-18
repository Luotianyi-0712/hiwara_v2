<template>
  <ListView :items="comments" @loadMoreItems="nextPage">
    <template #default="{ item, index }">
      <commentItem :id="item.id" :index="index" :userName="item.userName" :body="item.body" :createdAt="item.createdAt"
        :numReplies="item.numReplies" @detail="" />
    </template>
  </ListView>
</template>
<script setup lang="ts">
import commentItem from './commentItem.vue';
import { ref, defineProps } from 'nativescript-vue'
import { getVideoComments } from '../../core/api'
const props = defineProps<{
  id: string
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
const comments = ref<Comments[]>([])
let isLoading = false
let page = 0
getVideoComments(props.id, page).then(res => {
  comments.value = res
  page++
})
function nextPage() {
  if (!isLoading) {
    isLoading = true
    getVideoComments(props.id, page).then(res => {
      comments.value = comments.value.concat(res)
      isLoading = false
      page++
    })
  }
}
function flush() {
  page = 0
  isLoading = true
  comments.value = []
  getVideoComments(props.id, page).then(res => {
    comments.value = res
    isLoading = false
    page++
  })
}
</script>
<style scoped lang="scss"></style>