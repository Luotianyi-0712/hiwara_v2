import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      // 定义状态
      dark: false
    }
  },
  actions: {
    // 定义 actions，可以包含异步操作
    changeDarkModeStatus(value: boolean) {
      this.dark = value
    }
  }
})