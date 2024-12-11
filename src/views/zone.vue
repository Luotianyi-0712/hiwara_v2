<template>
  <Page actionBarHidden="true">
    <GridLayout rows="auto, *">
      <loadingAnimation row="0" rowSpan="2" v-show="loading" :class="{ 'visible': loading, 'hidden': !loading }" />
      <errorImg row="0" rowSpan="2" text="数据加载失败，请点击尝试" v-show="loadingError"
        :class="{ 'visible': loadingError, 'hidden': !loadingError }" @tap="thisGetZoneUserData" />
      <GridLayout row="0" rowSpan="2" v-show="!loading && !loadingError"
        :class="{ 'visible': !loading && !loadingError, 'hidden': loading || loadingError }" @scroll="onScroll"
        rows="60px,30px,90px,auto,auto,auto,*">
        <GridLayout row="0" rowSpan="2" style="background-color:#00796B;"></GridLayout>
        <GridLayout row="1" rowSpan="2" columns="100px,*" style="padding: 0 40px;">
          <GridLayout col="0" rows="100px,*">
            <Img row="0" :src="avatar" class="avatar" placeholderImageUri="~/assets/img/avatar-default.png" />
          </GridLayout>
          <GridLayout col="1" rows="30px,4px,auto,4px,*" style="padding-left: 40px;">
            <GridLayout col="1" row="2" columns="*,*,*" style="text-align: center;">
              <StackLayout col="0">
                <Label text="123" style="font-size: 16px;color:#262626;" />
                <Label text="动态" style="font-size: 12px;opacity: 0.8;" />
              </StackLayout>
              <StackLayout col="1" style="border-color:#000000cc;border-left-width:1px;border-right-width:1px">
                <Label text="123" style="font-size: 16px;color:#262626;" />
                <Label text="关注" style="font-size: 12px;opacity: 0.8;" />
              </StackLayout>
              <StackLayout col="2">
                <Label text="123" style="font-size: 16px;color:#262626;" />
                <Label text="粉丝" style="font-size: 12px;opacity: 0.8;" />
              </StackLayout>
            </GridLayout>
            <Button col="1" row="4" text="关注" />
          </GridLayout>
        </GridLayout>
        <ScrollView row="3" style="opacity: 0;height: 0px;">
          <StackLayout>
            <Label ref="signBodyFoldShadow" :text="body" class="signBody" @layoutChanged="getSignBodyFoldHeight" />
            <GridLayout ref="signBodyUnfoldShadow" rows="auto,auto" class="signBody"
              @layoutChanged="getSignBodyUnfoldHeight">
              <Label row="0" :text="body" textWrap="true" />
              <Label row="1" :text="username" textWrap="true" />
            </GridLayout>
          </StackLayout>
        </ScrollView>
        <StackLayout row="3" orientation="horizontal">
          <Label :text="uname" class="userName" />
          <StackLayout verticalAlignment="center">
            <Label v-if="premium" text="高级会员" class="vip" />
          </StackLayout>
        </StackLayout>
        <GridLayout row="4" rows="auto,auto" columns="*,auto" @tap="toggleExpand" class="signBody" ref="signBodyRef">
          <Label row="0" col="0" :text="body" :textWrap="allInfo" />
          <Label row="0" col="1" :text="allInfo ? '收起' : '更多'" verticalAlignment="top" color="#2196F3" />
          <StackLayout row="1" orientation="horizontal" v-if="allInfo">
            <Label text="&#xf2bb;  " class="font-awesome-regular" />
            <Label :text="'@' + username" />
          </StackLayout>
        </GridLayout>
        <GridLayout row="5" ref="tabsRef" rows="35px,3px" columns="*,*,*" class="tab">
          <Label text="视频" row="0" col="0" @tap="onTabPress(0)" textAlignment="center" />
          <Label text="图片" row="0" col="1" @tap="onTabPress(1)" textAlignment="center" />
          <Label text="发布" row="0" col="2" @tap="onTabPress(2)" textAlignment="center" />
          <StackLayout row="1" col="0" class="tab-bar" :class="{ 'hidden': tab != 0, 'visible': tab == 0 }">
          </StackLayout>
          <StackLayout row="1" col="1" class="tab-bar" :class="{ 'hidden': tab != 1, 'visible': tab == 1 }">
          </StackLayout>
          <StackLayout row="1" col="2" class="tab-bar" :class="{ 'hidden': tab != 2, 'visible': tab == 2 }">
          </StackLayout>
        </GridLayout>
        <Pager row="6" :selectedIndex="tab" @selectedIndexChange="onTabChange">
          <PagerItem>
            <videoList :uid="props.uid" />
          </PagerItem>
          <PagerItem>
            <imageList />
          </PagerItem>
          <PagerItem>
            <publish />
          </PagerItem>
        </Pager>
      </GridLayout>
      <StackLayout col="0" row="0" orientation="horizontal" style="padding: 0 10px;">
        <Label text="&#xf104;" class="font-awesome-solid back-icon" @tap="navigateBack" />
        <Label text="&#xf80b;" class="font-awesome-solid back-icon" @tap="navigateBackHome" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>
