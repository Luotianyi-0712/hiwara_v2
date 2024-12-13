<template>
  <GridLayout rows="*" :class="{ 'visible': onloaded && !loadError, 'hidden': !onloaded || loadError }">
    <ListView row="1" v-if="data.length > 0" :items="data" @loadMoreItems="nextPage" class="publish">
      <template #default="{ item, index }">
        <StackLayout class="item">
          <Label :text="item.title" class="title" />
          <Label :text="item.body" class="body" textWrap="true" />
        </StackLayout>
      </template>
    </ListView>
    <GridLayout row="1" rows="*,auto,*" v-else class="noContent">
      <StackLayout row="1">
        <Img src="~/assets/icon/cactus.png" />
        <Label text="此处没有任何内容" class="alimamafont" />
      </StackLayout>
    </GridLayout>
  </GridLayout>
  <loadingAnimation row="0" v-show="!onloaded" :class="{ 'visible': !onloaded, 'hidden': onloaded }" />
  <errorImg text="数据加载失败，请点击重试" @tap="retry" v-show="loadError"
    :class="{ 'visible': loadError, 'hidden': !loadError }" />
</template>
<script setup lang="ts">
import { getPosts } from '../../core/api'
import loadingAnimation from '../components/loadingAnimation.vue'
import errorImg from '../components/errorImg.vue'
import { ref, defineProps } from 'nativescript-vue'
const props = defineProps<{
  uid: string
}>()
interface Item {
  id: string,
  title: string,
  body: string,
  numViews: string,
  createdAt: string,
  updatedAt: string
}
const data = ref<Item[]>([])
const isLoading = ref(false)
const onloaded = ref(false)
const loadError = ref(false)
let page = 0
let isEnd = false
getData().then(res => {
  if (res) {
    data.value = res
  }
}).catch(err => {
  loadError.value = true
}).finally(() => {
  onloaded.value = true
})
function getData(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (isLoading) {
      isLoading.value = true
      getPosts(props.uid, page, 32).then(res => {
        page++
        resolve(res.data)
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
function nextPage() {
  if (!isEnd) {
    getData().then(res => {
      if (res) {
        data.value = data.value.concat(res)
      } else {
        isEnd = true
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
</script>
<style lang="scss" scoped>
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

.publish {
  border-color: #c0c0c0;
  border-top-width: 2px;
}

.item {
  .title {
    font-size: 18px;
    color: #262626;
    padding: 20px 20px 0px 20px;
  }

  .body {
    padding: 20px;
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
</style>