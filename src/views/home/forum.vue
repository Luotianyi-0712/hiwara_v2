<template>
  <GridLayout row="*" :class="{ dark: drakMode }">
    <ScrollView :class="{ 'visible': onloaded && !loadError, 'hidden': !onloaded || loadError }">
      <StackLayout>
        <StackLayout v-for="content in formatList">
          <Label :text="content.title" class="topTitle" />
          <GridLayout v-for="item in content.data" rows="auto,auto" columns="auto,4*,3*" class="item"
            @tap="goTo(item.type)">
            <GridLayout row="0" col="0" class="icon"></GridLayout>
            <StackLayout row="0" col="1" class="title">
              <Label :text="item.typeLabel" class="label" />
              <Label :text="item.illustrate" class="illustrate" />
            </StackLayout>
            <StackLayout row="0" col="2" class="info" orientation="horizontal">
              <Label text="发布" class="label" />
              <Label :text="item.posts" class="number" style="margin-right: 0px;" />
              <Label text="主题" class="label" />
              <Label :text="item.threads" class="number" />
            </StackLayout>
            <StackLayout row="1" col="0" colSpan="3" class="last">
              <Label text="最新发布" class="label" />
              <Label :text="item.lastThread" class="content" textWrap="true" android:maxLines="2"
                ios:lineBreakMode="tailTruncation" ios:.numberOfLines="2" />
              <StackLayout orientation="horizontal" horizontalAlignment="right">
                <Label :text="item.user" class="user" />
                <Label text="回复于" class="huifuyu" />
                <Label :text="formatIsoToDateTime(item.createdAt)" class="time" />
              </StackLayout>
            </StackLayout>
          </GridLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
    <loadingAnimation v-show="!onloaded" :class="{ 'visible': !onloaded, 'hidden': onloaded }" />
    <errorImg text="数据加载失败，请点击重试" @tap="getData" v-show="loadError"
      :class="{ 'visible': loadError, 'hidden': !loadError }" />
  </GridLayout>
