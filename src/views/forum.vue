<template>
  <Page :class="{ dark: darkMode }">
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
          <StackLayout class="item" @tap="toDetail(item.id, item.title)">
            <Label :text="item.title" class="title" textWrap="true" android:maxLines="2"
              ios:lineBreakMode="tailTruncation" ios:.numberOfLines="2" />
            <StackLayout class="info" orientation="horizontal">
              <Label text="回复" class="label" />
              <Label :text="item.posts" class="number" style="margin-right: 40px;" />
              <Label text="浏览" class="label" />
              <Label :text="item.views" class="number" />
            </StackLayout>
            <GridLayout columns="*,*" rows="auto,auto">
              <StackLayout col="0" row="0" orientation="horizontal">
                <Label text="发布者：" class="label" />
                <Label :text="item.upUser" />
              </StackLayout>
              <StackLayout col="1" row="0" orientation="horizontal">
                <Label text="最新回复：" class="label" />
                <Label :text="item.lastUser" />
              </StackLayout>
              <StackLayout col="0" row="1" orientation="horizontal">
                <Label text="发布于：" class="label" />
                <Label :text="formatIsoToDateTime(item.createdAt)" class="" />
              </StackLayout>
              <StackLayout col="1" row="1" orientation="horizontal">
                <Label text="回复于：" class="label" />
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
import loadingAnimation from './components/loadingAnimation.vue'
import errorImg from './components/errorImg.vue'
import detail from './forum/detail.vue'
import { navigateBack } from '../core/navigate'
import { getForumList } from '../core/api'
import { ref, watch, defineProps, $navigateTo } from 'nativescript-vue'
import { formatIsoToDateTime } from '../core/viewFunction'
import { useMainStore } from '../core/store'
const mainStore = useMainStore()
const darkMode = ref(mainStore.dark)
const props = defineProps<{
  type: string
}>()
interface forumThreadItem {
  id: string,
  title: string,
  posts: number,
  views: number,
  upUser: string,
  lastUser: string,
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
watch(() => mainStore.dark, (val) => {
  darkMode.value = val
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
function toDetail(id: string, title: string) {
  $navigateTo(detail, {
    props: {
      id: id,
      type: props.type,
      title: title
    },
    transition: {
      name: "slideLeft",
      curve: "easeIn"
    }
  })
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
    padding: 0 28px;
  }

  .module {
    font-size: 14px;
    padding: 0 64px 0 16px;
    font-weight: bold;
  }
}

.item {
  padding: 40px;

  .title {
    color: #262626;
    font-size: 16px;
  }

  .label {
    color: #262626;
  }

  .info {
    padding: 20px 0;

    .label {
      padding-right: 10px;
    }
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

    .title,
    .label {
      color: #f2f2f2;
    }
  }
}
</style>