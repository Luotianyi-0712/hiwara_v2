<script lang="ts" setup>
import subscribe from "./Home/subscribe.vue";
import { ref } from "nativescript-vue";
const navTab = ref(2);
function onNavTabPress(target: number) {
  navTab.value = target;
}

</script>

<template>
  <Frame>
    <Page actionBarHidden="true">
      <DockLayout stretchLastChild="false">
        <FlexboxLayout class="navigation-bar" dock="top">
          <StackLayout width="14%" class="user-button">
            <Image src="~/assets/icon/user-w.png" class="img" />
          </StackLayout>
          <StackLayout width="66%">
            <TextField hint="搜索" class="search-input" isEnabled="false" />
          </StackLayout>
          <Label text="Hiwara" width="20%" class="logo-text" />
        </FlexboxLayout>
        <FlexboxLayout class="bottom-bar" dock="bottom">
          <StackLayout width="20%" class="btn" @tap="onNavTabPress(0)"
            :style="{ backgroundColor: navTab == 0 ? '#00796B' : '#fff', color: navTab == 0 ? '#fff' : '#484848' }">
            <Image :src="navTab == 0 ? '~/assets/icon/video-w.png' : '~/assets/icon/video-g.png'" class="img" />
            <Label text="视频" />
          </StackLayout>
          <StackLayout width="20%" class="btn" @tap="onNavTabPress(1)"
            :style="{ backgroundColor: navTab == 1 ? '#00796B' : '#fff', color: navTab == 1 ? '#fff' : '#484848' }">
            <Image :src="navTab == 1 ? '~/assets/icon/pic-w.png' : '~/assets/icon/pic-g.png'" class="img" />
            <Label text="图片" />
          </StackLayout>
          <StackLayout width="20%" class="btn" @tap="onNavTabPress(2)"
            :style="{ backgroundColor: navTab == 2 ? '#00796B' : '#fff', color: navTab == 2 ? '#fff' : '#484848' }">
            <Image :src="navTab == 2 ? '~/assets/icon/rss-w.png' : '~/assets/icon/rss-g.png'" class="img" />
            <Label text="订阅" />
          </StackLayout>
          <StackLayout width="20%" class="btn" @tap="onNavTabPress(3)"
            :style="{ backgroundColor: navTab == 3 ? '#00796B' : '#fff', color: navTab == 3 ? '#fff' : '#484848' }">
            <Image :src="navTab == 3 ? '~/assets/icon/comments-w.png' : '~/assets/icon/comments-g.png'" class="img" />
            <Label text="论坛" />
          </StackLayout>
          <StackLayout width="20%" class="btn" @tap="onNavTabPress(4)"
            :style="{ backgroundColor: navTab == 4 ? '#00796B' : '#fff', color: navTab == 4 ? '#fff' : '#484848' }">
            <Image :src="navTab == 4 ? '~/assets/icon/user-w.png' : '~/assets/icon/user-g.png'" class="img" />
            <Label text="我的" />
          </StackLayout>
        </FlexboxLayout>
        <subscribe />
      </DockLayout>
    </Page>
  </Frame>
</template>

<style scoped lang="scss">
.navigation-bar {
  background-color: #00796B;
  color: #fff;
  height: 160px;
  z-index: 400;
  box-shadow: 1px 1px 4px #00000080;
}

.user-button {
  .img {
    width: 90px;
    height: 90px;
    margin: 35px auto;
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
  margin: 35px 0;
  color: #101010;
}

.logo-text {
  font-family: "&eåeLOGO", "riwenlogo";
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  text-shadow: 1px 1px 4px #00000080;
}

.bottom-bar {
  height: 160px;
  box-shadow: 1px 1px 4px #00000080;
  z-index: 390;
  color: #484848;

  .btn {
    padding-top: 25px;
    font-size: 12px;
    text-align: center;

    .img {
      height: 60px;
      width: 60px;
    }
  }
}
</style>
