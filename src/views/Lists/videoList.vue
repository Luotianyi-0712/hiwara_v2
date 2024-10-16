<template>
  <ListView :items="items" @loadMoreItems="$emit('loadMoreItems')" separatorColor="transparent"
    style="padding-top: 10px;">
    <template #default="{ item, index }">
      <StackLayout>
        <GridLayout rows="*" columns="*,*" class="visible">
          <videoItem v-for="i in 2" row="0" :col="i - 1" :id="item[i - 1].id" :title="item[i - 1].title"
            :img="item[i - 1].img" :up="item[i - 1].up" :createdAt="item[i - 1].createdAt"
            :duration="item[i - 1].duration" :numViews="item[i - 1].numViews" :numLikes="item[i - 1].numLikes"
            :ecchi="item[i - 1].ecchi" />
        </GridLayout>
        <ActivityIndicator v-if="index === items.length - 1" color="#00796B" height="80px" width="100%"
          style="margin:20px 0;" :busy="true" />
      </StackLayout>
    </template>
  </ListView>
</template>
<script lang="ts" setup>
import { ref, defineProps, watch, PropType } from 'nativescript-vue';
import { ObservableArray } from '@nativescript/core';
import videoItem from './videoItem.vue';
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
const props = defineProps({
  data: {
    type: Array as PropType<Item[]>,
    required: true
  }
})
const items = ref(new ObservableArray<Item[]>());
if (props.data.length > 0) {
  items.value = refactorArray(props.data)
}
watch(() => props.data, (newValue) => {
  items.value = refactorArray(newValue)
})
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