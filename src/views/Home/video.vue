<template>
  <GridLayout rows="60px,auto,auto,*">
    <topBar row="0" />
    <GridLayout row="1" rows="35px,3px" columns="8px,*,*,*,*,*,36px,8px" class="tab">
      <Label text="最新" row="0" col="1" @tap="onTabPress(0)" textAlignment="center" />
      <Label text="流行" row="0" col="2" @tap="onTabPress(1)" textAlignment="center" />
      <Label text="人气" row="0" col="3" @tap="onTabPress(2)" textAlignment="center" />
      <Label text="观看量" row="0" col="4" @tap="onTabPress(3)" textAlignment="center" />
      <Label text="点赞量" row="0" col="5" @tap="onTabPress(4)" textAlignment="center" />
      <Label text="&#xf0b0;" row="0" col="6" class="text font-awesome-solid" textAlignment="center"
        @tap="filterExpand" />
      <StackLayout row="1" col="1" class="tab-bar" :class="{ 'hidden': tab != 0, 'visible': tab == 0 }"></StackLayout>
      <StackLayout row="1" col="2" class="tab-bar" :class="{ 'hidden': tab != 1, 'visible': tab == 1 }"></StackLayout>
      <StackLayout row="1" col="3" class="tab-bar" :class="{ 'hidden': tab != 2, 'visible': tab == 2 }"></StackLayout>
      <StackLayout row="1" col="4" class="tab-bar" :class="{ 'hidden': tab != 3, 'visible': tab == 3 }"></StackLayout>
      <StackLayout row="1" col="5" class="tab-bar" :class="{ 'hidden': tab != 4, 'visible': tab == 4 }"></StackLayout>
    </GridLayout>
    <GridLayout ref="filterRef" class="filter" row="2" columns="*,32px" height="0">
      <StackLayout col="0" orientation="horizontal">
        <Label text="日期：" class="label" style="margin-right: 20px;" />
        <Label v-if="filterYear == 0" text="全部年份" class="date" @tap="changeYear()" />
        <Label v-else :text="filterYear + '年'" class="date" @tap="changeYear()" />
        <Label :text="parseMonthLabel(filterMonth)" class="date" @tap="changeMonth()" />
      </StackLayout>
      <Label col="2" text="清空" class="clear" textAlignment="center" @tap="clearFilter" />
    </GridLayout>
    <GridLayout row="3" rows="*">
      <Pager row="1" col="0" colSpan="2" :selectedIndex="tab" @selectedIndexChange="onTabChange">
        <PagerItem v-for="i in 5">
          <GridLayout rows="*">
            <videoList row="0" :data="listData[i - 1]" :loading="isLoading[i - 1]" @loadMoreItems="nextPage(i - 1)"
              :class="{ 'visible': onLoaded[i - 1] && !onLoadError[i - 1], 'hidden': !onLoaded[i - 1] || onLoadError[i - 1] }" />
            <loadingAnimation row="0" v-show="!onLoaded[i - 1]"
              :class="{ 'visible': !onLoaded[i - 1], 'hidden': onLoaded[i - 1] }" />
            <errorImg text="数据加载失败，请点击重试" @tap="retry(i - 1)" v-show="onLoadError[i - 1]"
              :class="{ 'visible': onLoadError[i - 1], 'hidden': !onLoadError[i - 1] }" />
          </GridLayout>
        </PagerItem>
      </Pager>
    </GridLayout>
  </GridLayout>
</template>