<script lang="ts" setup>
import loadingAnimation from './components/loadingAnimation.vue'
import errorImg from './components/errorImg.vue'
import videoList from './zone/video.vue'
import imageList from './zone/image.vue'
import publish from './zone/publish.vue'
import { ref, defineProps, onMounted } from 'nativescript-vue'
import { getZoneUserData } from '../core/api'
import { navigateBack, navigateBackHome } from '../core/navigate'
import { toasty } from '../core/viewFunction'
import { Animation, AnimationDefinition } from '@nativescript/core'
const props = defineProps<{
  uid: string
  username: string
}>()
const loading = ref<boolean>(true)
const loadingError = ref<boolean>(false)
const tab = ref(0)
const allInfo = ref(false)

let signBodyFoldHeight = 0
let signBodyUnfoldHeight = 0
const signBodyRef = ref()
const signBodyFoldShadow = ref()
const signBodyUnfoldShadow = ref()

const tabsRef = ref()

const avatar = ref('')
const uname = ref('')
const body = ref('')
const premium = ref<boolean>(false)

thisGetZoneUserData()

function thisGetZoneUserData() {
  loading.value = true
  loadingError.value = false
  getZoneUserData(props.username).then(data => {
    // console.log(data)
    avatar.value = data.avatar
    uname.value = data.name
    body.value = data.body ? data.body : '这家伙很懒，什么都没有写~'
    premium.value = data.premium
  }).catch(err => {
    console.log(err)
    loadingError.value = true
    toasty("用户信息获取失败", "Error")
  }).finally(() => {
    loading.value = false
  })
}
function onTabPress(target: number) {
  if (tab.value != target) {
    tab.value = target
  }
}
function onTabChange(args: any) {
  tab.value = args.value
}
function toggleExpand() {
  if (allInfo.value) {
    const animationDefinition: AnimationDefinition[] = [
      {
        target: signBodyRef.value.nativeView, // 动画的目标视图
        duration: 200, // 动画持续时间，单位为毫秒
        height: signBodyFoldHeight + 'px', // 动画的目标高度
      }
    ]
    new Animation(animationDefinition).play().then(() => {
      allInfo.value = !allInfo.value
    })
  } else {
    allInfo.value = !allInfo.value
    const animationDefinition: AnimationDefinition[] = [
      {
        target: signBodyRef.value.nativeView, // 动画的目标视图
        duration: 200, // 动画持续时间，单位为毫秒
        height: signBodyUnfoldHeight + 'px', // 动画的目标高度
      }
    ]
    new Animation(animationDefinition).play()
  }
}
function getSignBodyFoldHeight() {
  signBodyFoldHeight = signBodyFoldShadow.value.nativeView.getMeasuredHeight()
}
function getSignBodyUnfoldHeight() {
  signBodyUnfoldHeight = signBodyUnfoldShadow.value.nativeView.getMeasuredHeight()
}
function onScroll(args: any) {
  console.log(args.scrollY)
}
</script>
<style scoped lang="scss">
.back-icon {
  font-size: 18px;
  height: 80px;
  width: 80px;
  margin: 40px 10px;
  text-align: center;
  color: #fff
}

.avatar {
  border-radius: 50%;
  border-color: #f2f2f2;
  border-width: 8px;
}

.userName {
  font-size: 22px;
  color: #262626;
  padding: 0 40px;
}

.vip {
  color: #ffffff;
  background-color: #ff5ecc;
  border-radius: 50%;
  padding: 4px 20px;
  font-size: 12px;
  margin-left: 20px;
}

.signBody {
  padding: 30px 40px;
  border-color: #c0c0c0;
  border-bottom-width: 1px;
}

.tab {

  .tab-bar {
    background-color: #00796B;
    height: 8px;
    border-radius: 50%;
    width: 100px;
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