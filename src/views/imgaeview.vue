<template>
  <Page actionBarHidden="true">
    <GridLayout columns="*" rows="auto,*">
      <GridLayout col="0" row="0" rowSpan="2" columns="*" rows="auto,*">
        <preview col="0" row="0" :files="files" :height="widthDIPs" />
        <ScrollView col="0" row="1">
          <StackLayout>
            <info :title="title" :slug="slug" :id="id" :up="up" :uid="uid" :body="body" :numViews="numViews"
              :numLikes="numLikes" :createdAt="createdAt" :ecchi="ecchi" :liked="liked" :following="following"
              :friend="friend" :thumbnail="thumbnail" :avatar="avatar" @navigateToComments="navigateToComments" />
            <recommend ref="recommendRef" :pid="id" :uid="uid" />
          </StackLayout>
        </ScrollView>
      </GridLayout>
      <StackLayout col="0" row="0" orientation="horizontal" style="padding: 0 10px;">
        <Label text="&#xf104;" class="font-awesome-solid back-icon" @tap="navigateBack" />
        <Label text="&#xf80b;" class="font-awesome-solid back-icon" @tap="navigateBackHome" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'nativescript-vue'
import { navigateBack, navigateBackHome } from '../core/navigate'
import { Screen } from '@nativescript/core';
import { getImageData } from '../core/api'
import { toasty } from '../core/viewFunction'
import { $navigateTo } from "nativescript-vue"
import info from './imageview/info.vue'
import preview from './imageview/preview.vue'
import recommend from './imageview/recommend.vue'
import comments from './imageview/comments.vue'
const props = defineProps<{
  id: string;
}>();
const widthDIPs = ref(Screen.mainScreen.widthDIPs)
const title = ref<string>('')
const slug = ref<string | null>('')
const up = ref<string>('')
const uid = ref<string>('')
const body = ref<string | null>('')
const numViews = ref<number>(0)
const numLikes = ref<number>(0)
const createdAt = ref<string>('')
const ecchi = ref<boolean>(false)
const liked = ref<boolean>(false)
const following = ref<boolean>(false)
const friend = ref<boolean>(false)
const thumbnail = ref<string>('')
const avatar = ref<string>('')
const files = ref<string[]>([])
getImageData(props.id).then(res => {
  title.value = res.title
  slug.value = res.slug
  up.value = res.up
  uid.value = res.uid
  body.value = res.body
  numViews.value = res.numViews
  numLikes.value = res.numLikes
  createdAt.value = res.createdAt
  ecchi.value = res.ecchi
  liked.value = res.liked
  following.value = res.following
  friend.value = res.friend
  thumbnail.value = res.thumbnail
  avatar.value = res.avatar
  files.value = res.files
}).catch(err => {
  toasty('数据加载失败了喵~', 'Error')
})
function navigateToComments() {
  $navigateTo(comments, {
    props: {
      id: props.id
    },
    transition: {
      name: "slideLeft",
      curve: "easeIn"
    }
  })
}
</script>
<style scoped lang="scss">
.back-icon {
  font-size: 18px;
  height: 80px;
  width: 80px;
  margin: 40px 10px;
  text-align: center;
  color: #fff
}
</style>