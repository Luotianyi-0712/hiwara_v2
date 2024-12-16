<template>
  <Page>
    <ActionBar @tap="addCommentsBlur">
      <GridLayout columns="32px,auto,*">
        <Label col="0" text="&#xf104;" class="font-awesome-solid" @tap="navigateBack" />
        <Label col="1" text="评论" />
      </GridLayout>
    </ActionBar>
    <GridLayout rows="*,50px" @tap="addCommentsBlur">
      <ListView row="0" :items="comments" @loadMoreItems="nextPage">
        <template #default="{ item, index }">
          <commentItem :id="item.id" :index="index" :userName="item.userName" :body="item.body"
            :createdAt="item.createdAt" :numReplies="item.numReplies" @detail="toDetail" :reply="true"
            @tap="addCommentsBlur" @reply="replyComments" />
        </template>
      </ListView>
      <Label row="0" textAlignment="center" text="还没有评论喵~" v-if="comments.length === 0" />
      <GridLayout row="1" columns="*,80px"
        style="box-shadow: 1px 1px 4px #00000040;background-color: #fff;padding: 0 20px;">
        <TextField col="0" hint="添加评论" style="font-size: 16px;" v-model="myComments" ref="addCommentsRef"
          @blur="addCommentsInputBlur" />
        <Button col="1" text="发送" height="110px" @tap="addComment" />
      </GridLayout>
    </GridLayout>
  </Page>
</template>
<script setup lang="ts">
import commentItem from './commentItem.vue';
import commentReplys from './commentReplys.vue';
import { ref, defineProps, onBeforeUnmount, $navigateTo } from 'nativescript-vue'
import { getImageComments, addCommentForImage } from '../../core/api'
import { toasty } from '../../core/viewFunction'
import { navigateBack } from '../../core/navigate'
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
const myComments = ref('')
const addCommentsRef = ref()
let replyParentId: string | null = null
let isLoading = false
let page = 0
let isEnd = false
let timer: any
getImageComments(props.id, page).then(res => {
  comments.value = res
  page++
})
onBeforeUnmount(() => {
  clearTimeout(timer)
})
function nextPage() {
  if (!isLoading && !isEnd) {
    isLoading = true
    getImageComments(props.id, page).then(res => {
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
  getImageComments(props.id, page).then(res => {
    comments.value = res
    isLoading = false
    page++
  })
}
function addComment() {
  if (myComments.value.length > 0) {
    if (replyParentId) {
      addCommentForImage(props.id, myComments.value, replyParentId).then(() => {
        toasty('评论发送成功！', 'Success')
        flush()
      }).catch(() => {
        toasty('评论发送失败了喵~', 'Error')
      })
    } else {
      addCommentForImage(props.id, myComments.value).then(() => {
        toasty('评论发送成功！', 'Success')
        flush()
      }).catch(() => {
        toasty('评论发送失败了喵~', 'Error')
      })
    }
  } else {
    toasty('评论不能为空喵~', 'Error')
  }
}
function toDetail(id: string) {
  $navigateTo(commentReplys, {
    props: {
      id: props.id,
      detailId: id
    },
    transition: {
      name: "slideLeft",
      curve: "easeIn"
    }
  })
}
function replyComments(id: string) {
  replyParentId = id
  timer = setTimeout(() => {
    addCommentsRef.value.nativeView.focus()
  }, 100)
}
function addCommentsBlur() {
  replyParentId = null
  addCommentsRef.value.nativeView.dismissSoftInput()
}
function addCommentsInputBlur() {
  // console.log('addCommentsInputBlur')
  replyParentId = null
}
</script>
<style scoped lang="scss">
ActionBar {
  color: #fff;
  font-size: 18px;
}
</style>