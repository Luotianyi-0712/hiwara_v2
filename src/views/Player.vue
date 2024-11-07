<template>
  <Page actionBarHidden="true">
    <GridLayout columns="*" :rows="isFullscreen ? '*,0' : 'auto,*'">
      <videoPlayerFrame col="0" row="0" :playerSrc="playerSrc" :title="title" :definition="definition"
        :definitionList="definitionList" :isFullscreen="isFullscreen"
        :height="isFullscreen ? '100%' : widthDIPs * 9 / 16" @onFullscreen="onFullscreen"
        @changeDefinition="changeDefinition" />
      <loadingAnimation row="1" col="0" :class="{ 'visible': loading, 'hidden': !loading }" />
      <errorImg col="0" row="1" text="数据加载失败，请点击尝试" :class="{ 'visible': loadingError, 'hidden': !loadingError }"
        @tap="getData" />
      <GridLayout columns="*" rows="auto,*" row="1" col="0"
        :class="{ 'visible': !loading && !loadingError, 'hidden': loading || loadingError }">
        <GridLayout columns="10px,150px,*,175px,10px" row="0"
          style="box-shadow: 1px 1px 4px #00000040;background-color: #fff;">
          <GridLayout col="1" row="0" rows="35px,3px" columns="*,*" class="tab">
            <Label text="简介" row="0" col="0" @tap="onTabPress(0)" textAlignment="center" />
            <Label text="评论" row="0" col="1" @tap="onTabPress(1)" textAlignment="center" />
            <StackLayout row="1" col="0" class="tab-bar" :class="{ 'hidden': tab != 0, 'visible': tab == 0 }">
            </StackLayout>
            <StackLayout row="1" col="1" class="tab-bar" :class="{ 'hidden': tab != 1, 'visible': tab == 1 }">
            </StackLayout>
          </GridLayout>
          <GridLayout col="3" row="0" rows="35px,3px" columns="3*,2*" v-if="filesloaded" class="visible">
            <StackLayout row="0" col="0" orientation="horizontal" horizontalAlignment="center" @tap="switchService">
              <Label text="&#xf0c2; " class="font-awesome-solid " />
              <Label :text="serviceName" />
            </StackLayout>
            <StackLayout row="0" col="1" orientation="horizontal" horizontalAlignment="center" @tap="switchDefinition">
              <Label text="&#x1f39e; " class="font-awesome-solid " />
              <Label :text="definitionLabel" />
            </StackLayout>
          </GridLayout>
        </GridLayout>
        <Pager row="1" col="0" colSpan="2" :selectedIndex="tab" @selectedIndexChange="onTabChange">
          <PagerItem>
            <ScrollView>
              <StackLayout>
                <info :title="title" :slug="slug" :id="id" :up="up" :uid="uid" :body="body" :numViews="numViews"
                  :numLikes="numLikes" :createdAt="createdAt" :ecchi="ecchi" :liked="liked" :following="following"
                  :friend="friend" :thumbnail="thumbnail" :avatar="avatar" :files="files"
                  :definitionList="definitionList" @changeLiked="changeLiked" @changeFollowing="changeFollowing" />
                <recommend ref="recommendRef" :vid="id" :uid="uid" />
              </StackLayout>
            </ScrollView>
          </PagerItem>
          <PagerItem>
            <comments :id="id" />
          </PagerItem>
        </Pager>
      </GridLayout>
    </GridLayout>
  </Page>
</template>
<script setup lang="ts">
import { Screen, Dialogs } from '@nativescript/core';
import { ref, defineProps, watch, onMounted, onBeforeUnmount } from 'nativescript-vue'
import { getVideoData, getVideoFiles } from '../core/api'
import videoPlayerFrame from './player/videoPlayer.vue';
import recommend from './player/recommend.vue';
import loadingAnimation from './components/loadingAnimation.vue';
import errorImg from './components/errorImg.vue';
import info from './player/info.vue';
import comments from './player/comments.vue';
import { isAndroid, isIOS, Application } from '@nativescript/core'
import { parseDefinitionLabel, unParseDefinitionLabel, toasty } from '../core/viewFunction'
const props = defineProps<{
  id: string;
}>();