<script lang="ts" setup>
import topBar from './topBar.vue'
import loadingAnimation from '../components/loadingAnimation.vue';
import errorImg from '../components/errorImg.vue';
import videoList from '../lists/videoList.vue';
import { ref, watch } from 'nativescript-vue';
import { getVideoList } from '~/core/api';
import { toasty, parseMonthLabel } from '../../core/viewFunction'
import { Animation, AnimationDefinition, Dialogs } from '@nativescript/core'
interface VideoItem {
  id: string,
  title: string,
  up: string,
  numViews: number,
  numLikes: number,
  duration: number,
  createdAt: string,
  updatedAt: string,
  ecchi: boolean,
  img: string,
  loss: boolean
}
const listData = ref<VideoItem[][]>([[], [], [], [], []])
const tab = ref(0)
const filterRef = ref()
const filterOpen = ref(false)
const filterYear = ref<number>(0)
const filterMonth = ref<number>(0)
const onLoaded = ref([false, false, false, false, false])
const onLoadError = ref([false, false, false, false, false])
const isLoading = ref([false, false, false, false, false])
let page = [0, 0, 0, 0, 0]
let isEnd = [false, false, false, false, false]
getList(0).then((res) => {
  if (res) {
    listData.value[0] = res
  }
}).catch(() => {
  onLoadError.value[0] = true
}).finally(() => {
  onLoaded.value[0] = true
})
watch(tab, (val) => {
  if (listData.value[val].length == 0) {
    getList(val).then((res) => {
      if (res) {
        listData.value[val] = res
      }
    }).catch(() => {
      onLoadError.value[val] = true
    }).finally(() => {
      onLoaded.value[val] = true
    })
  }
})
watch(filterYear, () => {
  retry(tab.value)
})
watch(filterMonth, () => {
  retry(tab.value)
})
function retry(tab: number) {
  page[tab] = 0
  isEnd[tab] = false
  onLoaded.value[tab] = false
  onLoadError.value[tab] = false
  getList(tab).then((res) => {
    if (res) {
      listData.value[tab] = res
    }
  }).catch(() => {
    onLoadError.value[tab] = true
  }).finally(() => {
    onLoaded.value[tab] = true
  })
}
function nextPage(tab: number) {
  if (!isEnd[tab]) {
    getList(tab).then((res) => {
      if (res) {
        if (res.length > 0) {
          listData.value[tab] = listData.value[tab].concat(res)
        } else {
          isEnd[tab] = true
        }
      }
    })
  }
}
function getList(tab: number): Promise<VideoItem[] | null> {
  let sort: string
  switch (tab) {
    case 0: sort = 'date'; break;
    case 1: sort = 'trending'; break;
    case 2: sort = 'popularity'; break;
    case 3: sort = 'views'; break;
    case 4: sort = 'likes'; break;
    default: sort = 'date'; break;
  }
  return new Promise((resolve, reject) => {
    if (!isLoading.value[tab]) {
      isLoading.value[tab] = true
      getVideoList(page[tab], sort, filterYear.value, filterMonth.value).then(res => {
        page[tab]++
        resolve(res)
      }).catch(() => {
        reject()
        toasty('数据加载失败了喵~', 'Error')
      }).finally(() => {
        isLoading.value[tab] = false
      })
    } else {
      resolve(null)
    }
  })
}
function onTabPress(target: number) {
  if (tab.value != target) {
    tab.value = target
  }
}
function onTabChange(args: any) {
  tab.value = args.value
}
function filterExpand() {
  if (filterOpen.value) {
    const animationDefinition: AnimationDefinition[] = [
      {
        target: filterRef.value.nativeView, // 动画的目标视图
        duration: 200, // 动画持续时间，单位为毫秒
        height: 0, // 动画的目标高度
      },
    ]
    new Animation(animationDefinition).play().then(() => {
      filterOpen.value = !filterOpen.value
    })
  } else {
    filterOpen.value = !filterOpen.value
    const animationDefinition: AnimationDefinition[] = [
      {
        target: filterRef.value.nativeView, // 动画的目标视图
        duration: 200, // 动画持续时间，单位为毫秒
        height: '100px', // 动画的目标高度
      },
    ]
    new Animation(animationDefinition).play()
  }
}
function changeYear() {
  const currentYear = new Date().getFullYear()
  const years: string[] = ['全部年份']
  for (let year = currentYear; year >= 2014; year--) {
    years.push(year.toString());
  }
  Dialogs.action({
    title: '选择年份',
    message: '选择你要过滤的年份',
    actions: years,
    cancelable: true,
  }).then((result) => {
    if (result == '全部年份') {
      filterYear.value = 0
    } else {
      filterYear.value = Number(result)
    }
  })
}
function changeMonth() {
  const months = [
    '全部月份', '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];
  Dialogs.action({
    title: '选择年份',
    message: '选择你要过滤的年份',
    actions: months,
    cancelable: true,
  }).then((result) => {
    filterMonth.value = months.indexOf(result)
  })
}
function clearFilter() {
  filterYear.value = 0
  filterMonth.value = 0
}
</script>

<style lang="scss" scoped>
.tab {
  .tab-bar {
    background-color: #00796B;
    height: 8px;
    border-radius: 50%;
    width: 100px;
  }
}

.filter {
  padding: 0 40px;

  .label {
    color: #262626
  }

  .date {
    padding: 0 20px
  }

  .clear {
    color: #00796B;
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