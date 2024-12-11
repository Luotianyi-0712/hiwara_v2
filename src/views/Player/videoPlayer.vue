<template>
  <GridLayout columns="*" rows="*" class="player" ref="videoPlayerFrame" @layoutChanged="videoPlayerFrameLayoutChanged">
    <VideoPlayer col="0" row="0" ref="videoPlayerRef" :src="playerSrc" autoplay="true" controls="false"
      observeCurrentTime="true" @playbackReady="onPlaybackReady" @playbackStart="onPlay" @finishedEvent="onFinished"
      @seekToTimeComplete="onSeekToTimeComplete" @currentTimeUpdated="onCurrentTimeUpdated" :width="videoWidth"
      :height="videoHeight" />
    <GridLayout col="0" row="0" columns="*" rows="*">
      <Label v-if="sliderChangeIng"
        :text="formatMilliseconds(sliderValue + sliderValueAdd) + '/' + formatMilliseconds(duration)"
        :class="isFullscreen ? 'prompt-fullscreen' : 'prompt'" />
      <Label v-if="brightnessChangeIng" :text="'亮度：' + (brightnessLevel - brightnessCatch)"
        :class="isFullscreen ? 'prompt-fullscreen' : 'prompt'" />
      <Label v-if="volumeChangeIng" :text="'音量：' + (volumeLevel - volumerCatch)"
        :class="isFullscreen ? 'prompt-fullscreen' : 'prompt'" />
      <ActivityIndicator busy="true" v-if="loading" style="height: 180px;width: 180px;" />
    </GridLayout>
    <GridLayout col="0" row="0" columns="*" rows="auto,*,auto" class="player-controls" v-if="controlsShow">
      <GridLayout col="0" row="0" columns="auto,*,auto" rows="auto">
        <StackLayout col="0" row="0" orientation="horizontal" style="padding: 0 10px;">
          <Label text="&#xf104;" class="font-awesome-solid" @tap="back"
            :class="isFullscreen ? 'back-icon-fullscreen' : 'back-icon'" />
          <Label text="&#xf80b;" class="font-awesome-solid back-icon" @tap="navigateBackHome" v-if="!isFullscreen" />
        </StackLayout>
        <Label col="1" row="0" :text="title" class="video-title" v-if="isFullscreen" />
        <StackLayout col="2" row="0" orientation="horizontal" horizontalAlignment="right" style="padding:0 10px;"
          v-if="isFullscreen">
          <Label v-if="networkType === 0" text="&#xf127; " class="font-awesome-solid" />
          <Label v-else-if="networkType === 1" text="&#xf1eb; " class="font-awesome-solid" />
          <Label v-else-if="networkType === 2" text="&#x1f4f6; " class="font-awesome-solid" />
          <Label v-else-if="networkType === 3" text="&#xf796; " class="font-awesome-solid" />
          <Label v-else-if="networkType === 4" text="&#xf294; " class="font-awesome-brands" />
          <Label v-else-if="networkType === 5" text="&#x1f511; " class="font-awesome-solid" />
          <Label v-else text="&#xf6ff; " class="font-awesome-solid" />
          <Label :text="networkTypeText(networkType) + '  '" />
          <Label v-if="batteryLevel < 20" text="&#xf244; " class="font-awesome-solid" color="#EF5350" />
          <Label v-else-if="batteryLevel >= 20 && batteryLevel < 40" text="&#xf243; " class="font-awesome-solid" />
          <Label v-else-if="batteryLevel >= 40 && batteryLevel < 60" text="&#xf242; " class="font-awesome-solid" />
          <Label v-else-if="batteryLevel >= 60 && batteryLevel < 80" text="&#xf241; " class="font-awesome-solid" />
          <Label v-else text="&#x1f50b; " class="font-awesome-solid" />
          <Label :text="batteryLevel + '%  '" :color="batteryLevel < 20 ? '#EF5350' : '#fff'" />
          <Label :text="nowTime" style="font-size: 14px" />
          <Label text="&#xf142;" class="font-awesome-solid"
            :class="isFullscreen ? 'back-icon-fullscreen' : 'back-icon'" />
        </StackLayout>
      </GridLayout>
      <GridLayout col="0" row="1" columns="*,2*,*" @tap="hiddenPlayer" @doubleTap="onPause">
        <GridLayout col="0" row="0" @pan="changeBrightness"></GridLayout>
        <GridLayout col="1" row="0" @pan="swipeToChangeTheProgress"></GridLayout>
        <GridLayout col="2" row="0" @pan="changeVolume"></GridLayout>
      </GridLayout>
      <GridLayout col="0" row="2" columns="10px,auto,auto,*,auto,auto,10px" rows="auto,auto" v-if="isFullscreen">
        <Slider col="0" row="0" colSpan="7" v-model="sliderValue" minValue="0" :maxValue="duration"
          @touch="onSliderTouch" />
        <Label col="1" row="1" :text="pause ? '&#xf04b;' : '&#xf04c;'"
          class="font-awesome-solid controls-icon-fullscreen" @tap="onPause" />
        <Label col="2" row="1"
          :text="formatMilliseconds(sliderValue + sliderValueAdd) + '/' + formatMilliseconds(duration)"
          class="progress-fullscreen" />
        <Label col="4" row="1" :text="parseDefinitionLabel(definition)" style="font-size: 16px;padding: 0 20px"
          @tap="onOpenDrawer" />
        <Label col="5" row="1" text="&#xf066;" class="font-awesome-solid controls-icon-fullscreen"
          @tap="$emit('onFullscreen')" />
      </GridLayout>
      <GridLayout col="0" row="3" :columns="'10px,auto,*,auto,auto,10px'" rows="auto" v-else>
        <Label col="1" :text="pause ? '&#xf04b;' : '&#xf04c;'" class="font-awesome-solid controls-icon"
          @tap="onPause" />
        <Slider col="2" v-model="sliderValue" minValue="0" :maxValue="duration" @touch="onSliderTouch" />
        <Label col="3" :text="formatMilliseconds(sliderValue + sliderValueAdd) + '/' + formatMilliseconds(duration)"
          class="progress" />
        <Label col="4" text="&#xf065;" class="font-awesome-solid controls-icon" @tap="$emit('onFullscreen')" />
      </GridLayout>
    </GridLayout>
    <GridLayout v-else col="0" row="0" columns="*,2*,*" rows="*" @tap="showPlayer" @doubleTap="onPause">
      <GridLayout col="0" row="0" @pan="changeBrightness"></GridLayout>
      <GridLayout col="1" row="0" @pan="swipeToChangeTheProgress"></GridLayout>
      <GridLayout col="2" row="0" @pan="changeVolume"></GridLayout>
    </GridLayout>
    <GridLayout v-if="finished" col="0" row="0" columns="*" rows="*">
      <Label text="&#xf2f9;" class="font-awesome-solid replay-icon" @tap="onPause" />
    </GridLayout>
    <Drawer col="0" row="0" ref="drawer" :gestureEnabled="false" backdropColor="#00000000">
      <GridLayout columns="*" rows="*,auto,auto,auto,*" ~rightDrawer height="100%" width="400px"
        class="claritySelection">
        <Label v-for="(item, i) in definitionList" :row="i + 1" :text="parseDefinitionLabel(item)"
          @tap="changeDefinition(item)" />
      </GridLayout>
    </Drawer>
  </GridLayout>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted,onBeforeUnmount } from 'nativescript-vue'
