<template>
  <Page :class="{ dark: darkMode }">
    <ActionBar>
      <GridLayout columns="32px,*,20px" class="topBar">
        <Label col="0" text="&#xf104;" class="font-awesome-solid" @tap="navigateBack" />
        <Label col="1" :text="title" class="title" />
      </GridLayout>
    </ActionBar>
    <GridLayout rows="*">
      <ListView :items="listData" @loadMoreItems="nextPage"
        :class="{ 'visible': onloaded && !loadError, 'hidden': !onloaded || loadError }">
        <template #default="{ item, index }">
          <StackLayout class="item">
            <GridLayout columns="40px,*,auto" rows="40px">
              <Img @tap="toUserZone(item.uid, item.username)" col="0" row="0" :src="item.avatar" class="avatar"
                :placeholderImageUri="getPlaceholderImageUri()" />
              <Label @tap="toUserZone(item.uid, item.username)" col="1" :text="item.user" class="user" />
              <Label col="2" :text="index > 0 ? ('第' + (index + 1) + '楼') : '楼主'" verticalAlignment="top"
                style="font-size: 12px;" />
            </GridLayout>
            <Label :text="title" textWrap="true" class="title" v-if="index === 0" />
            <Label :text="item.body" textWrap="true" class="body" />
            <GridLayout columns="*,*" style="padding: 20px;">
              <StackLayout col="0" orientation="horizontal">
                <Label text="发布于：" class="label" />
                <Label :text="formatIsoToDateTime(item.createdAt)" class="" />
              </StackLayout>
              <StackLayout col="1" orientation="horizontal">
                <Label text="更新于：" class="label" />
                <Label :text="formatIsoToDateTime(item.updatedAt)" class="" />
              </StackLayout>
            </GridLayout>
          </StackLayout>
        </template>
      </ListView>
      <loadingAnimation v-show="!onloaded" :class="{ 'visible': !onloaded, 'hidden': onloaded }" />
      <errorImg text="数据加载失败，请点击重试" @tap="retry" v-show="loadError"
        :class="{ 'visible': loadError, 'hidden': !loadError }" />
    </GridLayout>
  </Page>
</template>
<script setup lang="ts">
import loadingAnimation from '../components/loadingAnimation.vue'
import errorImg from '../components/errorImg.vue'
import { navigateTo, navigateBack } from '../../core/navigate'
import { getForumThread } from '../../core/api'
import { ref, watch, defineProps } from 'nativescript-vue'
import { formatIsoToDateTime } from '../../core/viewFunction'
import { useMainStore } from '../../core/store'
const mainStore = useMainStore()
const darkMode = ref(mainStore.dark)
const props = defineProps<{
  id: string,
  type: string,
  title: string
}>()
interface forumThread {
  id: string,
  body: string,
  user: string,
  username: string,
  uid: string,
  avatar: string,
  createdAt: string,
  updatedAt: string
}
const listData = ref<forumThread[]>([])
const onloaded = ref(false)
const loadError = ref(false)
const isLoading = ref(false)
let page = 0
let isEnd = false
getListData().then(res => {
  if (res) {
    listData.value = res.list
  }
}).catch(err => {
  loadError.value = true
}).finally(() => {
  onloaded.value = true
})
watch(() => mainStore.dark, (val) => {
  darkMode.value = val
})
function getListData(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!isLoading.value) {
      isLoading.value = true
      getForumThread(props.id, props.type, page, 32).then(res => {
        page++
        resolve(res)
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
    getListData().then(res => {
      if (res) {
        if (res.list.length > 0) {
          listData.value = listData.value.concat(res.list)
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
  listData.value = []
  onloaded.value = false
  loadError.value = false
  getListData().then(res => {
    if (res) {
      listData.value = res.list
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
function getPlaceholderImageUri() {
  if (darkMode.value) {
    return "~/assets/img/avatar-default-dark.png"
  } else {
    return "~/assets/img/avatar-default.png"
  }
}
</script>
<style scoped lang="scss">
.topBar {
  color: #ffffff;
  font-size: 18px;

  .title {
    // font-weight: bold;
  }
}

.item {
  padding: 20px;

  .avatar {
    border-radius: 50%;
  }

  .user {
    color: #262626;
    font-size: 16px;
    padding: 0 20px;
  }

  .title {
    color: #262626;
    font-size: 16px;
    padding: 30px 20px 20px 20px;
    font-weight: bold;
    border-bottom-width: 1px;
    border-color: #c0c0c0;
  }

  .body {
    color: #262626;
    padding: 20px;
  }

  .label {
    color: #262626;
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
  background-color: #0d0d0d;
  color: #d0d0d0;

  .item {

    .user,
    .title,
    .body,
    .label {
      color: #f2f2f2;
    }
  }
}
</style>