<template>
  <GridLayout columns="*" rows="*" style="background-color: #000000;">
    <Pager col="0" row="0" :selectedIndex="tab" @selectedIndexChange="onTabChange" v-if="files.length > 1">
      <PagerItem v-for="(item, i) in files" :key="item">
        <GridLayout columns="*" rows="*">
          <Img @tap="onTouch()" row="0" col="0" rowSpan="2" colSpan="2" :src="item"
            failureImageUri="~/assets/img/not-img.jpg" placeholderImageUri="~/assets/img/placeholder-vertical.png"
            stretch="aspectFit" class="img" fadeDuration="300" />
        </GridLayout>
      </PagerItem>
    </Pager>
    <GridLayout v-else col="0" row="0" columns="*" rows="*">
      <Img @tap="onTouch()" row="0" col="0" rowSpan="2" colSpan="2" :src="files[0]"
        failureImageUri="~/assets/img/not-img.jpg" placeholderImageUri="~/assets/img/placeholder-vertical.png"
        stretch="aspectFit" class="img" fadeDuration="300" />
    </GridLayout>
  </GridLayout>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'nativescript-vue'
const tab = ref(0)
const props = defineProps<{
  files: string[];
}>();
function onTabChange(args: any) {
  tab.value = args.value
}
function onTouch() {

}
</script>