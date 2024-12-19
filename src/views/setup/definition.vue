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
        <GridLayout columns="*,auto" rows="48px" class="button" tap="360p">
          <Label col="0" text="360P" class="label" />
          <Label col="1" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="*,auto" rows="48px" class="button" tap="540p">
          <Label col="0" text="720P" class="label" />
          <Label col="1" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout columns="*,auto" rows="48px" class="button" tap="Source">
          <Label col="0" text="原画" class="label" />
          <Label col="1" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { $navigateBack } from "nativescript-vue"
function navigateBack() {
  $navigateBack()
}
function toggle(val: string) {

  $navigateBack()
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