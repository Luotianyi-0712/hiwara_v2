<template>
  <Page>
    <ActionBar>
      <GridLayout columns="32px,auto,auto,*,auto" class="topBar">
        <Label col="0" text="&#xf104;" class="font-awesome-solid" @tap="navigateBack" />
        <Label col="1" :text="formatPageTitle(type)[0]" class="title" />
        <Label col="2" :text="formatPageTitle(type)[1]" class="illustrate" />
        <Label col="4" text="论坛" class="module" />
      </GridLayout>
    </ActionBar>
    <GridLayout rows="*">
      <ListView :items="listData" @loadMoreItems="nextPage"
        :class="{ 'visible': onloaded && !loadError, 'hidden': !onloaded || loadError }">
        <template #default="{ item, index }">
          <StackLayout>
            <Label :text="item.title" />
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
import loadingAnimation from './components/loadingAnimation.vue'
import errorImg from './components/errorImg.vue'
import { navigateBack } from '../core/navigate'
import { getForumList } from '../core/api'
import { ref, defineProps } from 'nativescript-vue'
const props = defineProps<{
  type: string
}>()
interface forumThreadItem {
  id: string,
  title: string,
  posts: number,
  views: number,
  user: string,
  createdAt: string,
  updatedAt: string,
  locked: boolean,
  sticky: boolean,
}
const listData = ref<forumThreadItem[]>([])
const onloaded = ref(false)
const loadError = ref(false)
const isLoading = ref(false)
let page = 0
let isEnd = false
getListData().then(res => {
  if (res) {
    listData.value = res
  }
}).catch(err => {
  loadError.value = true
}).finally(() => {
  onloaded.value = true
})
function getListData(): Promise<forumThreadItem[] | null> {
  return new Promise((resolve, reject) => {
    if (!isLoading.value) {
      isLoading.value = true
      getForumList(props.type, page, 32).then(res => {
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
        if (res.length > 0) {
          listData.value = listData.value.concat(res)
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
      listData.value = res
    }
  }).catch(err => {
    loadError.value = true
  }).finally(() => {
    onloaded.value = true
  })
}
function formatPageTitle(val: string) {
  switch (val) {
    case 'announcements':
      return ['公告', '重要信息']
    case 'feedback':
      return ['反馈', '想法、建议和顾虑']
    case 'support':
      return ['帮助', '帮助解决网站相关问题']
    case 'general':
      return ['普通', '其他一切']
    case 'guides':
      return ['指南', '有用的信息或者 "如何" 指南']
    case 'questions':
      return ['帮助/问题', '与网站无关的问题']
    case 'requests':
      return ['请求', '帮助寻找或创造']
    case 'sharing':
      return ['分享', '分享模型，动作或者其他配件']
    case 'general-ja':
      return ['普通', '其他一切']
    case 'questions-ja':
      return ['帮助/问题', '与网站无关的问题']
    case 'requests-ja':
      return ['请求', '帮助寻找或创造']
    case 'support-ja':
      return ['帮助', '帮助解决网站相关问题']
    case 'general-zh':
      return ['普通', '其他一切']
    case 'questions-zh':
      return ['帮助/问题', '与网站无关的问题']
    case 'requests-zh':
      return ['请求', '帮助寻找或创造']
    case 'support-zh':
      return ['帮助', '帮助解决网站相关问题']
    default:
      return val
  }
}
</script>
<style scoped lang="scss">
.topBar {
  color: #ffffff;
  font-size: 18px;

  .title {
    font-weight: bold;
  }

  .illustrate {
    font-size: 14px;
    padding: 14px 28px 0 28px;
  }

  .module {
    font-size: 14px;
    padding: 0 64px 0 16px;
    font-weight: bold;
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