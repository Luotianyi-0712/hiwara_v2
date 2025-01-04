<template>
  <StackLayout style="padding:0 10px 10px 10px;" :class="{ dark: darkMode }">
    <Label style="padding:10px 10px 20px 10px" text="该作者其他作品" v-if="userTestimonialsImageListLoaded" />
    <GridLayout v-for="item in userTestimonialsImageList" rows="*" columns="*,*" class="visible">
      <<imageItem v-for="i in 2" row="0" :col="i - 1" :id="item[i - 1].id" :title="item[i - 1].title"
        :img="item[i - 1].img" :up="item[i - 1].up" :createdAt="item[i - 1].createdAt"
        :numImages="item[i - 1].numImages" :numViews="item[i - 1].numViews" :numLikes="item[i - 1].numLikes"
        :ecchi="item[i - 1].ecchi" />
    </GridLayout>
    <Label text="更多推荐作品" v-if="systemTestimonialsImageListLoaded" />
    <GridLayout v-for="item in systemTestimonialsImageList" rows="*" columns="*,*" class="visible">
      <imageItem v-for="i in 2" row="0" :col="i - 1" :id="item[i - 1].id" :title="item[i - 1].title"
        :img="item[i - 1].img" :up="item[i - 1].up" :createdAt="item[i - 1].createdAt"
        :numImages="item[i - 1].numImages" :numViews="item[i - 1].numViews" :numLikes="item[i - 1].numLikes"
        :ecchi="item[i - 1].ecchi" />
    </GridLayout>
  </StackLayout>
</template>
<script setup lang="ts">
import imageItem from '../lists/imageItem.vue';
import { ref, defineProps, watch } from 'nativescript-vue'
import { getUserTestimonialsImageList, getSystemTestimonialsImageList } from '../../core/api'
const props = defineProps<{
  pid: string
  uid: string
  darkMode: boolean
}>();
interface Item {
  id: string,
  title: string,
  up: string,
  numImages: number,
  numViews: number,
  numLikes: number,
  createdAt: string,
  updatedAt: string,
  ecchi: boolean,
  img: string,
}
const userTestimonialsImageList = ref<Item[][]>()
const systemTestimonialsImageList = ref<Item[][]>()
const userTestimonialsImageListLoaded = ref(false)
const systemTestimonialsImageListLoaded = ref(false)
watch(() => props.uid, (val) => {
  if (val) {
    getData()
  }
})
function getData() {
  getUserTestimonialsImageList(props.uid, props.pid).then((res) => {
    userTestimonialsImageList.value = refactorArray(res)
    if (res.length > 0) {
      userTestimonialsImageListLoaded.value = true
    }
  })
  getSystemTestimonialsImageList(props.pid).then((res) => {
    systemTestimonialsImageList.value = refactorArray(res)
    if (res.length > 0) {
      systemTestimonialsImageListLoaded.value = true
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
  color: #262626;
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

.dark {
  Label {
    color: #d0d0d0;
  }
}
</style>