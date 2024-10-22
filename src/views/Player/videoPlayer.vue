<template>
  <GridLayout columns="*" rows="*" class="player">
    <Video col="0" row="0" :src="playerSrc" autoplay="true" controls="false" @volumeSet="playvideo" />
    <GridLayout col="0" row="0" columns="*" rows="auto,*,auto" class="player-controls">
      <StackLayout col="0" row="0" orientation="horizontal" style="padding: 0 10px;">
        <Label text="&#xf104;" class="font-awesome-solid back-icon" />
        <Label text="&#xf80b;" class="font-awesome-solid back-icon" />
      </StackLayout>
      <GridLayout col="0" row="2" columns="10px,auto,*,80px,auto,10px">
        <!-- &#xf04b; &#xf04c; -->
        <Label col="1" text="&#xf04c;" class="font-awesome-solid controls-icon" />
        <Slider col="2" value="75" minValue="0" maxValue="100" />
        <!-- &#xf065; &#xf066; -->
        <Label col="3" text="00:00/00:00" class="progress" />
        <Label col="4" text="&#xf065;" class="font-awesome-solid controls-icon" />
      </GridLayout>
    </GridLayout>
  </GridLayout>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'nativescript-vue'
const props = defineProps<{
  playerSrc: string;
}>();
function playvideo() {
  console.log("play video")
}
</script>
<style scoped lang="scss">
.player {
  background-color: black;
  width: 100%;
}

.player-controls {
  color: #ffffffd0;
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
</style>