import { Connectivity, } from '@nativescript/core'
import { DeviceInfo } from "nativescript-dna-deviceinfo";
import { Brightness } from '@nativescript/brightness'
import { parseDefinitionLabel } from '../../core/viewFunction'
import { navigateBack, navigateBackHome } from '../../core/navigate'
const props = defineProps<{
  playerSrc: string
  title: string
  definition: string
  definitionList: any[]
  isFullscreen: boolean
}>();
const emit = defineEmits(['onFullscreen', 'changeDefinition']);
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
const networkType = ref(0)
const batteryLevel = ref(0)
const brightnessLevel = ref(0)
const brightnessChangeIng = ref(false)
const brightnessCatch = ref(0)
const volumeLevel = ref(0)
const volumeChangeIng = ref(false)
const volumerCatch = ref(0)
const nowTime = ref('')
const drawer = ref()
let metadataWidth: number = 0
let metadataHeight: number = 0
let frameHeigth: number = 0
let frameWidth: number = 0
let hiddenTimer: any
let autoplay = true
let timer: any
let sliderTrigger = false
let brightnessTrigger = false
let volumerTigger = false
networkType.value = Connectivity.getConnectionType()
batteryLevel.value = DeviceInfo.batteryLevel()
volumeLevel.value = DeviceInfo.audioVolumeLevel()
nowTime.value = getCurrentTime24Hour()
const brightness = new Brightness()
brightnessLevel.value = Math.floor(gammaToLinear(brightness.get()))
onMounted(() => {
  Connectivity.startMonitoring((change: number) => {
    networkType.value = change
  })
  timer = setInterval(() => {
    nowTime.value = getCurrentTime24Hour()
  }, 1000)
})
onBeforeUnmount(() => {
  clearTimeout(timer)
  clearTimeout(hiddenTimer)
})
function playing() {
  currentTime.value = videoPlayerRef.value.nativeView.getCurrentTime()
  if (!sliderChangeIng.value) {
    sliderValue.value = currentTime.value
  }
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
  // console.log('视频加载完成')
  // console.log('duration: ' + duration.value)
  // console.log('width: ' + metadataWidth)
  // console.log('height: ' + metadataHeight)
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
  batteryLevel.value = DeviceInfo.batteryLevel()
  hiddenTimer = setTimeout(hiddenPlayer, 5000)
}
function hiddenPlayer() {
  clearTimeout(hiddenTimer)
  drawer.value.nativeView.close()
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
      // console.log('跳转到: ' + sliderValue.value)
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
  const add = parseInt(args.deltaX) * 150
  switch (args.state) {
    case 1:
      if (controlsShow.value) {
        clearTimeout(hiddenTimer)
      }
      break;
    case 2:
      if (Math.abs(args.deltaX) > Math.abs(args.deltaY)) {
        sliderChangeIng.value = true
        sliderTrigger = true
      }
      if (sliderTrigger) {
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
      }
      break;
    case 3:
      if (sliderTrigger) {
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
        // console.log('跳转到: ' + sliderValue.value)
        sliderValueAdd.value = 0
        sliderChangeIng.value = false
        if (finished.value) {
          finished.value = false
          pause.value = false
          videoPlayerRef.value.nativeView.play()
        }
        sliderTrigger = false
        loading.value = true
      }
      if (controlsShow.value) {
        hiddenTimer = setTimeout(hiddenPlayer, 5000)
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
function onCurrentTimeUpdated(args: any) {
  playing()
}
function onSeekToTimeComplete(args: any) {
  hiddenLoading()
}
function hiddenLoading() {
  loading.value = false
}
function networkTypeText(x: number) {
  switch (x) {
    case 0: return '无网络'
    case 1: return 'WiFi'
    case 2: return '移动网络'
    case 3: return '有线网络'
    case 4: return '蓝牙'
    case 5: return 'VPN'
    default: return '未知'
  }
}
function getCurrentTime24Hour(): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  // 使用padStart方法确保时间部分始终为两位数
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}
function onOpenDrawer() {
  clearTimeout(hiddenTimer)
  drawer.value.nativeView.open('right')
  hiddenTimer = setTimeout(hiddenPlayer, 5000)
}
function changeDefinition(val: string) {
  emit('changeDefinition', val)
  drawer.value.nativeView.close()
}
function changeBrightness(args: any) {
  const add = Math.floor((args.deltaY))
  switch (args.state) {
    case 1:
      break;
    case 2:
      if (Math.abs(args.deltaX) < Math.abs(args.deltaY)) {
        brightnessChangeIng.value = true
        brightnessTrigger = true
      }
      if (brightnessTrigger) {
        const change = brightnessLevel.value - add
        if (change > 0 && change < 100) {
          brightnessCatch.value = add
          setBrightness(change)
        } else {
          if (change <= 0) {
            brightnessCatch.value = brightnessLevel.value
            setBrightness(0)
          }
          if (change >= 100) {
            brightnessCatch.value = brightnessLevel.value - 100
            setBrightness(100)
          }
        }
      }
      break;
    case 3:
      if (brightnessTrigger) {
        brightnessLevel.value = brightnessLevel.value - brightnessCatch.value
        brightnessCatch.value = 0
        brightnessChangeIng.value = false
        brightnessTrigger = false
      }
      break;
    default:
      break;
  }
  function setBrightness(val: number) {
    // console.log('val:', val)
    brightness.set({
      intensity: linearToGamma(val),
    })
  }
}
function linearToGamma(linearValue: number, gamma: number = 3.3): number {
  // 确保输入值在 0-100 范围内
  if (linearValue < 0 || linearValue > 100) {
    throw new Error('Input value must be in the range 0-100.');
  }
  // 将线性值标准化到 0-1 范围
  const normalizedLinearValue = linearValue / 100;
  // 应用伽马校正公式
  const gammaCorrectedValue = Math.pow(normalizedLinearValue, gamma);
  // 将伽马校正后的值重新缩放到 0-100 范围
  const gammaValue = gammaCorrectedValue * 100;
  return gammaValue;
}
function gammaToLinear(gammaValue: number, gamma: number = 3.3): number {
  // 确保输入值在 0-100 范围内
  if (gammaValue < 0 || gammaValue > 100) {
    throw new Error('Input value must be in the range 0-100.');
  }
  // 将伽马值标准化到 0-1 范围
  const normalizedGammaValue = gammaValue / 100;
  // 应用伽马校正的逆过程
  const linearValue = Math.pow(normalizedGammaValue, 1 / gamma);
  // 将线性值重新缩放到 0-100 范围
  const scaledLinearValue = linearValue * 100;
  return scaledLinearValue;
}
function changeVolume(args: any) {
  const add = Math.floor((args.deltaY))
  switch (args.state) {
    case 1:
      break;
    case 2:
      if (Math.abs(args.deltaX) < Math.abs(args.deltaY)) {
        volumeChangeIng.value = true
        volumerTigger = true
      }
      if (volumerTigger) {
        const change = volumeLevel.value - add
        // console.log(change)
        if (change > 0 && change < 100) {
          volumerCatch.value = add
          setVolume(change)
        } else {
          if (change <= 0) {
            volumerCatch.value = volumeLevel.value
            setVolume(0)
          }
          if (change >= 100) {
            volumerCatch.value = volumeLevel.value - 100
            setVolume(100)
          }
        }
      }
      break;
    case 3:
      if (volumerTigger) {
        volumeLevel.value = volumeLevel.value - volumerCatch.value
        volumerCatch.value = 0
        volumeChangeIng.value = false
        volumerTigger = false
      }
      break;
    default:
      break;
  }
  function setVolume(val: number) {
    DeviceInfo.setAudioVolumeLevel(val);
  }
}
function back() {
  if (props.isFullscreen) {
    emit('onFullscreen')
  } else {
    navigateBack()
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
  font-size: 26px;
  height: 100px;
  width: 100px;
  margin: 20px 20px;
  text-align: center;
}


.progress {
  font-size: 12px;
}

.progress-fullscreen {
  font-size: 14px;
  padding: 0 20px;
}

.prompt {
  background-color: #000000a0;
  text-align: center;
  width: 300px;
  height: 100px;
  border-radius: 10px;
  color: #fff;
}

.prompt-fullscreen {
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
  font-size: 18px;
}

.claritySelection {
  background-color: #000000a0;

  Label {
    font-size: 18px;
    color: #ffffffd0;
    padding: 30px 0;
    text-align: center;
  }
}
</style>
