<template>
  <GridLayout rows="auto,*">
    <GridLayout rows="auto,75px,20px,auto" class="top">
      <GridLayout row="0" columns="*,32px,32px,32px,32px" class="msg-icon">
        <Label col="1" text="&#xf029;" class="font-awesome-solid" />
        <Label col="2" text="&#xf53f;" class="font-awesome-solid" />
        <Label col="3" text="&#xf0f3;" class="font-awesome-solid" />
        <Label col="4" v-if="true" text="&#xf186;" class="font-awesome-solid" />
        <Label col="4" v-else text="&#xf185;" class="font-awesome-solid" />
      </GridLayout>
      <GridLayout row="1" columns="75px,*,auto" @tap="toMyZone">
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
      <GridLayout row="3" rows="40px" columns="30px,*,*,*,30px" style="text-align: center;">
        <StackLayout col="1">
          <Label :text="posts" style="font-size: 16px;" />
          <Label text="动态" style="font-size: 12px;opacity: 0.8;" />
        </StackLayout>
        <StackLayout col="2" style="border-color:#ffffffcc;border-left-width:1px;border-right-width:1px"
          @tap="toMyFollowing">
          <Label :text="following" style="font-size: 16px;" />
          <Label text="关注" style="font-size: 12px;opacity: 0.8;" />
        </StackLayout>
        <StackLayout col="3" @tap="toMyFollowers">
          <Label :text="followers" style="font-size: 16px;" />
          <Label text="粉丝" style="font-size: 12px;opacity: 0.8;" />
        </StackLayout>
      </GridLayout>
    </GridLayout>
    <ScrollView row="1">
      <StackLayout>
        <GridLayout style="margin: 40px 0;" columns="*,*,*,*" rows="auto,auto">
          <StackLayout col="0" row="0" class="button">
            <Label text="&#xf019;" class="font-awesome-solid icon" />
            <Label text="离线缓存" class="label" />
          </StackLayout>
          <StackLayout col="1" row="0" class="button" @tap="toHistory">
            <Label text="&#xf1da;" class="font-awesome-solid icon" />
            <Label text="历史记录" class="label" />
          </StackLayout>
          <StackLayout col="2" row="0" class="button">
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
        <GridLayout columns="28px,*,28px" class="oth-button">
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
import { ref } from 'nativescript-vue'
import { myselfData, toasty } from '../../core/viewFunction'
import { getFollowingList, getFollowersList, getPosts } from '../../core/api'
import { navigateTo } from "../../core/navigate"
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
    font-size: 20px;
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


}

.button {
  text-align: center;
  padding: 26px 0;

  .icon {
    font-size: 20px;
    color: #00796B;
  }

  .label {
    font-size: 14px;
    padding: 10px 0;
  }
}

.oth-button {
  padding: 20px 60px;

  .icon {
    font-size: 18px;
    text-align: center;
    color: #00796B;
  }

  .label {
    font-size: 14px;
    padding: 0 20px;
  }

  .arrow {
    text-align: center;
  }
}
</style>