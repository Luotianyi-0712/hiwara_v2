<template>
  <Page :class="{ dark: darkMode }">
    <ActionBar>
      <GridLayout columns="32px,auto,*" class="topBar">
        <Label col="0" text="&#xf104;" class="font-awesome-solid" @tap="navigateBack" />
        <Label col="1" text="设置缓存目录" />
      </GridLayout>
    </ActionBar>
    <ScrollView>
      <StackLayout style="padding-top: 80px;">
        <Label text="视频缓存目录" class="title" />
        <TextField v-model="video" hint="请输入视频缓存目录" class="input" />
        <Label :class="{ 'visible': !tipShow(video), 'hidden': tipShow(video) }" text="请输入正确的路径" class="tip" />
        <Label text="图片缓存目录" class="title" />
        <TextField v-model="image" hint="请输入图片缓存目录" class="input" />
        <Label :class="{ 'visible': !tipShow(image), 'hidden': tipShow(image) }" text="请输入正确的路径" class="tip" />
        <Button text="保存设置" @tap="toggle" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script lang="ts" setup>
import { ref, watch, $navigateBack } from "nativescript-vue"
import { changeDownload, getConfig } from "../../core/database"
import { toasty } from "../../core/viewFunction"
import { Folder } from '@nativescript/core'
import { useMainStore } from '../../core/store'
const mainStore = useMainStore()
const darkMode = ref(mainStore.dark)
const video = ref('')
const image = ref('')
const pattern = /^\/storage\/emulated\/0\/(?!\/)([^\/]+(\/[^\/]+)*)$/
getConfig().then(data => {
  video.value = data.videoDownload
  image.value = data.imageDownload
})
watch(() => mainStore.dark, (val) => {
  darkMode.value = val
})
function navigateBack() {
  $navigateBack()
}
function toggle() {
  if (pattern.test(video.value) && pattern.test(image.value)) {
    let msgArr = []
    if (!Folder.exists(video.value)) {
      msgArr.push('视频缓存目录不存在')
    }
    if (!Folder.exists(image.value)) {
      msgArr.push('图片缓存目录不存在')
    }
    if (msgArr.length > 0) {
      let msg = msgArr.join('\n')
      toasty(msg)
    } else {
      changeDownload(video.value, image.value).then(() => {
        toasty('设置已保存')
      })
    }
  } else {
    toasty('请输入正确的路径')
  }
}
function tipShow(val: string) {
  return pattern.test(val)
}
</script>
<style scoped lang="scss">
.topBar {
  color: #ffffff;
  font-size: 18px;
}

.tab {
  .tab-bar {
    background-color: #00796B;
    height: 8px;
    border-radius: 50%;
    width: 100px;
  }

  border-bottom-width: 1px;
  border-color: #c0c0c0;
}

.title {
  font-size: 16px;
  padding: 20px 30px 20px 30px;
  text-align: left;
  color: #424242;
}

.input {
  font-size: 16px;
  margin: 0 20px;
}

.tip {
  color: #E53935;
  padding: 0 20px;
  font-size: 12px;
}

Button {
  margin: 10px 20px;
}

.hidden {
  opacity: 0;
}

.visible {
  animation-name: animeVisible;
  animation-duration: 100ms;
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

Button {
  background-color: #00796B;
  color: #f0f0f0;
  font-size: 18px;
  height: 160px;
}

.dark {
  background-color: #0d0d0d;
  color: #d0d0d0;

  .title {
    color: #e0e0e0;
  }

  .input {
    background-color: #202020;
    color: #f2f2f2;

    ::placeholder {
      color: #757575;
    }
  }
}
</style>