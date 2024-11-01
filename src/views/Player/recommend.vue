<template>
  <StackLayout style="padding:0 10px 10px 10px;">
    <Label style="padding:10px 10px 20px 10px" text="该作者其他作品" v-if="userTestimonialsVideoListLoaded" />
    <GridLayout v-for="item in userTestimonialsVideoList" rows="*" columns="*,*" class="visible">
      <videoItem v-for="i in 2" row="0" :col="i - 1" :id="item[i - 1].id" :title="item[i - 1].title"
        :img="item[i - 1].img" :up="item[i - 1].up" :createdAt="item[i - 1].createdAt" :duration="item[i - 1].duration"
        :numViews="item[i - 1].numViews" :numLikes="item[i - 1].numLikes" :ecchi="item[i - 1].ecchi" />
    </GridLayout>
    <Label text="更多推荐作品" v-if="systemTestimonialsVideoListLoaded" />
    <GridLayout v-for="item in systemTestimonialsVideoList" rows="*" columns="*,*" class="visible">
      <videoItem v-for="i in 2" row="0" :col="i - 1" :id="item[i - 1].id" :title="item[i - 1].title"
        :img="item[i - 1].img" :up="item[i - 1].up" :createdAt="item[i - 1].createdAt" :duration="item[i - 1].duration"
        :numViews="item[i - 1].numViews" :numLikes="item[i - 1].numLikes" :ecchi="item[i - 1].ecchi" />
    </GridLayout>
  </StackLayout>
</template>
<script setup lang="ts">
import videoItem from '../lists/videoItem.vue';
import { ref, defineProps, watch } from 'nativescript-vue'
import { getUserTestimonialsVideoList, getSystemTestimonialsVideoList } from '../../core/api'
const props = defineProps<{
  vid: string,
  uid: string
}>();
interface Item {
  id: string,
  title: string,
  up: string,
  numViews: number,
  numLikes: number,
  duration: number,
  createdAt: string,
  updatedAt: string,
  ecchi: boolean,
  img: string,
  loss: boolean
}
const userTestimonialsVideoList = ref<Item[][]>()
const systemTestimonialsVideoList = ref<Item[][]>()
const userTestimonialsVideoListLoaded = ref(false)
const systemTestimonialsVideoListLoaded = ref(false)
watch(() => props.uid, (val) => {
  if (val) {
    getData()
  }
})
function getData() {
  getUserTestimonialsVideoList(props.uid, props.vid).then((res) => {
    userTestimonialsVideoList.value = refactorArray(res)
    if (res.length > 0) {
      userTestimonialsVideoListLoaded.value = true
    }
  })
  getSystemTestimonialsVideoList(props.vid).then((res) => {
    systemTestimonialsVideoList.value = refactorArray(res)
    if (res.length > 0) {
      systemTestimonialsVideoListLoaded.value = true
    }
  }).catch(err => {
    console.log(err)
  })
}
function refactorArray(arr: any[]) {
  return arr.reduce((acc: Item[][], value: Item, index: number, array: Item[]) => {
    if (index % 2 === 0) {
      acc.push([value]);
    } else {
      acc[acc.length - 1].push(value);
    }
    return acc;
  }, []);
}
</script>
<style scoped lang="scss">
Label {
  padding: 20px 10px;
  color: #363636;
}

.visible {
  animation-name: animeVisible;
  animation-duration: 200ms;
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