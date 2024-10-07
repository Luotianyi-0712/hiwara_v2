<template>
  <ListView :items="items" @loadMoreItems="$emit('loadMoreItems')" separatorColor="transparent">
    <template #default="{ item, index }">
      <StackLayout>
        <FlexboxLayout>
          <StackLayout v-for="i in 2" width="50%" class="item">
            <StackLayout class="item-content">
              <AbsoluteLayout>
                <Img left="0" top="0" :src="item[i - 1].img" failureImageUri="~/assets/img/not-img.jpg"
                  placeholderImageUri="~/assets/img/placeholder.png" stretch="aspectFill" class="img"
                  fadeDuration="300" />
                <StackLayout left="0" top="4" orientation="horizontal" style="padding: 0 10px;" width="100%"
                  horizontalAlignment="right">
                  <Label v-show="item[i - 1].ecchi" text="R-18" class="r18 tip" />
                </StackLayout>
                <FlexboxLayout left="0" top="115" width="100%" style="padding: 0 20px;">
                  <StackLayout orientation="horizontal" width="70%">
                    <Label text="&#xf144; " class="font-awesome-regular tip" />
                    <Label class="tip" :text="item[i - 1].numViews" />
                    <Label text="  &#x1f9e1; " class="font-awesome-regular tip" />
                    <Label class="tip" :text="item[i - 1].numLikes" />
                  </StackLayout>
                  <StackLayout orientation="horizontal" width="30%" horizontalAlignment="right">
                    <Label class="tip" :text="item[i - 1].duration" />
                  </StackLayout>
                </FlexboxLayout>
              </AbsoluteLayout>
              <Label :text="item[i - 1].title" class="title" textWrap="true" android:maxLines="2"
                ios:lineBreakMode="tailTruncation" ios:.numberOfLines="2" />
              <FlexboxLayout class="info" width="100%">
                <StackLayout orientation="horizontal" width="50%">
                  <Label text="&#x1f464; " class="font-awesome-regular" />
                  <Label :text="item[i - 1].up" />
                </StackLayout>
                <StackLayout orientation="horizontal" width="50%" horizontalAlignment="right">
                  <Label text="&#x1f553; " class="font-awesome-regular" />
                  <Label :text="item[i - 1].createdAt" />
                </StackLayout>
              </FlexboxLayout>
            </StackLayout>
          </StackLayout>
        </FlexboxLayout>
        <ActivityIndicator v-if="index === items.length - 1" color="#00796B" height="80px" width="100%"
          style="margin:20px 0;" :busy="true" />
      </StackLayout>
    </template>
  </ListView>
</template>
<script lang="ts" setup>
import { ref, defineProps, watch, PropType } from 'nativescript-vue';
import { ObservableArray } from '@nativescript/core';
interface Item {
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
.item {
  padding: 6px;

  .item-content {
    box-shadow: 1px 1px 4px #00000080;
    border-radius: 10px;
    overflow: hidden;
  }

  .tip {
    font-size: 10px;
    color: #fff;
    text-shadow: 1px 1px 1px #000000;
  }

  .r18 {
    background-color: #F44336a2;
    padding: 4px 8px;
    font-weight: bold;
  }

  .img {
    width: 100%;
    height: 400px;
    border-radius: 10px 10px 0 0;
  }

  .title {
    padding: 0px 20px;
    font-size: 14px;
    color: #262626;
    height: 125px;
  }

  .info {
    padding: 0px 20px 10px 20px;
    font-size: 10px;
  }
}
</style>