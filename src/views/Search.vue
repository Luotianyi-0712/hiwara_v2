<template>
  <Page>
    <ActionBar>
      <GridLayout rows="*" columns="24px,*,60px" class="topBar">
        <Label col="0" text="&#xf104;" class="font-awesome-solid" @tap="navigateBack" />
        <StackLayout col="1" orientation="horizontal" class="search-bg">
          <Label v-if="iconHint" text="输入搜索内容" />
        </StackLayout>
        <SearchBar v-model="query" ref="searchInput" @submit="submit()" @clear="clear" col="1" class="search-input" />
        <Label col="2" text="搜索" class="submitBtn" @tap="submit()" />
      </GridLayout>
    </ActionBar>
    <GridLayout rows="*">
      <GridLayout row="0" rows="auto,*" v-show="action">
        <GridLayout row="0" rows="35px,3px" columns="*,*,*" class="tab">
          <Label text="视频" row="0" col="0" @tap="onTabPress(0)" textAlignment="center" />
          <Label text="图片" row="0" col="1" @tap="onTabPress(1)" textAlignment="center" />
          <Label text="用户" row="0" col="2" @tap="onTabPress(2)" textAlignment="center" />
          <StackLayout row="1" col="0" class="tab-bar" :class="{ 'hidden': tab != 0, 'visible': tab == 0 }">
          </StackLayout>
          <StackLayout row="1" col="1" class="tab-bar" :class="{ 'hidden': tab != 1, 'visible': tab == 1 }">
          </StackLayout>
          <StackLayout row="1" col="2" class="tab-bar" :class="{ 'hidden': tab != 2, 'visible': tab == 2 }">
          </StackLayout>
        </GridLayout>
        <Pager row="1" col="0" colSpan="2" :selectedIndex="tab" @selectedIndexChange="onTabChange">
          <PagerItem>
            <GridLayout rows="*">
              <videoList ref="videoListRef" />
            </GridLayout>
          </PagerItem>
          <PagerItem>
            <GridLayout rows="*">
              <imageList ref="imageListRef" />
            </GridLayout>
          </PagerItem>
          <PagerItem>
            <GridLayout rows="*">
              <users ref="userListRef" />
            </GridLayout>
          </PagerItem>
        </Pager>
      </GridLayout>
      <StackLayout row="0" v-show="!action" class="previewSearch">
        <Label text="历史搜索" class="title" />
        <WrapLayout class="tags">
          <Label v-for="item in searchHistory" :text="item" @tap="submit(item)" />
        </WrapLayout>
        <Label text="搜索发现" class="title" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>
<script lang="ts" setup>
import videoList from './search/video.vue'
import imageList from './search/image.vue'
import users from './search/users.vue'
import { ref, watch } from 'nativescript-vue'
import { navigateBack } from '../core/navigate'
import { addSearchHistory, getSearchHistory } from '../core/database'
const iconHint = ref<boolean>(true)
const tab = ref(0)
const action = ref(false)
const searchHistory = ref<string[]>([])
const searchInput = ref()
const videoListRef = ref()
const imageListRef = ref()
const userListRef = ref()
const query = ref('')
getHistory()
watch(tab, val => {
  if (query.value.length > 0) {
    switch (val) {
      case 0:
        videoListRef.value.search(query.value)
        break
      case 1:
        imageListRef.value.search(query.value)
        break
      case 2:
        userListRef.value.search(query.value)
        break
      case 3:
        break
      case 4:
        break
      default:
        break
    }
    action.value = true
    addSearchHistory(query.value).then(() => {
      getHistory()
    }).catch(err => {
      console.error(err)
    })
  }
})
watch(query, val => {
  if (val.length > 0) {
    iconHint.value = false
  } else {
    iconHint.value = true
  }
})
function submit(text?: string) {
  blurAllTextField()
  if (text) {
    query.value = text
  }
  if (query.value.length > 0) {
    switch (tab.value) {
      case 0:
        videoListRef.value.search(query.value)
        break
      case 1:
        imageListRef.value.search(query.value)
        break
      case 2:
        userListRef.value.search(query.value)
        break
      case 3:
        break
      case 4:
        break
      default:
        break
    }
    action.value = true
    addSearchHistory(query.value).then(() => {
      getHistory()
    }).catch(err => {
      console.error(err)
    })
  }
}
function clear() {
  action.value = false
}
function onTabPress(target: number) {
  if (tab.value != target) {
    tab.value = target;
  }
}
function onTabChange(args: any) {
  tab.value = args.value
}
function blurAllTextField() {
  console.log('blurAllTextField')
  searchInput.value.nativeView.dismissSoftInput()
}
function getHistory() {
  getSearchHistory().then(res => {
    let list: string[] = []
    for (let i = 0; i < res.length; i++) {
      list.push(res[i].text)
    }
    searchHistory.value = list
    console.log(list)
  })
}
</script>
<style scoped lang="scss">
.topBar {
  color: #ffffff;
  font-size: 18px;

  .search-bg {
    background-color: #fff;
    border-radius: 50%;
    padding: 0 40;
    font-size: 14;
    height: 90px;
    color: #484848;
  }

  .search-input {
    font-size: 14;
    border: none;
    background-color: #0000 !important;
    color: #484848;
  }

  .submitBtn {
    text-align: center;
    font-size: 16px;
  }
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

.previewSearch {
  padding: 20px;
  font-weight: bold;

  .title {
    color: #262626;
    font-size: 14px;
  }

  .tags {
    padding: 10px 0;

    Label {
      padding: 10px 20px;
      margin: 10px;
      border-radius: 10px;
      background-color: #e0e0e0;
    }
  }
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
</style>