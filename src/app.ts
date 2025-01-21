import { createApp, registerElement } from 'nativescript-vue'
import App from './app.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

import { initialize, Img } from "@nativescript-community/ui-image"
initialize({ isDownsampleEnabled: true })
registerElement('Img', () => Img)

import { Video } from 'nativescript-videoplayer'
registerElement('VideoPlayer', () => Video)

import { Pager, PagerItem } from '@nativescript-community/ui-pager'
registerElement('Pager', () => Pager)
registerElement('PagerItem', () => PagerItem)

import { Markdown } from '@dev4ndy/markdown'
registerElement('Markdown', () => Markdown)

import DrawerPlugin from '@nativescript-community/ui-drawer/vue3'
app.use(DrawerPlugin)

import { Application, isAndroid } from '@nativescript/core'
import { useMainStore } from './core/store'
const mainStore = useMainStore()
function changeDarkModeStatus(val: boolean) {
  mainStore.changeDarkModeStatus(val)
}
if (isAndroid) {
  let componentCallbacks: android.content.ComponentCallbacks2;
  // 创建并注册 ComponentCallbacks2 实例
  const registerNightModeListener = () => {
    componentCallbacks = new android.content.ComponentCallbacks2({
      onConfigurationChanged: (newConfig: android.content.res.Configuration) => {
        if (newConfig.uiMode !== undefined) {
          const nightModeFlags = newConfig.uiMode & android.content.res.Configuration.UI_MODE_NIGHT_MASK;
          switch (nightModeFlags) {
            case android.content.res.Configuration.UI_MODE_NIGHT_YES:
              console.log("Night mode is on");
              // 处理夜间模式开启的情况
              changeDarkModeStatus(true)
              break;
            case android.content.res.Configuration.UI_MODE_NIGHT_NO:
              console.log("Night mode is off");
              // 处理夜间模式关闭的情况
              changeDarkModeStatus(false)
              break;
          }
        }
      },
      onLowMemory: () => {
        // 处理低内存情况
      },
      onTrimMemory: (level: number) => {
        // 处理内存修剪情况
      }
    });
    // 获取当前的 Application 上下文并注册回调
    const context = Application.android.nativeApp;
    if (context) {
      context.registerComponentCallbacks(componentCallbacks);
    } else {
      console.error("Application context is undefined");
    }
  };
  Application.on(Application.android.activityCreatedEvent, (args: any) => {
    const currentNightMode = args.activity.getResources().getConfiguration().uiMode & android.content.res.Configuration.UI_MODE_NIGHT_MASK;
    changeDarkModeStatus(currentNightMode === android.content.res.Configuration.UI_MODE_NIGHT_YES);
  })
  // 监听应用启动事件
  Application.on(Application.launchEvent, (args: any) => {
    registerNightModeListener();
  });
  // 确保在应用退出时注销回调
  Application.on(Application.exitEvent, () => {
    if (componentCallbacks) {
      const context = Application.android.nativeApp;
      if (context) {
        context.unregisterComponentCallbacks(componentCallbacks);
      } else {
        console.error("Application context is undefined");
      }
    }
  });
}

app.start()
