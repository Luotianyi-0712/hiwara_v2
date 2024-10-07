<template>
  <loadingAnimation v-if="!onLoaded" />
  <GridLayout rows="auto, *">
    <FlexboxLayout row="0" style="margin: 8px 100px;">
      <StackLayout width="50%">
        <Label text="视频" @tap="onTabPress(0)" textAlignment="center" height="100px" />
        <StackLayout v-show="tab == 0" class="tab-bar"></StackLayout>
      </StackLayout>
      <StackLayout width="50%">
        <Label text="图片" @tap="onTabPress(1)" textAlignment="center" height="100px" />
        <StackLayout v-show="tab == 1" class="tab-bar"></StackLayout>
      </StackLayout>
    </FlexboxLayout>
    <ContentView row="1">
      <videoList v-if="tab == 0" :data="videoListData" @loadMoreItems="getData" />
    </ContentView>
  </GridLayout>
</template>
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import videoList from '../Lists/video.vue';
import loadingAnimation from '../components/loadingAnimation.vue';
import { getSubscribeVideoList } from '../../script/api';
interface VideoItem {
  id: string,
  title: string,
  up: string,
  numViews: number,
  numLikes: number,
  duration: string,
  createdAt: string,
  updatedAt: string,
  ecchi: boolean,
  img: string,
  loss: boolean
}
const videoListData = ref<VideoItem[]>([]);
const onLoaded = ref(false)
const tab = ref(0)
var page = 0;
var isLoading = false;
getData();
function getData() {
  if (!isLoading) {
    isLoading = true;
    getSubscribeVideoList(page).then(res => {
      videoListData.value = videoListData.value.concat(res);
      onLoaded.value = true;
      isLoading = false;
      page++;
    })
  }
}
function onTabPress(target: number) {
  tab.value = target;
}
</script>
<style lang="scss" scoped>
.tab-bar {
  background-color: #00796B;
  height: 8px;
  border-radius: 50%;
  width: 100px;
}
</style>