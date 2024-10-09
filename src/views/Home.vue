<template>
  <Frame>
    <Page>
      <ActionBar>
        <GridLayout class="navigation-bar" rows="*" columns="45px,*,75px">
          <StackLayout col="0" class="user-button">
            <Image src="~/assets/icon/user-w.png" class="img" />
          </StackLayout>
          <StackLayout col="1" @tap="$navigateTo(Search)">
            <StackLayout orientation="horizontal" class="search-input">
              <Label text="&#x1f50d; " class="font-awesome-solid" />
              <Label text="搜索" />
            </StackLayout>
          </StackLayout>
          <Label col="2" text="Hiwara" class="logo-text" />
        </GridLayout>
      </ActionBar>
      <DockLayout stretchLastChild="false">
        <GridLayout class="bottom-bar" dock="bottom" rows="auto" columns="*,*,*,*,*">
          <StackLayout col="0" class="btn" @tap="onNavTabPress(0)"
            :class="{ select: navTab == 0, unSelect: navTab != 0 }">
            <Image :src="navTab == 0 ? '~/assets/icon/video-w.png' : '~/assets/icon/video-g.png'" class="img" />
            <Label text="视频" />
          </StackLayout>
          <StackLayout col="1" class="btn" @tap="onNavTabPress(1)"
            :class="{ select: navTab == 1, unSelect: navTab != 1 }"">
            <Image :src="navTab == 1 ? '~/assets/icon/pic-w.png' : '~/assets/icon/pic-g.png'" class=" img" />
          <Label text="图片" />
          </StackLayout>
          <StackLayout col="2" class="btn" @tap="onNavTabPress(2)"
            :class="{ select: navTab == 2, unSelect: navTab != 2 }">
            <Image :src="navTab == 2 ? '~/assets/icon/rss-w.png' : '~/assets/icon/rss-g.png'" class="img" />
            <Label text="订阅" />
          </StackLayout>
          <StackLayout col="3" class="btn" @tap="onNavTabPress(3)"
            :class="{ select: navTab == 3, unSelect: navTab != 3 }">
            <Image :src="navTab == 3 ? '~/assets/icon/comments-w.png' : '~/assets/icon/comments-g.png'" class="img" />
            <Label text="论坛" />
          </StackLayout>
          <StackLayout col="4" class="btn" @tap="onNavTabPress(4)"
            :class="{ select: navTab == 4, unSelect: navTab != 4 }">
            <Image :src="navTab == 4 ? '~/assets/icon/user-w.png' : '~/assets/icon/user-g.png'" class="img" />
            <Label text="我的" />
          </StackLayout>
        </GridLayout>
        <videoList v-if="navTab == 0" />
        <imageList v-if="navTab == 1" />
        <subscribe v-if="navTab == 2" />
      </DockLayout>
    </Page>
  </Frame>
</template>
<script lang="ts" setup>
import subscribe from "./Home/subscribe.vue";
import videoList from "./Home/video.vue";
import imageList from "./Home/image.vue";
import { ref, $navigateTo } from "nativescript-vue";
/** router */
import Search from "./Search.vue";

const navTab = ref(2);
function onNavTabPress(target: number) {
  navTab.value = target;
}
</script>
<style scoped lang="scss">
.navigation-bar {
  color: #fff;
  z-index: 400;
}

.user-button {
  horizontal-align: left;

  .img {
    width: 90px;
    background-color: #9E9E9E;
    border-radius: 50%;
  }
}

.search-input {
  background-color: #fff;
  border-radius: 50%;
  padding: 0 20;
  font-size: 14;
  height: 90px;
  color: #484848;
}

.logo-text {
  font-family: "&eåeLOGO", "riwenlogo";
  font-weight: 400;
  font-size: 14px;
  text-align: right;
  padding-right: 30px;
  text-shadow: 1px 1px 4px #00000080;
}

.bottom-bar {
  background-color: #fff;
  z-index: 390;
  color: #484848;

  .btn {
    padding: 15px;
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
    color: #fff;
  }

  .unSelect {
    animation-name: animeUnSelect;
    animation-duration: 100ms;
    animation-fill-mode: forwards;
    color: #484848;
  }

  @keyframes animeSelect {
    0% {
      background-color: #fff;
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
      background-color: #fff;
    }
  }
}
</style>
