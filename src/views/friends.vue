<template>
  <Page :class="{ dark: darkMode }">
    <ActionBar>
      <GridLayout columns="32px,auto,*" class="topBar">
        <Label col="0" text="&#xf104;" class="font-awesome-solid" @tap="navigateBack" />
        <Label col="1" :text="myself ? '好友列表' : 'Ta的好友列表'" />
      </GridLayout>
    </ActionBar>
    <GridLayout rows="auto,*">
      <GridLayout row="0" rows="35px,3px" columns="*,*" class="tab">
        <Label text="关注" row="0" col="0" @tap="onTabPress(0)" textAlignment="center" />
        <Label text="粉丝" row="0" col="1" @tap="onTabPress(1)" textAlignment="center" />
        <StackLayout row="1" col="0" class="tab-bar" :class="{ 'hidden': tab != 0, 'visible': tab == 0 }"></StackLayout>
        <StackLayout row="1" col="1" class="tab-bar" :class="{ 'hidden': tab != 1, 'visible': tab == 1 }"></StackLayout>
      </GridLayout>
      <Pager row="1" col="0" colSpan="2" :selectedIndex="tab" @selectedIndexChange="onTabChange">
        <PagerItem>
          <GridLayout rows="*">
            <following :uid="uid" :myself="myself" />
          </GridLayout>
        </PagerItem>
        <PagerItem>
          <GridLayout rows="*">
            <followers :uid="uid" :myself="myself" />
          </GridLayout>
        </PagerItem>
      </Pager>
    </GridLayout>
  </Page>
</template>
<script lang="ts" setup>
import following from './friends/following.vue'
import followers from './friends/followers.vue'
import { navigateBack } from '../core/navigate'
import { ref, watch, defineProps } from 'nativescript-vue'
import { myselfData, toasty } from '../core/viewFunction'
import { useMainStore } from '../core/store'
const mainStore = useMainStore()
const darkMode = ref(mainStore.dark)
const props = defineProps<{
  uid: string
  type: 'following' | 'followers'
}>()
const tab = ref(0)
const myself = ref(true)
if (props.type === 'following') {
  tab.value = 0
} else {
  tab.value = 1
}
myselfData().then(data => {
  if (data.uid == props.uid) {
    myself.value = true
  } else {
    myself.value = false
  }
}).catch(err => {
  toasty("用户信息获取失败", "Error")
})
watch(() => mainStore.dark, (val) => {
  darkMode.value = val
})
function onTabPress(target: number) {
  if (tab.value != target) {
    tab.value = target;
  }
}
function onTabChange(args: any) {
  tab.value = args.value
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

  .tab {
    Label {
      color: #d0d0d0;
    }
  }
}
</style>