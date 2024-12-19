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
        <GridLayout columns="*,auto" rows="48px" class="button" @tap="toDefinition">
          <Label col="0" text="默认清晰度" class="label" />
          <Label col="1" text="540P" class="arrow" />
        </GridLayout>
        <GridLayout columns="*,auto" rows="48px" class="button">
          <Label col="0" text="缓存目录" class="label" />
          <Label col="1" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="*,auto" rows="48px" class="button">
          <Label col="0" text="Aria设置" class="label" />
          <Label col="1" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="*,auto" rows="48px" class="button">
          <Label col="0" text="语言(Language)" class="label" />
          <Label col="1" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="*,auto" rows="48px" class="button">
          <Label col="0" text="清除缓存" class="label" />
          <Label col="1" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="*,auto" rows="48px" class="button">
          <Label col="0" text="退出登录" class="label" />
          <Label col="1" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script lang="ts" setup>
import { navigateBack } from '../core/navigate'
import { ref, $navigateTo } from 'nativescript-vue'
import definition from './setup/definition.vue'
const autoplay = ref(true)
function autoplayChange(args: any) {
  autoplay.value = args.value
}
function toDefinition() {
  $navigateTo(definition, {
    transition: {
      name: "slideLeft",
      curve: "easeIn"
    }
  })
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
  // color: #262626;
  border-bottom-width: 1px;
  border-color: #c0c0c0;

  .label {
    font-size: 14px;
    padding: 0 40px;
  }

  .arrow {
    width: 140px;
    text-align: center;
  }
}
</style>