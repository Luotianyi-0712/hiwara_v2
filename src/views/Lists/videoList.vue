<template>
  <ListView v-if="props.data.length > 0" :items="items" @loadMoreItems="$emit('loadMoreItems')"
    separatorColor="transparent">
    <template #default="{ item, index }">
      <StackLayout>
        <GridLayout rows="*" columns="*,*" class="visible" style="padding: 8px 8px 0px 8px;">
          <videoItem v-for="i in item.length" row="0" :col="i - 1" :id="item[i - 1].id" :title="item[i - 1].title"
            :img="item[i - 1].img" :up="item[i - 1].up" :createdAt="item[i - 1].createdAt"
            :duration="item[i - 1].duration" :numViews="item[i - 1].numViews" :numLikes="item[i - 1].numLikes"
            :ecchi="item[i - 1].ecchi" />
        </GridLayout>
        <GridLayout v-if="index === items.length - 1" rows="6px,30px,6px" columns="*">
          <ActivityIndicator v-if="props.loading" row="1" col="0" color="#00796B" :busy="true" />
          <StackLayout v-else row="1" col="0" orientation="horizontal" horizontalAlignment="center">
            <Label text="&#xf068;&#xf068;&#xf068;" class="text font-awesome-solid" />
            <Label text=" 已经到底了 " class="alimamafont" />
            <Label text="&#xf068;&#xf068;&#xf068;" class="text font-awesome-solid" />
          </StackLayout>
        </GridLayout>
      </StackLayout>
    </template>
  </ListView>
  <GridLayout rows="*,auto,*" v-else class="noContent">
    <StackLayout row="1">
      <Img src="~/assets/icon/cactus.png" />
      <Label text="此处没有任何内容" class="alimamafont" />
    </StackLayout>
  </GridLayout>
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
  },
  loading: Boolean
})
const items = ref(new ObservableArray<Item[][]>())
if (props.data.length > 0) {
  items.value = refactorArray(props.data)
}
watch(() => props.data, (newValue) => {
  items.value = refactorArray(newValue)
})
function refactorArray(arr: any[]) {
  const resultArr = arr.reduce((acc: Item[][], value: Item, index: number, array: Item[]) => {
    if (index % 2 === 0) {
      acc.push([value]);
    } else {
      acc[acc.length - 1].push(value);
    }
    return acc;
  }, [])
  return resultArr
}
</script>

<style scoped lang="scss">
.alimamafont {
  font-family: "Alimama FangYuanTi VF Thin", "AlimamaFangYuanTiVF-Thin-2";
  font-weight: 400;
}

.noContent {
  text-align: center;

  Img {
    width: 160px;
    height: 160px;
  }

  Label {
    padding: 20px 0;
    font-size: 16px;
  }
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