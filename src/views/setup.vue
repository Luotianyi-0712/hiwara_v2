<template>
  <Page>
    <ActionBar>
      <GridLayout columns="32px,auto,*" class="topBar">
        <Label col="0" text="&#xf104;" class="font-awesome-solid" @tap="navigateBack" />
        <Label col="1" text="设置" />
      </GridLayout>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <GridLayout columns="*,auto" rows="48px" class="button">
          <Label col="0" text="自动播放" class="label" />
          <GridLayout col="1" style="padding: 0 16px;">
            <Switch :checked="autoplay" @checkedChange="autoplayChange" />
          </GridLayout>
        </GridLayout>
        <GridLayout columns="*,auto,auto" rows="48px" class="button" @tap="toDefinition">
          <Label col="0" text="默认清晰度" class="label" />
          <Label col="1" :text="parseDefinitionLabel(definition)" />
          <Label col="2" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="*,auto,auto" rows="48px" class="button" @tap="toSearchMode">
          <Label col="0" text="默认搜索模式" class="label" />
          <Label col="1" :text="parseSearchModeLabel(searchMode)" />
          <Label col="2" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="*,auto" rows="48px" class="button" @tap="toDownloadPath">
          <Label col="0" text="缓存目录" class="label" />
          <Label col="1" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="*,auto" rows="48px" class="button" @tap="toAria">
          <Label col="0" text="Aria2推送设置" class="label" />
          <Label col="1" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="*,auto,auto" rows="48px" class="button" @tap="toLanguage">
          <Label col="0" text="语言(Language)" class="label" />
          <Label col="1" :text="parseLanguageLabel(language)" />
          <Label col="2" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="*,auto,auto" rows="48px" class="button" @tap="appInfoToSystem">
          <Label col="0" text="清除缓存" class="label" />
          <Label col="1" text="前往清除" />
          <Label col="2" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="*,auto" rows="48px" class="button" @tap="logout">
          <Label col="0" text="退出登录" class="label" />
          <Label col="1" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script lang="ts" setup>
import { navigateBack, navigateReload } from '../core/navigate'
import { ref, $navigateTo } from 'nativescript-vue'
import { getConfig, changeAutoplay, removeLogout } from '../core/database'
import { parseDefinitionLabel, parseLanguageLabel, toasty } from '../core/viewFunction'
import { Dialogs, isAndroid, isIOS, Application } from '@nativescript/core'
import definitionVue from './setup/definition.vue'
import searchModeVue from './setup/searchMode.vue'
import downloadVue from './setup/download.vue'
import ariaVue from './setup/aria2.vue'
import languageVue from './setup/language.vue'
const autoplay = ref<boolean>(false)
const definition = ref<string>('-')
const searchMode = ref<number>(0)
const language = ref<string>('-')
flush()
function flush() {
  getConfig().then(data => {
    console.log(data)
    autoplay.value = Boolean(data.autoplay)
    definition.value = data.definition
    searchMode.value = data.searchMode
    language.value = data.language
  })
}
function autoplayChange(args: any) {
  autoplay.value = args.value
  changeAutoplay(autoplay.value)
}
function toDefinition() {
  const back = () => {
    flush()
  }
  $navigateTo(definitionVue, {
    props: {
      back: back
    },
    transition: {
      name: "slideLeft",
      curve: "easeIn"
    }
  })
}
function toSearchMode() {
  const back = () => {
    flush()
  }
  $navigateTo(searchModeVue, {
    props: {
      back: back
    },
    transition: {
      name: "slideLeft",
      curve: "easeIn"
    }
  })
}
function toDownloadPath() {
  $navigateTo(downloadVue, {
    transition: {
      name: "slideLeft",
      curve: "easeIn"
    }
  })
}
function toAria() {
  $navigateTo(ariaVue, {
    transition: {
      name: "slideLeft",
      curve: "easeIn"
    }
  })
}
function toLanguage() {
  const back = () => {
    flush()
  }
  $navigateTo(languageVue, {
    props: {
      back: back
    },
    transition: {
      name: "slideLeft",
      curve: "easeIn"
    }
  })
}
function appInfoToSystem() {
  if (isAndroid) {
    const context = Application.android.foregroundActivity || Application.android.nativeApp;
    const intent = new android.content.Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
    intent.addCategory(android.content.Intent.CATEGORY_DEFAULT);
    intent.setData(android.net.Uri.parse("package:" + context.getPackageName()));
    context.startActivity(intent);
  }
}
function logout() {
  Dialogs.confirm({
    title: '退出登录',
    message: '你确定要退出登录？',
    okButtonText: '是',
    cancelButtonText: '否',
    neutralButtonText: '返回',
  }).then((result) => {
    if (result) {
      toasty('已退出登录')
      removeLogout().then(() => {
        navigateReload()
      })
    }
  })
}
function parseSearchModeLabel(val: number) {
  switch (val) {
    case 0: return '关键词搜索'
    case 1: return '标签搜索'
    default: return '-'
  }
}
</script>
<style scoped lang="scss">
.topBar {
  color: #ffffff;
  font-size: 18px;
}

.tab {
  .tab-bar {
    background-color: #00796B;
    height: 8px;
    border-radius: 50%;
    width: 100px;
  }

  border-bottom-width: 1px;
  border-color: #c0c0c0;
}

.button {
  border-bottom-width: 1px;
  border-color: #c0c0c0;

  .label {
    font-size: 14px;
    padding: 0 40px;
    color: #424242;
  }

  .arrow {
    padding: 0 40px;
  }
}
</style>