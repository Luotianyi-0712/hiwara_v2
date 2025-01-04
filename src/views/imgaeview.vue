<template>
  <Page actionBarHidden="true" :class="{ dark: darkMode }">
    <GridLayout columns="*" rows="auto,*">
      <GridLayout col="0" row="0" rowSpan="2" columns="*" rows="auto,*">
        <preview col="0" row="0" :files="files" :height="widthDIPs" :dark-mode="darkMode" />
        <loadingAnimation col="0" row="1" v-show="!loading" :class="{ 'visible': loading, 'hidden': !loading }" />
        <errorImg col="0" row="1" text="数据加载失败，请点击尝试" v-show="loadingError"
          :class="{ 'visible': loadingError, 'hidden': !loadingError }" @tap="getData" />
        <ScrollView col="0" row="1"
          :class="{ 'visible': !loading && !loadingError, 'hidden': loading || loadingError }">
          <StackLayout>
            <info :title="title" :slug="slug" :id="id" :up="up" :uid="uid" :username="username" :body="body"
              :numViews="numViews" :numLikes="numLikes" :createdAt="createdAt" :ecchi="ecchi" :liked="liked"
              :following="following" :friend="friend" :thumbnail="thumbnail" :avatar="avatar" :dark-mode="darkMode"
              @navigateToComments="navigateToComments" @changeLiked="changeLiked" @changeFollowing="changeFollowing" />
            <recommend ref="recommendRef" :pid="id" :uid="uid" :dark-mode="darkMode" />
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
import { ref, watch, defineProps } from 'nativescript-vue'
import { navigateBack, navigateBackHome } from '../core/navigate'
import { Screen } from '@nativescript/core';
import { getImageData } from '../core/api'
import { toasty } from '../core/viewFunction'
import { $navigateTo } from "nativescript-vue"
import info from './imageview/info.vue'
import preview from './imageview/preview.vue'
import recommend from './imageview/recommend.vue'
import comments from './imageview/comments.vue'
import loadingAnimation from './components/loadingAnimation.vue'
import errorImg from './components/errorImg.vue'
import { useMainStore } from '../core/store'
const mainStore = useMainStore()
const darkMode = ref(mainStore.dark)
const props = defineProps<{
  id: string;
}>();
const widthDIPs = ref(Screen.mainScreen.widthDIPs)
const title = ref<string>('')
const slug = ref<string | null>('')
const up = ref<string>('')
const uid = ref<string>('')
const username = ref<string>('')
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
const loading = ref<boolean>(true)
const loadingError = ref<boolean>(false)
getData()
function getData() {
  loadingError.value = false
  loading.value = true
  getImageData(props.id).then(res => {
    title.value = res.title
    slug.value = res.slug
    up.value = res.up
    uid.value = res.uid
    username.value = res.username
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
    loadingError.value = true
  }).finally(() => {
    loading.value = false
  })
}
watch(() => mainStore.dark, (val) => {
  darkMode.value = val
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
function changeLiked(val: boolean) {
  liked.value = val
}
function changeFollowing(val: boolean) {
  following.value = val
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

.dark {
  background-color: #0d0d0d;
  color: #d0d0d0;
}
</style>