<template>
  <GridLayout columns="*" rows="*" class="player" ref="videoPlayerFrame" @layoutChanged="videoPlayerFrameLayoutChanged">
    <VideoPlayer col="0" row="0" ref="videoPlayerRef" :src="playerSrc" autoplay="true" controls="false"
      @playbackReady="onPlaybackReady" @finishedEvent="onFinished" :width="videoWidth" :height="videoHeight" />
    <GridLayout col="0" row="0" columns="*" rows="*">
      <Label v-show="sliderChangeIng"
        :text="formatMilliseconds(sliderValue + sliderValueAdd) + '/' + formatMilliseconds(duration)"
        class="hints-for-progress-bar-adjustments" />
    </GridLayout>
    <GridLayout col="0" row="0" columns="*" rows="auto,*,auto" class="player-controls" v-if="controlsShow">
      <StackLayout col="0" row="0" orientation="horizontal" style="padding: 0 10px;">
        <Label text="&#xf104;" class="font-awesome-solid back-icon" />
        <Label text="&#xf80b;" class="font-awesome-solid back-icon" />
      </StackLayout>
      <GridLayout col="0" row="1" @tap="hiddenPlayer" @doubleTap="onPause" @pan="swipeToChangeTheProgress">
      </GridLayout>
      <GridLayout col="0" row="2" columns="10px,auto,*,80px,auto,10px">
        <Label col="1" :text="pause ? '&#xf04b;' : '&#xf04c;'" class="font-awesome-solid controls-icon"
          @tap="onPause" />
        <Slider col="2" v-model="sliderValue" minValue="0" :maxValue="duration" @touch="onSliderTouch" />
        <Label col="3" :text="formatMilliseconds(sliderValue + sliderValueAdd) + '/' + formatMilliseconds(duration)"
          class="progress" />
        <Label col="4" text="&#xf065;" class="font-awesome-solid controls-icon" @tap="$emit('onFullscreen')" />
      </GridLayout>
    </GridLayout>
    <GridLayout v-else col="0" row="0" columns="*" rows="*" @tap="showPlayer" @pan="swipeToChangeTheProgress"
      @doubleTap="onPause">
    </GridLayout>
    <GridLayout v-if="finished" col="0" row="0" columns="*" rows="*">
      <Label text="&#xf04b;" class="font-awesome-solid replay-icon" @tap="onPause" />
    </GridLayout>
  </GridLayout>
</template>
<script setup lang="ts">
import { ref, defineProps, onMounted, onUnmounted } from 'nativescript-vue'
import { isAndroid, isIOS, Application } from '@nativescript/core'
const props = defineProps<{
  playerSrc: string
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
let metadataWidth: number = 0
let metadataHeight: number = 0
let frameHeigth: number = 0
let frameWidth: number = 0
let playingTimer: any
let hiddenTimer: any
let finished = false
onMounted(() => {
  playingTimer = setInterval(playing, 100)
})
onUnmounted(() => {
  clearInterval(playingTimer)
  clearTimeout(hiddenTimer)
})
function playing() {
  currentTime.value = videoPlayerRef.value.nativeView.getCurrentTime()
  if (!sliderChangeIng.value) {
    sliderValue.value = currentTime.value
  }
}
function onPlaybackReady(args: any) {
  if (isAndroid) {
    try {
      const mediaMetadataRetriever = new android.media.MediaMetadataRetriever()
      mediaMetadataRetriever.setDataSource(props.playerSrc)
      const width = mediaMetadataRetriever.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_VIDEO_WIDTH)
      const height = mediaMetadataRetriever.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_VIDEO_HEIGHT)
      metadataWidth = parseInt(width)
      metadataHeight = parseInt(height)
      if (metadataWidth != 0 && metadataHeight != 0) {
        videoWidth.value = frameHeigth * metadataWidth / metadataHeight + 'px'
        videoHeight.value = frameHeigth + 'px'
      }
    } catch (error) {
      console.log(error)
    }
  }
  duration.value = videoPlayerRef.value.nativeView.getDuration()
}
function onFinished() {
  finished = true
  pause.value = true
}
function onPause() {
  if (finished) {
    finished = false
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
      hiddenTimer = setTimeout(hiddenPlayer, 5000)
      if (finished) {
        finished = false
        pause.value = false
        videoPlayerRef.value.nativeView.play()
      }
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
      sliderValueAdd.value = 0
      sliderChangeIng.value = false
      if (controlsShow.value) {
        hiddenTimer = setTimeout(hiddenPlayer, 5000)
      }
      if (finished) {
        finished = false
        pause.value = false
        videoPlayerRef.value.nativeView.play()
      }
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

.controls-icon {
  font-size: 20px;
  height: 80px;
  width: 80px;
  margin: 20px 10px;
  text-align: center;
}

.progress {
  // text-align: center;
  font-size: 12px;
}

.hints-for-progress-bar-adjustments {
  background-color: #000000a0;
  text-align: center;
  width: 300px;
  height: 100px;
  border-radius: 10px;
  color: #fff;
}

.replay-icon {
  font-size: 80px;
  color: #ffffffd0;
  text-align: center;
  height: 250px;
  width: 250px;
}
</style>