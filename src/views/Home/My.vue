<template>
  <GridLayout rows="auto,*">
    <GridLayout rows="auto,auto,20px,auto" class="top">
      <GridLayout row="0" columns="*,32px,32px,32px,32px" class="msg-icon">
        <Label col="1" text="&#xf029;" class="font-awesome-solid" />
        <Label col="2" text="&#xf53f;" class="font-awesome-solid" />
        <Label col="3" text="&#xf0f3;" class="font-awesome-solid" />
        <Label col="4" v-if="true" text="&#xf186;" class="font-awesome-solid" />
        <Label col="4" v-else text="&#xf185;" class="font-awesome-solid" />
      </GridLayout>
      <GridLayout row="1" rows="auto,4px,auto" columns="auto, *,auto">
        <Img col="0" row="0" rowSpan="3" :src="avatar" class="avatar"
          placeholderImageUri="~/assets/img/avatar-default.png" />
        <Label col="1" row="0" text="My Name" class="userName" />
        <GridLayout v-if="true" col="1" row="2" columns="auto,*">
          <GridLayout columns="auto,auto" class="tip vip">
            <Label col="0" text="&#xf005; " class="font-awesome-solid" style="color: #ff5ecc;" />
            <Label col="1" text="高级会员" />
          </GridLayout>
        </GridLayout>
        <GridLayout v-else col="1" row="2" columns="auto,*">
          <Label col="0" text="普通用户" class="tip" />
        </GridLayout>
        <StackLayout row="0" rowSpan="3" col="2" orientation="horizontal" style="opacity: 0.8;">
          <Label text="空间" />
          <Label text=" &#xf054;" class="font-awesome-solid" />
        </StackLayout>
      </GridLayout>
      <GridLayout row="3" rows="40px" columns="30px,*,*,*,30px" style="text-align: center;">
        <StackLayout col="1">
          <Label text="123" style="font-size: 16px;" />
          <Label text="动态" style="font-size: 12px;opacity: 0.8;" />
        </StackLayout>
        <StackLayout col="2" style="border-color:#ffffffcc;border-left-width:1px;border-right-width:1px">
          <Label text="123" style="font-size: 16px;" />
          <Label text="关注" style="font-size: 12px;opacity: 0.8;" />
        </StackLayout>
        <StackLayout col="3">
          <Label text="123" style="font-size: 16px;" />
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
          <StackLayout col="1" row="0" class="button">
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
const avatar = ref('https://avatars.githubusercontent.com/u/39371540?v=4')
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
    width: 140px;
    border-radius: 50%;
  }

  .userName {
    font-size: 18px;
    padding: 0 32px;
  }

  .tip {
    font-size: 10px;
    margin-left: 32px;
    padding: 2px 8px;
    opacity: 0.8;
    border-color: #fff;
    border-width: 3px;
    border-radius: 8px;
  }
  .vip{
    opacity: 1 !important;
    color: #ff5ecc;
    font-weight: bold;
    border-width: 4px;
    border-color: #ff5ecc;
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