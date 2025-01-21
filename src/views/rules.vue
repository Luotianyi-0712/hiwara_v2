<template>
  <Page :class="{ dark: darkMode }">
    <ActionBar>
      <GridLayout columns="32px,auto,*,auto" class="topBar">
        <Label col="0" text="&#xf104;" class="font-awesome-solid" @tap="navigateBack" />
        <Label col="1" text="社区规则" />
        <Label col="3" text="切换语言" class="lang" />
      </GridLayout>
    </ActionBar>
    <ScrollView>
      <StackLayout class="context">
        <StackLayout v-for="(item, index) in textEn" v-if="lang === 'en'">
          <Label :text="item.title" class="title" />
          <Markdown :markdown="item.body"></Markdown>
        </StackLayout>
        <StackLayout v-for="(item, index) in textJa" v-if="lang === 'ja'">
          <Label :text="item.title" class="title" />
          <Markdown :markdown="item.body"></Markdown>
        </StackLayout>
        <StackLayout v-for="(item, index) in textZh" v-if="lang === 'zh'">
          <Label :text="item.title" class="title" />
          <Markdown :markdown="item.body"></Markdown>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script lang="ts" setup>
import { getRules } from '../core/api'
import { navigateBack } from '../core/navigate'
import { ref, watch } from 'nativescript-vue'
import { useMainStore } from '../core/store'
interface TextItem {
  title: string
  body: string
}
const textEn = ref<TextItem[]>([])
const textJa = ref<TextItem[]>([])
const textZh = ref<TextItem[]>([])
const lang = ref('zh')
const mainStore = useMainStore()
const darkMode = ref(mainStore.dark)
watch(() => mainStore.dark, (val) => {
  darkMode.value = val
})
getRules().then((res) => {
  for (let i = 0; i < res.results.length; i++) {
    textEn.value.push({
      title: res.results[i].title.en,
      body: res.results[i].body.en.replace(/\|/g, '')
        .replace(/:---:/g, '')
        .replace(/https:\/\/www\.iwara\.tv\/profile\//g, '')
    })
    textJa.value.push({
      title: res.results[i].title.ja,
      body: res.results[i].body.ja.replace(/\|/g, '')
        .replace(/:---:/g, '')
        .replace(/https:\/\/www\.iwara\.tv\/profile\//g, '')
    })
    textZh.value.push({
      title: res.results[i].title.zh,
      body: res.results[i].body.zh.replace(/\|/g, '')
        .replace(/:---:/g, '')
        .replace(/https:\/\/www\.iwara\.tv\/profile\//g, '')
    })
  }
})
</script>
<style scoped lang="scss">
.topBar {
  color: #ffffff;
  font-size: 18px;
  .lang{
    font-size: 14px;
    margin-right: 40px;
  }
}

.context {
  padding: 0 40px 40px 40px;
  color: #424242;
}

.title {
  font-size: 22px;
  color: #232323;
  padding: 40px 0;
}

.hidden {
  opacity: 0;
}

.visible {
  animation-name: animeVisible;
  animation-duration: 100ms;
  animation-fill-mode: forwards;
}

@keyframes animeVisible {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.dark {
  background-color: #0d0d0d;
  color: #d0d0d0;
}
</style>