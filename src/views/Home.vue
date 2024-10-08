<template>
  <Frame>
    <Page>
      <ActionBar>
        <GridLayout class="navigation-bar" rows="*" columns="45px,*,75px">
          <StackLayout col="0" class="user-button" >
            <Image src="~/assets/icon/user-w.png" class="img" />
          </StackLayout>
          <StackLayout col="1">
            <TextField hint="搜索" class="search-input" isEnabled="false" />
          </StackLayout>
          <Label col="2" text="Hiwara" class="logo-text" />
        </GridLayout>
      </ActionBar>
      <DockLayout stretchLastChild="false">
        <GridLayout class="bottom-bar" dock="bottom" rows="auto" columns="*,*,*,*,*">
          <StackLayout col="0" class="btn" @tap="onNavTabPress(0)"
            :style="{ backgroundColor: navTab == 0 ? '#00796B' : '#fff', color: navTab == 0 ? '#fff' : '#484848' }">
            <Image :src="navTab == 0 ? '~/assets/icon/video-w.png' : '~/assets/icon/video-g.png'" class="img" />
            <Label text="视频" />
          </StackLayout>
          <StackLayout col="1" class="btn" @tap="onNavTabPress(1)"
            :style="{ backgroundColor: navTab == 1 ? '#00796B' : '#fff', color: navTab == 1 ? '#fff' : '#484848' }">
            <Image :src="navTab == 1 ? '~/assets/icon/pic-w.png' : '~/assets/icon/pic-g.png'" class="img" />
            <Label text="图片" />
          </StackLayout>
          <StackLayout col="2" class="btn" @tap="onNavTabPress(2)"
            :style="{ backgroundColor: navTab == 2 ? '#00796B' : '#fff', color: navTab == 2 ? '#fff' : '#484848' }">
            <Image :src="navTab == 2 ? '~/assets/icon/rss-w.png' : '~/assets/icon/rss-g.png'" class="img" />
            <Label text="订阅" />
          </StackLayout>
          <StackLayout col="3" class="btn" @tap="onNavTabPress(3)"
            :style="{ backgroundColor: navTab == 3 ? '#00796B' : '#fff', color: navTab == 3 ? '#fff' : '#484848' }">
            <Image :src="navTab == 3 ? '~/assets/icon/comments-w.png' : '~/assets/icon/comments-g.png'" class="img" />
            <Label text="论坛" />
          </StackLayout>
          <StackLayout col="4" class="btn" @tap="onNavTabPress(4)"
            :style="{ backgroundColor: navTab == 4 ? '#00796B' : '#fff', color: navTab == 4 ? '#fff' : '#484848' }">
            <Image :src="navTab == 4 ? '~/assets/icon/user-w.png' : '~/assets/icon/user-g.png'" class="img" />
            <Label text="我的" />
          </StackLayout>
        </GridLayout>
        <subscribe />
      </DockLayout>
    </Page>
  </Frame>
</template>
<script lang="ts" setup>
import subscribe from "./Home/subscribe.vue";
import { ref } from "nativescript-vue";
const navTab = ref(2);
function onNavTabPress(target: number) {
  navTab.value = target;
}
</script>
<style scoped lang="scss">
ActionBar {
  background-color: #00796B;
}

.navigation-bar {
  color: #fff;
  z-index: 400;
}

.user-button {
  horizontal-align: left;
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
  text-align: right;
  padding-right: 30px;
  text-shadow: 1px 1px 4px #00000080;
}

.bottom-bar {
  box-shadow: 1px 1px 4px #00000080;
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
}
</style>
