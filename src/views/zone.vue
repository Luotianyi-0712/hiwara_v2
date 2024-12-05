<template>
  <Page actionBarHidden="true">
    <GridLayout rows="auto, *">
      <GridLayout row="0" rowSpan="2" rows="60px,30px,70px, *">
        <GridLayout row="0" rowSpan="2" style="background-color:#00796B;"></GridLayout>
        <GridLayout row="1" rowSpan="2" columns="100px,*" style="padding: 0 60px;">
          <Img :src="avatar" class="avatar" placeholderImageUri="~/assets/img/avatar-default.png" />
        </GridLayout>
        <GridLayout row="2" rows="auto,*">
        </GridLayout>
        <GridLayout row="3" rows="auto,*">
          <Label row="0" :text="username" />
        </GridLayout>
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
getZoneUserData(props.username).then(data => {
  console.log(data)
  avatar.value = data.avatar
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
</style>