<template>
  <GridLayout rows="auto,*" :class="{ dark: darkMode }">
    <GridLayout rows="auto,28px,75px,32px,auto" class="top">
      <GridLayout row="0" columns="*,32px,32px,32px,32px" class="msg-icon">
        <Label col="1" text="&#xf029;" class="font-awesome-solid" />
        <Label col="2" text="&#xf53f;" class="font-awesome-solid" />
        <Label col="3" text="&#xf0f3;" class="font-awesome-solid" />
        <Label col="4" v-if="true" text="&#xf186;" class="font-awesome-solid" />
        <Label col="4" v-else text="&#xf185;" class="font-awesome-solid" />
      </GridLayout>
      <GridLayout row="2" columns="75px,*,auto" @tap="toMyZone">
        <Img col="0" :src="avatar" class="avatar" placeholderImageUri="~/assets/img/avatar-default.png" />
        <GridLayout col="1" rows="*,*">
          <Label row="0" :text="name" class="userName" />
          <StackLayout v-if="premium" row="1" horizontalAlignment="left" verticalAlignment="center" class="tip">
            <Label text="高级会员" class="vip" />
          </StackLayout>
          <StackLayout v-else row="1" horizontalAlignment="left" verticalAlignment="center" class="tip">
            <Label text="普通用户" />
          </StackLayout>
        </GridLayout>
        <StackLayout row="0" col="2" orientation="horizontal" style="opacity: 0.8;">
          <Label text="空间" />
          <Label text=" &#xf054;" class="font-awesome-solid" />
        </StackLayout>
      </GridLayout>
      <GridLayout row="4" rows="40px" columns="18px,*,*,*,18px" class="userNum">
        <StackLayout col="1" @tap="toMyPosts">
          <Label :text="posts" class="num" />
          <Label text="发布" class="label" />
        </StackLayout>
        <StackLayout col="2" style="border-color:#ffffffcc;border-left-width:1px;border-right-width:1px"
          @tap="toMyFollowing">
          <Label :text="following" class="num" />
          <Label text="关注" class="label" />
        </StackLayout>
        <StackLayout col="3" @tap="toMyFollowers">
          <Label :text="followers" class="num" />
          <Label text="粉丝" class="label" />
        </StackLayout>
      </GridLayout>
    </GridLayout>
    <ScrollView row="1">
      <StackLayout>
        <GridLayout style="margin: 28px;" columns="*,*,*,*" rows="auto,auto">
          <StackLayout col="0" row="0" class="button">
            <Label text="&#xf019;" class="font-awesome-solid icon" />
            <Label text="离线缓存" class="label" />
          </StackLayout>
          <StackLayout col="1" row="0" class="button" @tap="toHistory">
            <Label text="&#xf1da;" class="font-awesome-solid icon" />
            <Label text="历史记录" class="label" />
          </StackLayout>
          <StackLayout col="2" row="0" class="button" @tap="toFavorites">
            <Label text="&#xf005;" class="font-awesome-regular icon" />
            <Label text="我的收藏" class="label" />
          </StackLayout>
          <StackLayout col="3" row="0" class="button">
            <Label text="&#xf050;" class="font-awesome-solid icon" />
            <Label text="播放列表" class="label" />
          </StackLayout>
          <!-- 分隔线 -->
          <StackLayout col="0" row="1" class="button">
            <Label text="&#xf0e0;" class="font-awesome-regular icon" />
            <Label text="消息中心" class="label" />
          </StackLayout>
          <StackLayout col="1" row="1" class="button">
            <Label text="&#xf500;" class="font-awesome-solid icon" />
            <Label text="好友列表" class="label" />
          </StackLayout>
          <StackLayout col="2" row="1" class="button">
            <Label text="&#xf005;" class="font-awesome-solid icon" style="color: #ff5ecc;" />
            <Label text="高级会员" class="label" />
          </StackLayout>
          <StackLayout col="3" row="1" class="button">
            <Label text="&#xf51e;" class="font-awesome-solid icon" style="color: #e0b03f;" />
            <Label text="Wura" class="label" />
          </StackLayout>
        </GridLayout>
        <GridLayout columns="28px,*,28px" class="oth-button">
          <Label col="0" text="&#xf05e;" class="font-awesome-solid icon" />
          <Label col="1" text="违规记录" class="label" />
          <Label col="2" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="28px,*,28px" class="oth-button" @tap="toSetup">
          <Label col="0" text="&#xf1de;" class="font-awesome-solid icon" />
          <Label col="1" text="设置" class="label" />
          <Label col="2" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="28px,*,28px" class="oth-button">
          <Label col="0" text="&#xf24e;" class="font-awesome-solid icon" />
          <Label col="1" text="社区规则" class="label" />
          <Label col="2" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="28px,*,28px" class="oth-button">
          <Label col="0" text="&#xf0ca;" class="font-awesome-solid icon" />
          <Label col="1" text="服务条款" class="label" />
          <Label col="2" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="28px,*,28px" class="oth-button">
          <Label col="0" text="&#xf3ed;" class="font-awesome-solid icon" />
          <Label col="1" text="隐私政策" class="label" />
          <Label col="2" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="28px,*,28px" class="oth-button">
          <Label col="0" text="&#xf005;" class="font-awesome-solid icon" />
          <Label col="1" text="高级会员介绍" class="label" />
          <Label col="2" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="28px,*,28px" class="oth-button">
          <Label col="0" text="&#xf129;" class="font-awesome-solid icon" />
          <Label col="1" text="关于" class="label" />
          <Label col="2" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'nativescript-vue'
