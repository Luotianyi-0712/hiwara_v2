<template>
  <GridLayout columns="*" rows="*" class="player" ref="videoPlayerFrame" @layoutChanged="videoPlayerFrameLayoutChanged">
    <VideoPlayer col="0" row="0" ref="videoPlayerRef" :src="playerSrc" autoplay="true" controls="false"
      observeCurrentTime="true" @playbackReady="onPlaybackReady" @playbackStart="onPlay" @finishedEvent="onFinished"
      @seekToTimeComplete="onSeekToTimeComplete" @currentTimeUpdated="onCurrentTimeUpdated" :width="videoWidth"
      :height="videoHeight" />
    <GridLayout col="0" row="0" columns="*" rows="*">
      <Label v-if="sliderChangeIng"
        :text="formatMilliseconds(sliderValue + sliderValueAdd) + '/' + formatMilliseconds(duration)"
        :class="isFullscreen ? 'hints-for-progress-bar-adjustments-fullscreen' : 'hints-for-progress-bar-adjustments'" />
      <ActivityIndicator busy="true" v-if="loading" style="height: 180px;width: 180px;" />
    </GridLayout>
    <GridLayout col="0" row="0" columns="*" rows="auto,*,auto" class="player-controls" v-if="controlsShow">
      <GridLayout col="0" row="0" columns="*,2*,*" rows="auto">
        <StackLayout col="0" row="0" orientation="horizontal" style="padding: 0 10px;">
          <Label text="&#xf104;" class="font-awesome-solid"
            :class="isFullscreen ? 'back-icon-fullscreen' : 'back-icon'" />
          <Label text="&#xf80b;" class="font-awesome-solid"
            :class="isFullscreen ? 'back-icon-fullscreen' : 'back-icon'" />
        </StackLayout>
        <Label col="1" row="0" :text="title" class="video-title" v-if="isFullscreen" />
        <StackLayout col="2" row="0" orientation="horizontal" horizontalAlignment="right" style="padding:0 10px;">
          <Label text="&#xf1eb;  " class="font-awesome-solid" />
          <Label text="&#x1f4f6;  " class="font-awesome-solid" />
          <Label text="&#x1f50b;  " class="font-awesome-solid" />
          <!-- <Label text="&#xf241;  " class="font-awesome-solid" />
          <Label text="&#xf242;  " class="font-awesome-solid"/>
          <Label text="&#xf243;  " class="font-awesome-solid" />
          <Label text="&#xf244;  " class="font-awesome-solid" /> -->
          <Label text="00:00" style="font-size: 14px;"/>
          <Label text="&#xf142;" class="font-awesome-solid"
            :class="isFullscreen ? 'back-icon-fullscreen' : 'back-icon'" />
        </StackLayout>
      </GridLayout>
      <GridLayout col="0" row="1" @tap="hiddenPlayer" @doubleTap="onPause" @pan="swipeToChangeTheProgress">
      </GridLayout>
      <GridLayout col="0" row="2" columns="10px,auto,*,80px,auto,10px">
        <Label col="1" :text="pause ? '&#xf04b;' : '&#xf04c;'" class="font-awesome-solid"
          :class="isFullscreen ? 'controls-icon-fullscreen' : 'controls-icon'" @tap="onPause" />
        <Slider col="2" v-model="sliderValue" minValue="0" :maxValue="duration" @touch="onSliderTouch" />
        <Label col="3" :text="formatMilliseconds(sliderValue + sliderValueAdd) + '/' + formatMilliseconds(duration)"
          :class="isFullscreen ? 'progress-fullscreen' : 'progress'" />
        <Label col="4" :text="isFullscreen ? '&#xf066;' : '&#xf065;'" class="font-awesome-solid controls-icon"
          :class="isFullscreen ? 'controls-icon-fullscreen' : 'controls-icon'" @tap="$emit('onFullscreen')" />
      </GridLayout>
    </GridLayout>
    <GridLayout v-else col="0" row="0" columns="*" rows="*" @tap="showPlayer" @pan="swipeToChangeTheProgress"
      @doubleTap="onPause">
    </GridLayout>
    <GridLayout v-if="finished" col="0" row="0" columns="*" rows="*">
      <Label text="&#xf2f9;" class="font-awesome-solid replay-icon" @tap="onPause" />
    </GridLayout>
  </GridLayout>
