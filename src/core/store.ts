import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      // 定义状态
      asd: 1,
      dark: false
    }
  },
  actions: {
    // 定义 actions，可以包含异步操作
    setAsd(value: number) {
      this.asd = value
    },
    changeDarkModeStatus(value: boolean) {
      this.dark = value
    }
  }
})