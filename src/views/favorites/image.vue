<template>
  <GridLayout rows="*" :class="{ 'visible': onloaded && !loadError, 'hidden': !onloaded || loadError, dark: darkMode }">
    <ListView row="1" v-if="data.length > 0" :items="data" @loadMoreItems="nextPage" class="history">
      <template #default="{ item, index }">
        <GridLayout @tap="onTouch(item.id)" columns="128px,*,8px" rows="8px,40px,18px,18px,8px" class="item">
          <GridLayout col="0" row="0" columns="8px,*,*,8px" rows="8px,*,*,8px" rowSpan="5">
            <Img row="1" col="1" colSpan="2" rowSpan="2" :src="item.img" failureImageUri="~/assets/img/not-img.jpg"
              :placeholderImageUri="getPlaceholderImageUri()" stretch="aspectFill" class="img" fadeDuration="300" />
            <StackLayout row="1" col="2" class="r18" horizontalAlignment="right">
              <Label v-show="item.ecchi" text="R-18" />
            </StackLayout>
            <StackLayout orientation="horizontal" row="2" col="1" class="tip">
              <Label verticalAlignment="bottom" :text="item.numImages" />
            </StackLayout>
          </GridLayout>
          <Label row="1" col="1" :text="item.title" class="title" textWrap="true" android:maxLines="2"
            ios:lineBreakMode="tailTruncation" ios:.numberOfLines="2" />
          <StackLayout row="2" col="1" orientation="horizontal" class="info">
            <Label text="&#x1f464; " class="font-awesome-regular" />
            <Label :text="item.up" />
          </StackLayout>
          <GridLayout columns="*,*" row="3" col="1" class="info">
            <StackLayout col="0" orientation="horizontal">
              <Label text="&#xf3cf;  " class="font-awesome-solid" />
              <Label :text="formatIsoToDateTime(item.updatedAt)" />
            </StackLayout>
            <StackLayout col="1" orientation="horizontal">
              <Label text="&#x1f553; " class="font-awesome-regular" />
              <Label :text="formatIsoToDateTime(item.createdAt)" />
            </StackLayout>
          </GridLayout>
        </GridLayout>
      </template>
    </ListView>
    <noContent row="1" v-else />
  </GridLayout>
  <loadingAnimation row="0" v-show="!onloaded" :class="{ 'visible': !onloaded, 'hidden': onloaded }" />
  <errorImg text="数据加载失败，请点击重试" @tap="retry" v-show="loadError"
    :class="{ 'visible': loadError, 'hidden': !loadError }" />
</template>
<script lang="ts" setup>
import loadingAnimation from '../components/loadingAnimation.vue'
import noContent from '../components/noContent.vue'
import errorImg from '../components/errorImg.vue'
import { getMyFavoritesImage } from '../../core/api'
import { navigateTo } from "../../core/navigate"
import { ref, watch, defineExpose } from 'nativescript-vue'
import { formatIsoToDateTime } from '../../core/viewFunction'
import { useMainStore } from '../../core/store'
const mainStore = useMainStore()
const darkMode = ref(mainStore.dark)
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
  img: string
}
const data = ref<Item[]>([])
const isLoading = ref(false)
const onloaded = ref(false)
const loadError = ref(false)
let page = 0
let isEnd = false
let action = false
const init = () => {
  if (!action) {
    retry()
    action = true
  }
}
defineExpose({
  init
})
watch(() => mainStore.dark, (val) => {
  darkMode.value = val
})
function nextPage() {
  if (!isEnd) {
    getData().then(res => {
      if (res) {
        if (res.length > 0) {
          data.value = data.value.concat(res)
        } else {
          isEnd = true
        }
      }
    })
  }
}
function retry() {
  page = 0
  isEnd = false
  loadError.value = false
  onloaded.value = false
  data.value = []
  getData().then(res => {
    if (res) {
      data.value = res
    }
  }).catch(err => {
    loadError.value = true
  }).finally(() => {
    onloaded.value = true
  })
}
function getData(): Promise<Item[] | null> {
  return new Promise((resolve, reject) => {
    if (!isLoading.value) {
      isLoading.value = true
      getMyFavoritesImage(page).then(data => {
        page++
        resolve(data)
      }).catch(err => {
        console.log(err)
        reject(err)
      }).finally(() => {
        isLoading.value = false
      })
    } else {
      resolve(null)
    }
  })
}
function onTouch(id: string) {
  navigateTo("/imageview", {
    id: id
  })
}
function getPlaceholderImageUri() {
  if (darkMode.value) {
    return "~/assets/img/placeholder-dark.png"
  } else {
    return "~/assets/img/placeholder.png"
  }
}
</script>
<style scoped lang="scss">
.history {
  border-color: #c0c0c0;
  border-top-width: 1px;
}

.item {
  .img {
    border-radius: 8px;
  }

  .r18 {
    padding: 10px;

    Label {
      background-color: #F44336a2;
      padding: 4px 8px;
      font-weight: bold;
      font-size: 10px;
      color: #fff;
    }
  }

  .tip {
    font-size: 10px;
    color: #fff;
    padding: 4px 8px;

    Label {
      text-shadow: 1px 1px 1px #000000;
    }
  }


  .title {
    font-size: 14px;
    color: #262626;
  }

  .info {
    font-size: 11px;
  }
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

.dark {
  .item {
    .title {
      color: #f2f2f2;
    }
  }
}
</style>