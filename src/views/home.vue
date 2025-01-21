<template>
  <Page actionBarHidden="true" :class="{ dark: darkMode }">
    <GridLayout v-show="onLoaded" v-if="isLogin" rows="*,auto">
      <videoList row="0" v-if="navTab == 0" :dark-mode="darkMode" />
      <imageList row="0" v-if="navTab == 1" :dark-mode="darkMode" />
      <subscribe row="0" v-if="navTab == 2" :dark-mode="darkMode" />
      <forum row="0" v-if="navTab == 3" :dark-mode="darkMode" />
      <my row="0" v-if="navTab == 4" :dark-mode="darkMode" />
      <GridLayout row="1" class="bottom-bar" rows="auto" columns="*,*,*,*,*">
        <StackLayout col="0" class="btn" @tap="onNavTabPress(0)"
          :class="{ select: navTab == 0, unSelect: navTab != 0 }">
          <Img :src="navTab == 0 ? '~/assets/icon/video-w.png' : '~/assets/icon/video-g.png'" class="img" />
          <Label text="视频" />
        </StackLayout>
        <StackLayout col="1" class="btn" @tap="onNavTabPress(1)"
          :class="{ select: navTab == 1, unSelect: navTab != 1 }">
          <Img :src="navTab == 1 ? '~/assets/icon/pic-w.png' : '~/assets/icon/pic-g.png'" class="img" />
          <Label text="图片" />
        </StackLayout>
        <StackLayout col="2" class="btn" @tap="onNavTabPress(2)"
          :class="{ select: navTab == 2, unSelect: navTab != 2 }">
          <Img :src="navTab == 2 ? '~/assets/icon/rss-w.png' : '~/assets/icon/rss-g.png'" class="img" />
          <Label text="订阅" />
        </StackLayout>
        <StackLayout col="3" class="btn" @tap="onNavTabPress(3)"
          :class="{ select: navTab == 3, unSelect: navTab != 3 }">
          <Img :src="navTab == 3 ? '~/assets/icon/comments-w.png' : '~/assets/icon/comments-g.png'" class="img" />
          <Label text="论坛" />
        </StackLayout>
        <StackLayout col="4" class="btn" @tap="onNavTabPress(4)"
          :class="{ select: navTab == 4, unSelect: navTab != 4 }">
          <Img :src="navTab == 4 ? '~/assets/icon/user-w.png' : '~/assets/icon/user-g.png'" class="img" />
          <Label text="我的" />
        </StackLayout>
      </GridLayout>
    </GridLayout>
    <loginComponents v-show="onLoaded" v-else @loginSuccess="loginSuccess" :dark-mode="darkMode" />
  </Page>
</template>
<script lang="ts" setup>
import loginComponents from "./home/login.vue";
import subscribe from "./home/subscribe.vue";
import videoList from "./home/video.vue";
import forum from "./home/forum.vue";
import imageList from "./home/image.vue";
import my from "./home/my.vue";
import { ref, provide, watch } from "nativescript-vue";
import { getUserToken } from "../core/database"
import { isTokenValid, myselfData } from '../core/viewFunction'
import { useMainStore } from '../core/store'
const mainStore = useMainStore()
const darkMode = ref(mainStore.dark)
const navTab = ref(2)
const onLoaded = ref<boolean>(false)
const isLogin = ref<boolean>(false)
getUserToken().then(res => {
  if (isTokenValid(res)) {
    console.log('已登录')
    isLogin.value = true
    myselfData()
  } else {
    console.log('未登录')
    isLogin.value = false
  }
}).catch(err => {
  console.log(err)
}).finally(() => {
  onLoaded.value = true
})
const toggleMy = () => {
  onNavTabPress(4)
}
provide('toggleMy', toggleMy)
watch(() => mainStore.dark, (val) => {
  darkMode.value = val
})
function loginSuccess() {
  isLogin.value = true
  myselfData()
}
function onNavTabPress(target: number) {
  navTab.value = target;
}
</script>
<style scoped lang="scss">
Page {
  background-color: #f2f2f2;
}

.bottom-bar {

  .btn {
    padding: 22px;
    font-size: 12px;
    text-align: center;

    .img {
      height: 60px;
      width: 60px;
    }
  }

  .select {
    animation-name: animeSelect;
    animation-duration: 100ms;
    animation-fill-mode: forwards;
    color: #ffffff;
  }

  .unSelect {
    color: #484848;
  }

  @keyframes animeSelect {
    0% {
      background-color: #f2f2f2;
    }

    100% {
      background-color: #00796B;
    }
  }

  @keyframes animeUnSelect {
    0% {
      background-color: #00796B;
    }

    100% {
      background-color: #f2f2f2;
    }
  }
}

.dark {
  background-color: #0d0d0d;
  color: #d0d0d0;

  .bottom-bar {
    .unSelect {
      color: #d0d0d0;
    }

    .select {
      animation-name: animeDarkSelect;
      animation-duration: 100ms;
      animation-fill-mode: forwards;
    }

    @keyframes animeDarkSelect {
      0% {
        background-color: #0d0d0d;
      }

      100% {
        background-color: #00796B;
      }
    }

    @keyframes animeUnSelect {
      0% {
        background-color: #00796B;
      }

      100% {
        background-color: #0d0d0d;
      }
    }
  }
}
</style>
