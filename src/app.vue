<template>
  <Frame>
    <Page actionBarHidden="true">
    </Page>
  </Frame>
</template>
<script lang="ts" setup>
import { $navigateTo } from "nativescript-vue"
import { getUserToken } from './core/database'
import { isTokenValid } from './core/viewFunction'
const home = () => import('./views/home.vue')
const login = () => import('./views/login.vue')
// 初始化数据库
getUserToken().then(res => {
  if (isTokenValid(res)) {
    console.log('已登录')
    home().then(res => {
      $navigateTo(res.default, {
        clearHistory: true
      })
    })
  } else {
    console.log('未登录')
    login().then(res => {
      $navigateTo(res.default, {
        clearHistory: true
      })
    })
  }
}).catch(err => {
  console.log(err)
})
</script>
<style scoped lang="scss"></style>
