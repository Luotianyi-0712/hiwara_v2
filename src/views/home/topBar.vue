<template>
  <GridLayout class="navigation-bar" columns="auto,*,auto" :class="{ dark: darkMode }">
    <GridLayout col="0" class="user-button" @tap="toggleMy">
      <Img :src="avatar" class="img" placeholderImageUri="~/assets/img/avatar-default.png" />
    </GridLayout>
    <GridLayout col="1" @tap="toSearch">
      <StackLayout orientation="horizontal" class="search-input">
        <Label text="&#x1f50d; " class="font-awesome-solid" />
        <Label text="搜索" />
      </StackLayout>
    </GridLayout>
    <Label col="2" text="Hiwara" class="logo-text" />
  </GridLayout>
</template>
<script lang="ts" setup>
import { ref, watch, inject } from "nativescript-vue"
import { navigateTo } from "../../core/navigate"
import { toasty, myselfData } from '../../core/viewFunction'
import { useMainStore } from '../../core/store'
const mainStore = useMainStore()
const darkMode = ref(mainStore.dark)
const avatar = ref<string>('')
const toggleMy = inject<(payload: any) => void>('toggleMy')
myselfData().then(data => {
  avatar.value = data.avatar
}).catch(err => {
  toasty("用户信息获取失败", "Error")
})
watch(() => mainStore.dark, (val) => {
  darkMode.value = val
})
function toSearch() {
  navigateTo("/search");
}
</script>
<style lang="scss" scoped>
.navigation-bar {
  color: #fff;
  background-color: #00796B;

  .user-button {
    margin: 0 20px;

    .img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
  }

  .search-input {
    background-color: #fff;
    border-radius: 50%;
    padding: 0 20;
    font-size: 14;
    height: 90px;
    color: #484848;
  }

  .logo-text {
    font-family: "&eåeLOGO", "riwenlogo";
    font-weight: 400;
    font-size: 14px;
    margin: 0 20px;
    text-shadow: 1px 1px 4px #00000080;
  }
}

.dark {
  .navigation-bar {
    .search-input {
      background-color: #0d0d0d;
      color: #d0d0d0;
    }
  }
}
</style>