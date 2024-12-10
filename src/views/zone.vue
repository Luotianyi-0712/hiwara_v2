<template>
  <Page actionBarHidden="true">
    <GridLayout rows="auto, *">
      <GridLayout row="0" rowSpan="2" rows="60px,30px,90px,*">
        <GridLayout row="0" rowSpan="2" style="background-color:#00796B;"></GridLayout>
        <GridLayout row="1" rowSpan="2" columns="100px,*" style="padding: 0 40px;">
          <GridLayout col="0" rows="100px,*">
            <Img row="0" :src="avatar" class="avatar" placeholderImageUri="~/assets/img/avatar-default.png" />
          </GridLayout>
          <GridLayout col="1" rows="30px,4px,auto,4px,*" style="padding-left: 40px;">
            <GridLayout col="1" row="2" columns="*,*,*" style="text-align: center;">
              <StackLayout col="0">
                <Label text="123" style="font-size: 16px;" />
                <Label text="动态" style="font-size: 12px;opacity: 0.8;" />
              </StackLayout>
              <StackLayout col="1" style="border-color:#000000cc;border-left-width:1px;border-right-width:1px">
                <Label text="123" style="font-size: 16px;" />
                <Label text="关注" style="font-size: 12px;opacity: 0.8;" />
              </StackLayout>
              <StackLayout col="2">
                <Label text="123" style="font-size: 16px;" />
                <Label text="粉丝" style="font-size: 12px;opacity: 0.8;" />
              </StackLayout>
            </GridLayout>
            <Button col="1" row="4" text="关注" />
          </GridLayout>
        </GridLayout>
        <StackLayout row="3" style="padding:0 40px;">
          <StackLayout orientation="horizontal">
            <Label :text="uname" class="userName" />
            <StackLayout verticalAlignment="center" >
              <Label text="高级会员" class="vip" />
            </StackLayout>
          </StackLayout>
        </StackLayout>
      </GridLayout>
      <StackLayout col="0" row="0" orientation="horizontal" style="padding: 0 10px;">
        <Label text="&#xf104;" class="font-awesome-solid back-icon" @tap="navigateBack" />
        <Label text="&#xf80b;" class="font-awesome-solid back-icon" @tap="navigateBackHome" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'nativescript-vue'
import { getZoneUserData } from '../core/api'
import { navigateBack, navigateBackHome } from '../core/navigate'
import { toasty } from '../core/viewFunction'
const props = defineProps<{
  uid: string
  username: string
}>()
const avatar = ref('')
const uname = ref('')
getZoneUserData(props.username).then(data => {
  console.log(data)
  avatar.value = data.avatar
  uname.value = data.name
}).catch(err => {
  console.log(err)
  toasty("用户信息获取失败", "Error")
})
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
}

.vip {
  color: #ffffff;
  background-color: #ff5ecc;
  border-radius: 50%;
  padding: 4px 20px;
  font-size: 12px;
  margin-left: 20px;
}
</style>