const title = ref<string>('')
const slug = ref<string>('')
const up = ref<string>('')
const uid = ref<string>('')
const body = ref<string | null>('')
const numViews = ref<number>(0)
const numLikes = ref<number>(0)
const createdAt = ref<string>('')
const ecchi = ref<boolean>(false)
const liked = ref<boolean>(false)
const following = ref<boolean>(false)
const friend = ref<boolean>(false)
const thumbnail = ref<string>('')
const avatar = ref<string>('')
const tab = ref(0)
const recommendRef = ref()
const loading = ref<boolean>(true)
const loadingError = ref<boolean>(false)
let fileUrl = ''
let fid = ''
const files = ref<any[]>([])
const playerSrc = ref<string>('')
// const playerSrc = ref<string>('https://ro.qisato.com:2096/public/VID_20220416_033049_395.mp4')
const definition = ref<string>('Source')
const definitionLabel = ref<string>('')
const definitionList = ref<any[]>([])
const serviceName = ref<string>('')
const filesloaded = ref(false)
const isFullscreen = ref(false)
const widthDIPs = ref(Screen.mainScreen.widthDIPs)
let switchServiceIng = false
getData()
onMounted(() => {
  if (isAndroid) {
    Application.android.on(Application.AndroidApplication.activityBackPressedEvent, (args: any) => {
      args.cancel = true
      console.log('返回')
      if (isFullscreen.value) {
        isFullscreen.value = false
      } else {
        args.cancel = false
      }
    })
  }
})
onBeforeUnmount(() => {
  if (isAndroid) {
    const activity = Application.android.foregroundActivity || Application.android.startActivity
    if (activity) {
      activity.setRequestedOrientation(android.content.pm.ActivityInfo.SCREEN_ORIENTATION_PORTRAIT)
      const window = activity.getWindow()
      const decorView = window.getDecorView()
      const insetsController = decorView.getWindowInsetsController()
      if (insetsController) {
        insetsController.show(android.view.WindowInsets.Type.statusBars() | android.view.WindowInsets.Type.navigationBars())
      }
    }
    Application.android.off(Application.AndroidApplication.activityBackPressedEvent)
  }
})
watch(definition, val => {
  if (files.value) {
    const found = files.value.filter(function (item) {
      return item.name === val;
    })
    playerSrc.value = 'https:' + found[0].src.view
    definitionLabel.value = parseDefinitionLabel(found[0].name)
    serviceName.value = parseServiceName(found[0].src.view)
  }
})
watch(isFullscreen, (val) => {
  if (isAndroid) {
    const activity = Application.android.foregroundActivity || Application.android.startActivity;
    if (activity) {
      const window = activity.getWindow();
      const decorView = window.getDecorView();
      const insetsController = decorView.getWindowInsetsController();
      if (val) {
        // 全屏模式
        activity.setRequestedOrientation(android.content.pm.ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        if (insetsController) {
          insetsController.hide(android.view.WindowInsets.Type.statusBars() | android.view.WindowInsets.Type.navigationBars());
          insetsController.setSystemBarsBehavior(android.view.WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
        }
      } else {
        // 非全屏模式
        activity.setRequestedOrientation(android.content.pm.ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        if (insetsController) {
          insetsController.show(android.view.WindowInsets.Type.statusBars() | android.view.WindowInsets.Type.navigationBars());
        }
      }
    }
  }
})
function getData() {
  loadingError.value = false
  loading.value = true
  getVideoData(props.id).then(res => {
    // console.log(res)
    title.value = res.title
    slug.value = res.slug
    up.value = res.up
    uid.value = res.uid
    body.value = res.body
    numViews.value = res.numViews
    numLikes.value = res.numLikes
    createdAt.value = res.createdAt
    ecchi.value = res.ecchi
    liked.value = res.liked
    following.value = res.following
    friend.value = res.friend
    thumbnail.value = res.thumbnail
    avatar.value = res.avatar
    fileUrl = res.fileUrl
    fid = res.fid
    loading.value = false
    getFiles(fileUrl, fid).then(res => {
      files.value = res
      const found = files.value.filter(function (item) {
        return item.name === definition.value;
      });
      playerSrc.value = 'https:' + found[0].src.view
      definitionLabel.value = parseDefinitionLabel(found[0].name)
      serviceName.value = parseServiceName(found[0].src.view)
      files.value.forEach(element => {
        if (element.name !== 'preview') {
          definitionList.value.push(element.name)
        }
      })
      filesloaded.value = true
    }).catch(err => {
      toasty('视频加载失败了喵~', 'Error')
    })
  }).catch(err => {
    toasty('数据加载失败了喵~', 'Error')
  })
}
function getFiles(fileUrl: string, id: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    getVideoFiles(fileUrl).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err)
    })
  })
}
function onTabPress(target: number) {
  if (tab.value != target) {
    tab.value = target;
  }
}
function onTabChange(args: any) {
  tab.value = args.value
}
function parseServiceName(url: string): string {
  const match = url.match(/\/\/([^.]*)\./);
  const result = match ? match[1] : '未知';
  return result
}
function switchService() {
  if (!switchServiceIng && fileUrl !== '' && fid !== '') {
    switchServiceIng = true
    toasty('正在切换服务器...', 'Success')
    getFiles(fileUrl, fid).then(res => {
      files.value = res
      const found = files.value.filter(function (item) {
        return item.name === definition.value;
      });
      playerSrc.value = 'https:' + found[0].src.view
      definitionLabel.value = parseDefinitionLabel(found[0].name)
      serviceName.value = parseServiceName(found[0].src.view)
    }).catch(err => {
      toasty('服务器切换失败', 'Error')
    }).finally(() => {
      switchServiceIng = false
    })
  }
}
function switchDefinition() {
  let actions: any[] = []
  for (let i = 0; i < definitionList.value.length; i++) {
    actions.push(parseDefinitionLabel(definitionList.value[i]))
  }
  Dialogs.action({
    title: '切换清晰度',
    message: '切换视频清晰度',
    actions: actions,
    cancelable: true,
  }).then((result) => {
    if (actions.includes(result)) {
      changeDefinition(unParseDefinitionLabel(result))
    }
  })
}
function changeDefinition(val: string) {
  console.log(val)
  definition.value = val
}
function onFullscreen() {
  isFullscreen.value = !isFullscreen.value
}
function changeLiked(val: boolean) {
  liked.value = val
}
function changeFollowing(val: boolean) {
  following.value = val
}
</script>
<style scoped lang="scss">
.tab-bar {
  background-color: #00796B;
  height: 8px;
  border-radius: 50%;
  width: 100px;
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