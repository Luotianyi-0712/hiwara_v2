<template>
  <Page actionBarHidden="true">
    <GridLayout columns="*" rows="auto,*">
      <GridLayout columns="*" rows="*" col="0" row="0" :height="calculateHeight()" class="player">
        <VideoPlayer col="0" row="0" src="~/assets/video/VID_20220416_033049_395.mp4" autoplay="true" />
      </GridLayout>
      <loadingAnimation row="1" col="0" :class="loading ? 'visible' : 'hidden'" />
      <GridLayout columns="*" rows="auto,*" row="1" col="0" :class="loading ? 'hidden' : 'visible'">
        <GridLayout columns="10px,150px,*,10px" row="0" style="box-shadow: 1px 1px 4px #00000040;">
          <GridLayout col="1" row="0" rows="35px,3px" columns="*,*" class="tab">
            <Label text="简介" row="0" col="0" @tap="onTabPress(0)" textAlignment="center" />
            <Label text="评论" row="0" col="1" @tap="onTabPress(1)" textAlignment="center" />
            <StackLayout row="1" col="0" class="tab-bar" :class="{ 'hidden': tab != 0, 'visible': tab == 0 }">
            </StackLayout>
            <StackLayout row="1" col="1" class="tab-bar" :class="{ 'hidden': tab != 1, 'visible': tab == 1 }">
            </StackLayout>
          </GridLayout>
        </GridLayout>
        <Pager row="1" col="0" colSpan="2" :selectedIndex="tab" @selectedIndexChange="onTabChange">
          <PagerItem>
            <ScrollView>
              <StackLayout>
                <info :title="title" :up="up" :body="body" :numViews="numViews" :numLikes="numLikes"
                  :createdAt="createdAt" :ecchi="ecchi" :liked="liked" :following="following" :friend="friend"
                  :thumbnail="thumbnail" :avatar="avatar" />
                <recommend ref="recommendRef" :id="id" :uid="uid" />
              </StackLayout>
            </ScrollView>
          </PagerItem>
          <PagerItem><Label text="Second" /></PagerItem>
        </Pager>
      </GridLayout>
    </GridLayout>
  </Page>
</template>
<script setup lang="ts">
import info from './Player/info.vue';
import { Screen } from '@nativescript/core';
import { ref, defineProps } from 'nativescript-vue'
import { getVideoData } from '../core/api'
import { Toasty } from "@imagene.me/nativescript-toast"
import { ToastVariant } from '@imagene.me/nativescript-toast/enums/toast-variant';
import { ToastDuration } from '@imagene.me/nativescript-toast/enums/toast-duration';
import recommend from './Player/recommend.vue';
import loadingAnimation from './Components/loadingAnimation.vue';

const props = defineProps<{
  id: string;
}>();
const title = ref<string>()
const up = ref<string>()
const uid = ref<string>()
const body = ref<string>()
const numViews = ref<number>()
const numLikes = ref<number>()
const createdAt = ref<string>()
const ecchi = ref<boolean>()
const liked = ref<boolean>()
const following = ref<boolean>()
const friend = ref<boolean>()
const thumbnail = ref<string>()
const avatar = ref<string>()
const tab = ref(0)
const recommendRef = ref()
const loading = ref(true)

getVideoData(props.id).then(res => {
  // console.log(res)
  title.value = res.title
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
  loading.value = false
}).catch(err => {
  const toast = new Toasty({
    text: '数据加载失败了喵~',
    duration: ToastDuration.Short,
    variant: ToastVariant.Error
  })
  toast.show()
})
function calculateHeight() {
  return Screen.mainScreen.widthDIPs * 9 / 16;
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
<style scoped lang="scss">
.player {
  background-color: black;
  width: 100%;
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