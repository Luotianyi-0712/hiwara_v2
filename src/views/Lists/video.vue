<template>
  <ListView :items="items" @loadMoreItems="$emit('loadMoreItems')" separatorColor="transparent">
    <template #default="{ item, index }">
      <StackLayout>
        <FlexboxLayout>
          <StackLayout v-for="i in 2" width="50%" class="item">
            <GridLayout class="item-content" rows="120px,50px,20px" columns="*,*">
              <Img @tap="onTouch(item[i - 1].id)" row="0" col="0" colSpan="2" :src="item[i - 1].img"
                failureImageUri="~/assets/img/not-img.jpg" placeholderImageUri="~/assets/img/placeholder.png"
                stretch="aspectFill" class="img" fadeDuration="300" />
              <StackLayout row="0" col="1" class="tip" style="horizontal-align: right;">
                <Label v-show="item[i - 1].ecchi" text="R-18" class="r18" />
              </StackLayout>
              <StackLayout orientation="horizontal" row="0" col="0" class="tip">
                <Label verticalAlignment="bottom" text="&#x1f464; " class="text font-awesome-regular" />
                <Label verticalAlignment="bottom" :text="item[i - 1].up" class="text" />
              </StackLayout>
              <StackLayout orientation="horizontal" row="0" col="1" class="tip" style="horizontal-align: right;">
                <Label verticalAlignment="bottom" text="&#x1f553; " class="text font-awesome-regular" />
                <Label verticalAlignment="bottom" :text="item[i - 1].createdAt" class="text" />
              </StackLayout>
              <!-- <FlexboxLayout flexDirection="column" row="0" col="0" colSpan="2">
                <FlexboxLayout width="100%" class="tip">
                  <Label style="flex-grow: 1;" />
                  <Label v-show="item[i - 1].ecchi" text="R-18" class="r18" />
                </FlexboxLayout>
                <StackLayout style="flex-grow: 1;"></StackLayout>
                <FlexboxLayout class="tip" width="100%">
                  <Label text="&#x1f464; " class="text font-awesome-regular" />
                  <Label :text="item[i - 1].up" class="text" />
                  <Label style="flex-grow: 1;" />
                  <Label text="&#x1f553; " class="text font-awesome-regular" />
                  <Label :text="item[i - 1].createdAt" class="text" />
                </FlexboxLayout>
              </FlexboxLayout> -->
              <Label @tap="onTouch(item[i - 1].id)" row="1" col="0" colSpan="2" :text="item[i - 1].title" class="title"
                textWrap="true" android:maxLines="2" ios:lineBreakMode="tailTruncation" ios:.numberOfLines="2" />
              <StackLayout orientation="horizontal" row="2" col="0" class="info">
                <Label text="&#x1f464; " class="font-awesome-regular" />
                <Label :text="item[i - 1].up" />
              </StackLayout>
              <StackLayout orientation="horizontal" row="2" col="1" class="info" style="horizontal-align: right;">
                <Label text="&#x1f553; " class="font-awesome-regular" />
                <Label :text="item[i - 1].createdAt" />
              </StackLayout>
            </GridLayout>
          </StackLayout>
        </FlexboxLayout>
        <ActivityIndicator v-if="index === items.length - 1" color="#00796B" height="80px" width="100%"
          style="margin:20px 0;" :busy="true" />
      </StackLayout>
    </template>
  </ListView>
</template>
<script lang="ts" setup>
import { ref, defineProps, watch, PropType, onUnmounted } from 'nativescript-vue';
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
function onTouch(id: string) {
  console.log(id)
}
</script>

<style scoped lang="scss">
.item {
  padding: 6px;

  .item-content {
    box-shadow: 1px 1px 4px #00000080;
    border-radius: 10px;
    overflow: hidden;
    // background-color: aqua;
  }

  .tip {
    font-size: 10px;
    color: #fff;
    padding: 20px;

    .text {
      text-shadow: 1px 1px 1px #000000;
    }
  }

  .r18 {
    background-color: #F44336a2;
    padding: 4px 8px;
    font-weight: bold;
    vertical-alignment: top;
  }

  .img {
    width: 100%;
    height: 100%;
    border-radius: 10px 10px 0 0;
  }

  .title {
    padding: 0 20px;
    font-size: 14px;
    color: #262626;
  }

  .info {
    padding: 10px 20px;
    font-size: 10px;
  }
}
</style>