import { myselfData, toasty } from '../../core/viewFunction'
import { getFollowingList, getFollowersList, getPosts } from '../../core/api'
import { navigateTo } from "../../core/navigate"
const props = defineProps<{
  darkMode: boolean
}>()
const premium = ref<boolean>(false)
const avatar = ref<string>('')
const name = ref<string>('')
const posts = ref<number | '-'>('-')
const following = ref<number | '-'>('-')
const followers = ref<number | '-'>('-')
let uid: string | null = null
let username: string | null = null
myselfData().then(data => {
  uid = data.uid
  username = data.username
  avatar.value = data.avatar
  name.value = data.name
  premium.value = data.premium == 1
  if (uid) {
    getPosts(uid, 0, 1).then(res => {
      posts.value = res.count
    })
    getFollowingList(uid, 0, 1).then(res => {
      following.value = res.count
    })
    getFollowersList(uid, 0, 1).then(res => {
      followers.value = res.count
    })
  }
}).catch(err => {
  toasty("用户信息获取失败", "Error")
})
function toMyZone() {
  if (uid) {
    navigateTo('/zone', {
      uid: uid,
      username: username
    })
  }
}
function toMyPosts() {
  if (uid) {
    navigateTo('/zone', {
      uid: uid,
      username: username,
      type: 'posts'
    })
  }
}
function toMyFollowing() {
  if (uid) {
    navigateTo('/friends', {
      uid: uid,
      type: 'following'
    })
  }
}
function toMyFollowers() {
  if (uid) {
    navigateTo('/friends', {
      uid: uid,
      type: 'followers'
    })
  }
}
function toHistory() {
  if (uid) {
    navigateTo('/history')
  }
}
function toFavorites() {
  navigateTo('/favorites')
}
function toSetup() {
  navigateTo('/setup')
}
</script>
<style lang="scss" scoped>
.top {
  background-color: #00796B;
  color: #fff;
  padding: 40px;
  padding-top: 20px;

  .msg-icon {
    font-size: 18px;
    opacity: 0.9;
    text-align: center;
  }

  .avatar {
    border-radius: 50%;
  }

  .userName {
    font-size: 24px;
    padding: 0 32px;
  }

  .tip {
    padding: 0 32px;

    Label {
      font-size: 10px;
      color: #ffffffcc;
      border-color: #ffffffcc;
      border-width: 2px;
      border-radius: 8px;
      height: 48px;
      width: 130px;
      text-align: center;
    }

    .vip {
      color: #ffffff;
      background-color: #ff5ecc;
      border-radius: 50%;
      width: 160px;
    }
  }

  .userNum {
    text-align: center;

    .num {
      font-size: 18px;
    }

    .label {
      font-size: 14px;
      opacity: 0.8;
    }
  }
}

.button {
  text-align: center;
  padding: 48px 0;

  .icon {
    font-size: 24px;
    color: #00796B;
  }

  .label {
    font-size: 14px;
    padding: 20px 0;
  }
}

.oth-button {
  padding: 36px 60px;

  .icon {
    font-size: 18px;
    text-align: center;
    color: #00796B;
  }

  .label {
    font-size: 16px;
    padding: 0 20px;
  }

  .arrow {
    text-align: center;
  }
}

.dark {
  .top {
    background-color: #00796B;
    color: #fff;

    .tip {
      Label {
        color: #ffffffcc;
        border-color: #ffffffcc;
      }

      .vip {
        color: #ffffff;
        background-color: #ff5ecc;
      }
    }
  }

  .button {
    .icon {
      color: #00796B;
    }

    .label {
      color: #d0d0d0;
    }
  }

  .oth-button {
    .icon {
      color: #00796B;
    }

    .label {
      color: #d0d0d0;
    }
  }
}
</style>