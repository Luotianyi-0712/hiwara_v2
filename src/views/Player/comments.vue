<template>
  <GridLayout rows="*,50px">
    <ListView row="0" :items="comments" @loadMoreItems="nextPage">
      <template #default="{ item, index }">
        <commentItem :id="item.id" :index="index" :userName="item.userName" :body="item.body"
          :createdAt="item.createdAt" :numReplies="item.numReplies" @detail="onOpenDrawer" />
      </template>
    </ListView>
    <GridLayout row="1" columns="*,80px"
      style="box-shadow: 1px 1px 4px #00000040;background-color: #fff;padding: 0 20px;">
      <TextField col="0" hint="添加评论" style="font-size: 16px;" v-model="myComments" />
      <Button col="1" text="发送" height="110px" @tap="addComment" />
    </GridLayout>
  </GridLayout>
  <Drawer ref="drawer" :gestureEnabled="false" @close="closeDrawer">
    <GridLayout columns="*,*" rows="40px,*" ~bottomDrawer height="100%" width="100%" style="background-color: #f2f2f2;">
      <Label row="0" col="0" text="回复详情" style="padding: 0 20px;" />
      <StackLayout row="0" col="1" orientation="horizontal" horizontalAlignment="right" style="padding: 0 20px;">
        <Label text="&#x1f5d9;" class="font-awesome-solid" />
      </StackLayout>
      <commentReplys row="1" col="0" colSpan="2" :id="id" :detailId="detailId" />
    </GridLayout>
  </Drawer>
</template>
<script setup lang="ts">
import commentItem from './commentItem.vue';
import commentReplys from './commentReplys.vue';
import { ref, defineProps } from 'nativescript-vue'
import { getVideoComments, addCommentForVideo } from '../../core/api'
import { Toasty } from "@imagene.me/nativescript-toast"
import { ToastVariant } from '@imagene.me/nativescript-toast/enums/toast-variant';
import { ToastDuration } from '@imagene.me/nativescript-toast/enums/toast-duration';
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
const drawer = ref()
const detailId = ref('')
const myComments = ref('')
let isLoading = false
let page = 0
let isEnd = false
getVideoComments(props.id, page).then(res => {
  comments.value = res
  page++
})
function nextPage() {
  if (!isLoading && !isEnd) {
    isLoading = true
    getVideoComments(props.id, page).then(res => {
      if (res.length === 0) {
        isEnd = true
      } else {
        comments.value = comments.value.concat(res)
        isLoading = false
        page++
      }
    })
  }
}
function flush() {
  page = 0
  isEnd = false
  isLoading = true
  comments.value = []
  getVideoComments(props.id, page).then(res => {
    comments.value = res
    isLoading = false
    page++
  })
}
function onOpenDrawer(id: string) {
  detailId.value = id
  drawer.value.nativeView.open('bottom')
}
function closeDrawer() {
  detailId.value = ''
}
function addComment() {
  console.log(myComments.value)
  if (myComments.value.length > 0) {
    addCommentForVideo(props.id, myComments.value).then(() => {
      const toast = new Toasty({
        text: '评论发送成功！',
        duration: ToastDuration.Short,
        variant: ToastVariant.Success
      })
      toast.show()
      flush()
    }).catch(() => {
      const toast = new Toasty({
        text: '评论发送失败了喵~',
        duration: ToastDuration.Short,
        variant: ToastVariant.Error
      })
      toast.show()
    })
  } else {
    const toast = new Toasty({
      text: '评论不能为空喵~',
      duration: ToastDuration.Short,
      variant: ToastVariant.Error
    })
    toast.show()
  }
}
</script>
<style scoped lang="scss"></style>