</template>
<script setup lang="ts">
import { ref, defineProps, onMounted, onUnmounted } from 'nativescript-vue'
import { isAndroid, isIOS, Application } from '@nativescript/core'
const props = defineProps<{
  playerSrc: string
  title: string
  isFullscreen: boolean
}>();
const videoPlayerFrame = ref()
const videoPlayerRef = ref()
const currentTime = ref(0)
const duration = ref(0)
const sliderValue = ref(0)
const sliderValueAdd = ref(0)
const sliderChangeIng = ref(false)
const pause = ref(false)
const controlsShow = ref(false)
const videoWidth = ref('0px')
const videoHeight = ref('0px')
const finished = ref(false)
const loading = ref(true)
let metadataWidth: number = 0
let metadataHeight: number = 0
let frameHeigth: number = 0
let frameWidth: number = 0
let hiddenTimer: any
let autoplay = false
onMounted(() => {
})
onUnmounted(() => {
  clearTimeout(hiddenTimer)
})
function playing() {
  currentTime.value = videoPlayerRef.value.nativeView.getCurrentTime()
  if (!sliderChangeIng.value) {
    sliderValue.value = currentTime.value
  }
  // console.log('currentTime: ' + currentTime.value)
}
function onPlaybackReady() {
  metadataWidth = videoPlayerRef.value.nativeView.getVideoSize().width
  metadataHeight = videoPlayerRef.value.nativeView.getVideoSize().height
  if (metadataWidth != 0 && metadataHeight != 0) {
    videoWidth.value = frameHeigth * metadataWidth / metadataHeight + 'px'
    videoHeight.value = frameHeigth + 'px'
  }
  duration.value = videoPlayerRef.value.nativeView.getDuration()
  hiddenLoading()
  if (!autoplay) {
    videoPlayerRef.value.nativeView.pause()
    pause.value = true
  }
  console.log('视频加载完成')
  console.log('duration: ' + duration.value)
  console.log('width: ' + metadataWidth)
  console.log('height: ' + metadataHeight)
}
function onPlay() {
  // console.log('onPlay')
}
function onFinished() {
  finished.value = true
  pause.value = true
}
function onPause() {
  if (finished.value) {
    finished.value = false
    pause.value = false
    videoPlayerRef.value.nativeView.seekToTime(0)
    videoPlayerRef.value.nativeView.play()
  } else {
    pause.value = !pause.value
    if (pause.value) {
      videoPlayerRef.value.nativeView.pause()
    } else {
      videoPlayerRef.value.nativeView.play()
    }
  }
}
function showPlayer() {
  controlsShow.value = true
  hiddenTimer = setTimeout(hiddenPlayer, 5000)
}
function hiddenPlayer() {
  clearTimeout(hiddenTimer)
  controlsShow.value = false
}
function onSliderTouch(args: any) {
  switch (args.action) {
    case 'down':
      clearTimeout(hiddenTimer)
      sliderChangeIng.value = true
      break;
    case 'up':
      sliderChangeIng.value = false
      videoPlayerRef.value.nativeView.seekToTime(sliderValue.value)
      console.log('跳转到: ' + sliderValue.value)
      hiddenTimer = setTimeout(hiddenPlayer, 5000)
      if (finished.value) {
        finished.value = false
        pause.value = false
        videoPlayerRef.value.nativeView.play()
      }
      loading.value = true
      break;
    default:
      break;
  }
}
function swipeToChangeTheProgress(args: any) {
  const add = parseInt(args.deltaX) * 250
  switch (args.state) {
    case 1:
      if (controlsShow.value) {
        clearTimeout(hiddenTimer)
      }
      sliderChangeIng.value = true
      break;
    case 2:
      if (sliderValue.value + add > 0 && sliderValue.value + add < duration.value) {
        sliderValueAdd.value = add
      } else {
        if (sliderValue.value + add <= 0) {
          sliderValueAdd.value = -sliderValue.value
        }
        if (sliderValue.value + add >= duration.value) {
          sliderValueAdd.value = duration.value - sliderValue.value
        }
      }
      break;
    case 3:
      if (sliderValue.value + add > 0 && sliderValue.value + add < duration.value) {
        sliderValue.value = sliderValue.value + add
      } else {
        if (sliderValue.value + add <= 0) {
          sliderValue.value = 0
        }
        if (sliderValue.value + add >= duration.value) {
          sliderValue.value = duration.value
        }
      }
      videoPlayerRef.value.nativeView.seekToTime(sliderValue.value)
      console.log('跳转到: ' + sliderValue.value)
      sliderValueAdd.value = 0
      sliderChangeIng.value = false
      if (controlsShow.value) {
        hiddenTimer = setTimeout(hiddenPlayer, 5000)
      }
      if (finished.value) {
        finished.value = false
        pause.value = false
        videoPlayerRef.value.nativeView.play()
      }
      loading.value = true
      break;
    default:
      break;
  }
}
function formatMilliseconds(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  // 将分钟和秒数格式化为两位数
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}
function videoPlayerFrameLayoutChanged() {
  frameHeigth = videoPlayerFrame.value.nativeView.getMeasuredHeight()
  frameWidth = videoPlayerFrame.value.nativeView.getMeasuredWidth()
  if (metadataWidth != 0 && metadataHeight != 0) {
    videoWidth.value = frameHeigth * metadataWidth / metadataHeight + 'px'
    videoHeight.value = frameHeigth + 'px'
  }
}
function onCurrentTimeUpdated(args: any) {
  playing()
}
function onSeekToTimeComplete(args: any) {
  hiddenLoading()
}
function hiddenLoading() {
  loading.value = false
}
function test() {
  console.log('test')
}
</script>
<style scoped lang="scss">
.player {
  background-color: black;
  width: 100%;
}

.player-controls {
  color: #ffffff;
  background: linear-gradient(to bottom, #0000004d, #0000, #0000004d);
}

.back-icon {
  font-size: 18px;
  height: 80px;
  width: 80px;
  margin: 20px 10px;
  text-align: center;
}

.back-icon-fullscreen {
  font-size: 24px;
  height: 100px;
  width: 100px;
  margin: 40px 20px;
  text-align: center;
}

.controls-icon {
  font-size: 20px;
  height: 80px;
  width: 80px;
  margin: 20px 10px;
  text-align: center;
}

.controls-icon-fullscreen {
  font-size: 28px;
  height: 100px;
  width: 100px;
  margin: 40px 20px;
  text-align: center;
}


.progress {
  font-size: 12px;
}

.progress-fullscreen {
  font-size: 14px;
}

.hints-for-progress-bar-adjustments {
  background-color: #000000a0;
  text-align: center;
  width: 300px;
  height: 100px;
  border-radius: 10px;
  color: #fff;
}

.hints-for-progress-bar-adjustments-fullscreen {
  background-color: #000000a0;
  text-align: center;
  width: 400px;
  height: 150px;
  border-radius: 10px;
  color: #fff;
  font-size: 18px;
}

.replay-icon {
  font-size: 80px;
  color: #ffffffd0;
  text-align: center;
  height: 250px;
  width: 250px;
}

.video-title {
  font-size: 20px;
  text-align: center;
}
</style>