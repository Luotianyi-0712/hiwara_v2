<template>
  <Page actionBarHidden="true">
    <GridLayout columns="10px,*,10px" rows="*,auto,2*,auto" @tap="blurAllTextField">
      <StackLayout col="1" row="1" class="loginInput">
        <Label text="登录到你的iwara账号" class="title" />
        <TextField ref="userInput" v-model="userValue" hint="请输入账号" keyboardType="email" class="input"
          :isEnabled="!loginIng" />
        <TextField ref="passwdInput" v-model="passwdValue" hint="请输入密码" secure="true" class="input"
          :isEnabled="!loginIng" />
        <Button :text="loginIng ? '登录中' : '登录'" @tap="submit" class="button" :isEnabled="!loginIng" />
      </StackLayout>
      <StackLayout col="1" row="3" class="bottom">
        <Label text="内容源自iwara.tv，本程序禁止用于商业用途" />
        <Label text="©2019-2024 Maoerxiachuan" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>
<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { toasty } from '../core/viewFunction'
import { login } from '../core/api'
import { getUserPasswd, saveUserToken } from '../core/database'
import { $navigateTo } from "nativescript-vue"
import home from "../views/home.vue";

const userInput = ref()
const passwdInput = ref()
const userValue = ref('')
const passwdValue = ref('')
const loginIng = ref(false)

getUserPasswd().then(res => {
  if (res.username) {
    userValue.value = res.username
  }
  if (res.passwd) {
    passwdValue.value = res.passwd
  }
})
function blurAllTextField() {
  userInput.value.nativeView.dismissSoftInput()
  passwdInput.value.nativeView.dismissSoftInput()
}
function submit() {
  loginIng.value = true
  blurAllTextField()
  let text: string[] = []
  if (userValue.value.length > 0 && passwdValue.value.length > 0) {
    login(userValue.value, passwdValue.value).then(res => {
      if (res.status == 200) {
        toasty('登录成功', "Success")
        saveUserToken(userValue.value, passwdValue.value, res.data.token)
        $navigateTo(home, {
          clearHistory: true,
          transition: {
            name: "slideLeft",
            curve: "easeIn"
          }
        })
      } else {
        toasty('用户名或密码不正确', "Error")
        loginIng.value = false
      }
    }).catch(err => {
      console.log(err)
      toasty('登录失败，请稍后再试', "Error")
      loginIng.value = false
    })
  } else {
    if (userValue.value.length === 0) {
      text.push('账号不能为空')
    }
    if (passwdValue.value.length === 0) {
      text.push('密码不能为空')
    }
    toasty(text.join('\n'), "Error")
    loginIng.value = false
  }
}
</script>
<style scoped lang="scss">
.loginInput {
  .title {
    font-size: 22px;
    color: #000;
    padding: 20px 10px;
  }

  .input {
    margin: 20px 5px;
  }

  .button {
    margin: 20px 0;
  }
}

.bottom {
  font-size: 14px;
  padding: 24px;

  Label {
    text-align: center;
  }
}
</style>