</template>
<script lang="ts" setup>
import loadingAnimation from '../components/loadingAnimation.vue'
import errorImg from '../components/errorImg.vue'
import { getHomeForum } from '../../core/api'
import { formatIsoToDateTime, toasty } from '../../core/viewFunction'
import { navigateTo } from '../../core/navigate'
import { ref, watch } from 'nativescript-vue'
import { useMainStore } from '../../core/store'
const mainStore = useMainStore()
const drakMode = ref(mainStore.dark)
const onloaded = ref(false)
const loadError = ref(false)
const formatList = ref([
  {
    title: '站长',
    data: [
      {
        type: 'announcements',
        typeLabel: '公告',
        illustrate: '重要信息',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      },
      {
        type: 'feedback',
        typeLabel: '反馈',
        illustrate: '想法、建议和顾虑',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      }, {
        type: 'support',
        typeLabel: '帮助',
        illustrate: '帮助解决网站相关问题',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      }
    ]
  },
  {
    title: '版主',
    data: [
      {
        type: 'general',
        typeLabel: '普通',
        illustrate: '其他一切',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      }, {
        type: 'guides',
        typeLabel: '指南',
        illustrate: '有用的信息或者 "如何" 指南',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      }, {
        type: 'questions',
        typeLabel: '帮助/问题',
        illustrate: '与网站无关的问题',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      }, {
        type: 'requests',
        typeLabel: '请求',
        illustrate: '帮助寻找或创造',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      }, {
        type: 'sharing',
        typeLabel: '分享',
        illustrate: '分享模型，动作或者其他配件',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      },
    ]
  },
  {
    title: '日本人',
    data: [
      {
        type: 'general-ja',
        typeLabel: '普通',
        illustrate: '其他一切',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      }, {
        type: 'questions-ja',
        typeLabel: '帮助/问题',
        illustrate: '与网站无关的问题',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      }, {
        type: 'requests-ja',
        typeLabel: '请求',
        illustrate: '帮助寻找或创造',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      }, {
        type: 'support-ja',
        typeLabel: '帮助',
        illustrate: '帮助解决网站相关问题',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      },
    ]
  },
  {
    title: '中国人',
    data: [
      {
        type: 'general-zh',
        typeLabel: '普通',
        illustrate: '其他一切',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      }, {
        type: 'questions-zh',
        typeLabel: '帮助/问题',
        illustrate: '与网站无关的问题',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      }, {
        type: 'requests-zh',
        typeLabel: '请求',
        illustrate: '帮助寻找或创造',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      }, {
        type: 'support-zh',
        typeLabel: '帮助',
        illustrate: '帮助解决网站相关问题',
        posts: 0, threads: 0, lastThread: '', user: '', createdAt: ''
      },
    ]
  }
])
getData()
function getData() {
  getHomeForum().then(res => {
    for (let item of res) {
      let i = 0
      let j = 0
      let n = true
      switch (item.type) {
        case 'announcements':
          i = 0; j = 0; break
        case 'feedback':
          i = 0; j = 1; break
        case 'support':
          i = 0; j = 2; break
        case 'general':
          i = 1; j = 0; break
        case 'guides':
          i = 1; j = 1; break
        case 'questions':
          i = 1; j = 2; break
        case 'requests':
          i = 1; j = 3; break
        case 'sharing':
          i = 1; j = 4; break
        case 'general-ja':
          i = 2; j = 0; break
        case 'questions-ja':
          i = 2; j = 1; break
        case 'requests-ja':
          i = 2; j = 2; break
        case 'support-ja':
          i = 2; j = 3; break
        case 'general-zh':
          i = 3; j = 0; break
        case 'questions-zh':
          i = 3; j = 1; break
        case 'requests-zh':
          i = 3; j = 2; break
        case 'support-zh':
          i = 3; j = 3; break
        default:
          n = false
          break
      }
      if (n) {
        writeFormatList(i, j, item.posts, item.threads, item.lastThread, item.user, item.createdAt)
      }
    }
    function writeFormatList(
      i: number,
      j: number,
      posts: number,
      threads: number,
      lastThread: string,
      user: string,
      createdAt: string) {
      formatList.value[i].data[j].posts = posts
      formatList.value[i].data[j].threads = threads
      formatList.value[i].data[j].lastThread = lastThread
      formatList.value[i].data[j].user = user
      formatList.value[i].data[j].createdAt = createdAt
    }
  }).catch(e => {
    console.log(e)
    loadError.value = true
    toasty('数据获取失败', 'Error')
  }).finally(() => {
    onloaded.value = true
  })
}
watch(() => mainStore.dark, (val) => {
  drakMode.value = val
})
function goTo(type: string) {
  navigateTo('/forum', {
    type: type
  })
}
</script>
<style scoped lang="scss">
.topTitle {
  font-size: 20px;
  padding: 20px 40px;
  font-weight: bold;
  color: #fff;
  background-color: #00796B;

}

.item {
  border-bottom-width: 1px;
  border-color: #c0c0c0;
  padding: 40px;
}

.icon {
  background-color: #00796B;
  border-radius: 50%;
  width: 12px;
  margin-right: 20px;
}

.title {

  .label {
    font-size: 18px;
    font-weight: bold;
    color: #262626;
  }

  .illustrate {
    font-size: 14;
  }
}

.info {
  font-size: 14px;

  .label {
    color: #262626;
  }

  .number {
    padding: 0 20px;
  }
}

.last {
  padding-top: 40px;

  .label {
    color: #262626;
  }

  .content {
    padding: 20px 0;
  }

  .user {
    font-weight: bold
  }

  .huifuyu {
    padding: 0 20px;
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
  color: #d0d0d0;

  .title,
  .info,
  .last {
    .label {
      color: #f2f2f2;
    }

    .huifuyu {
      color: #f2f2f2;
    }
  }
}
</style>