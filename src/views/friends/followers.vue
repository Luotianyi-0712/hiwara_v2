<template>
  <GridLayout rows="*" :class="{ 'visible': onloaded && !loadError, 'hidden': !onloaded || loadError, dark: darkMode }">
    <ListView row="1" v-if="data.length > 0" :items="data" @loadMoreItems="nextPage" class="publish">
      <template #default="{ item, index }">
        <GridLayout columns="76px,*,100px" rows="8px,32px,28px,8px" class="item"
          @tap="toUserZone(item.uid, item.username)">
          <GridLayout col="0" row="0" rowSpan="4" columns="10px,56px,10px" rows="10px,56px,10px">
            <Img col="1" row="1" :src="item.avatar" class="avatar" :placeholderImageUri="getPlaceholderImageUri()" />
          </GridLayout>
          <Label col="1" row="1" :text="item.name" class="name" />
          <Label col="1" row="2" :text="'@' + item.username" class="userid" />
          <GridLayout col="2" row="0" rowSpan="4" columns="10px,80px,10px" rows="*,auto,*">
            <Button v-if="!myself" col="1" row="1" :text="item.following ? '已关注' : '关注'"
              @tap="followersButtonTap(item.uid, index)" />
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
import errorImg from '../components/errorImg.vue'
import noContent from '../components/noContent.vue'
import { ref, watch, defineProps } from 'nativescript-vue'
import { getFollowersList, followers, disFollowers } from '../../core/api'
import { toasty } from '../../core/viewFunction'
import { navigateTo } from "../../core/navigate"
const props = defineProps<{
  uid: string
  myself: boolean
  darkMode: boolean
}>()
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
getData().then(res => {
  if (res) {
    data.value = res
  }
}).catch(err => {
  loadError.value = true
}).finally(() => {
  onloaded.value = true
})
function getData(): Promise<Item[] | null> {
  return new Promise((resolve, reject) => {
    if (!isLoading.value) {
      isLoading.value = true
      getFollowersList(props.uid, page, 32).then(res => {
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
        if (res.length > 0) {
          data.value = data.value.concat(res)
        } else {
          isEnd = true
        }
      }
    })
  }
}
function followersButtonTap(uid: string, index: number) {
  if (data.value[index].following) {
    // 已关注
    data.value[index].following = false
    disFollowers(uid).catch((err) => {
      data.value[index].following = true
      toasty('操作失败了喵~', 'Error')
    })
  } else {
    // 未关注
    data.value[index].following = true
    followers(uid).catch((err) => {
      data.value[index].following = false
      toasty('操作失败了喵~', 'Error')
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
function getPlaceholderImageUri() {
  if (props.darkMode) {
    return '~/assets/img/avatar-default-dark.png'
  } else {
    return '~/assets/img/avatar-default.png'
  }
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

Button {
  background-color: #00796B;
  color: #f0f0f0;
}

.dark {
  .item {
    .name {
      color: #f0f0f0;
    }

    .userid {
      color: #d0d0d0;
    }
  }
}
</style>