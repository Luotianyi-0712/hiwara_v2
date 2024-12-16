<template>
  <Page>
    <ActionBar @tap="addCommentsBlur">
      <GridLayout columns="32px,auto,*">
        <Label col="0" text="&#xf104;" class="font-awesome-solid" @tap="navigateBack" />
        <Label col="1" text="回复详情" />
      </GridLayout>
    </ActionBar>
    <GridLayout rows="*,50px" @tap="addCommentsBlur">
      <ListView row="0" :items="comments" @loadMoreItems="nextPage">
        <template #default="{ item, index }">
          <commentItem :id="item.id" :index="index" :userName="item.userName" :body="item.body"
            :createdAt="item.createdAt" :numReplies="item.numReplies" @detail="" :reply="false"
            @tap="addCommentsBlur" />
        </template>
      </ListView>
      <Label row="0" textAlignment="center" text="还没有评论喵~" v-if="comments.length === 0" />
      <GridLayout row="1" columns="*,80px"
        style="box-shadow: 1px 1px 4px #00000040;background-color: #fff;padding: 0 20px;">
        <TextField col="0" hint="添加评论" style="font-size: 16px;" v-model="myComments" ref="addCommentsRef" />
        <Button col="1" text="发送" height="110px" @tap="addComment" />
      </GridLayout>
    </GridLayout>
  </Page>
</template>
<script setup lang="ts">
import commentItem from './commentItem.vue';
import { ref, defineProps } from 'nativescript-vue'
import { getImageComments, addCommentForImage } from '../../core/api'
import { toasty } from '../../core/viewFunction'
import { navigateBack } from '../../core/navigate'
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
const comments = ref<Comments[]>([])
const myComments = ref('')
const addCommentsRef = ref()
let isLoading = false
let page = 0
let isEnd = false
getImageComments(props.id, page, props.detailId).then(res => {
  comments.value = res
  page++
})
function nextPage() {
  if (!isLoading && !isEnd) {
    isLoading = true
    getImageComments(props.id, page, props.detailId).then(res => {
      if (res.length > 0) {
        comments.value = comments.value.concat(res)
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
  comments.value = []
  getImageComments(props.id, page, props.detailId).then(res => {
    comments.value = res
    isLoading = false
    page++
  })
}
function addComment() {
  // console.log(myComments.value)
  if (myComments.value.length > 0) {
    addCommentForImage(props.id, myComments.value, props.detailId).then(() => {
      toasty('评论发送成功！', 'Success')
      flush()
    }).catch(() => {
      toasty('评论发送失败了喵~', 'Error')
    })
  } else {
    toasty('评论不能为空喵~', 'Error')
  }
}
function addCommentsBlur() {
  addCommentsRef.value.nativeView.dismissSoftInput()
}
</script>
<style scoped lang="scss">
ActionBar {
  color: #fff;
  font-size: 18px;
}
</style>