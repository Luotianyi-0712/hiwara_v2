<template>
  <StackLayout style="padding:0 10px 10px 10px;">
    <Label style="padding:10px 10px 20px 10px" text="该作者其他作品" />
    <GridLayout v-for="item in userTestimonialsVideoList" rows="*" columns="*,*" class="visible">
      <videoItem v-for="i in 2" row="0" :col="i - 1" :id="item[i - 1].id" :title="item[i - 1].title"
        :img="item[i - 1].img" :up="item[i - 1].up" :createdAt="item[i - 1].createdAt" :duration="item[i - 1].duration"
        :numViews="item[i - 1].numViews" :numLikes="item[i - 1].numLikes" :ecchi="item[i - 1].ecchi" />
    </GridLayout>
    <Label text="更多作品" />
    <GridLayout v-for="item in systemTestimonialsVideoList" rows="*" columns="*,*" class="visible">
      <videoItem v-for="i in 2" row="0" :col="i - 1" :id="item[i - 1].id" :title="item[i - 1].title"
        :img="item[i - 1].img" :up="item[i - 1].up" :createdAt="item[i - 1].createdAt" :duration="item[i - 1].duration"
        :numViews="item[i - 1].numViews" :numLikes="item[i - 1].numLikes" :ecchi="item[i - 1].ecchi" />
    </GridLayout>
  </StackLayout>
</template>
<script setup lang="ts">
import videoItem from '../Lists/videoItem.vue';
import { ref, defineProps, watch } from 'nativescript-vue'
import { getUserTestimonialsVideoList, getSystemTestimonialsVideoList } from '../../core/api'
const props = defineProps<{
  id: string,
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
const userTestimonialsVideoList = ref<Item[]>([])
const systemTestimonialsVideoList = ref<Item[]>([])
watch(() => props.uid, (val) => {
  if (val) {
    getData()
  }
})
function getData() {
  getUserTestimonialsVideoList(props.uid, props.id).then((res) => {
    userTestimonialsVideoList.value = refactorArray(res)
  })
  getSystemTestimonialsVideoList(props.id).then((res) => {
    systemTestimonialsVideoList.value = refactorArray(res)
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