<template>
  <GridLayout rows="*" :class="{ 'visible': onloaded && !loadError, 'hidden': !onloaded || loadError }">
    <ListView row="1" v-if="data.length > 0" :items="data" @loadMoreItems="nextPage" class="publish">
      <template #default="{ item, index }">
        <GridLayout columns="76px,*,100px" rows="8px,32px,28px,8px" class="item"
          @tap="toUserZone(item.uid, item.username)">
          <GridLayout col="0" row="0" rowSpan="4" columns="10px,56px,10px" rows="10px,56px,10px">
            <Img col="1" row="1" :src="item.avatar" class="avatar"
              placeholderImageUri="~/assets/img/avatar-default.png" />
          </GridLayout>
          <Label col="1" row="1" :text="item.name" class="name" />
          <Label col="1" row="2" :text="'@' + item.username" class="userid" />
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
import errorImg from '../components/errorImg.vue'
import noContent from '../components/noContent.vue'
import { ref, defineExpose } from 'nativescript-vue'
import { searchData } from '../../core/api'
import { navigateTo } from "../../core/navigate"
interface Item {
  uid: string,
  name: string,
  username: string,
  avatar: string,
  following: boolean,
  friend: boolean,
  premium: boolean
}
const data = ref<Item[]>([])
const isLoading = ref(false)
const onloaded = ref(false)
const loadError = ref(false)
let page = 0
let isEnd = false
let query: string = ''
const search = (text: string) => {
  if (query != text) {
    query = text
    retry()
  }
}
defineExpose({
  search
})
function getData(): Promise<Item[] | null> {
  return new Promise((resolve, reject) => {
    if (!isLoading.value) {
      isLoading.value = true
      searchData(query, 'user', page, 32).then(res => {
        if (res.length > 0) {
          page++
          resolve(res)
        } else {
          resolve(null)
        }
      }).catch(err => {
        reject()
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
function toUserZone(uid: string, username: string) {
  navigateTo('/zone', {
    uid: uid,
    username: username
  })
}
</script>
<style scoped lang="scss">
.item {
  .avatar {
    border-radius: 50%;
  }

  .name {
    font-size: 16px;
    color: #232323;
  }

  .userid {
    font-size: 14px;
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