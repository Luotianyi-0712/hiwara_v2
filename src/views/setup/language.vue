<template>
  <Page :class="{ dark: darkMode }">
    <ActionBar>
      <GridLayout columns="32px,auto,*" class="topBar">
        <Label col="0" text="&#xf104;" class="font-awesome-solid" @tap="navigateBack" />
        <Label col="1" text="语言选择" />
      </GridLayout>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <GridLayout columns="*,auto" rows="48px" class="button" @tap="toggle('auto')">
          <Label col="0" text="跟随系统" class="label" />
          <Label col="1" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
        <GridLayout v-for="(item, index) in list" columns="auto,*,auto" rows="28px,24px" class="button"
          @tap="toggle(item.value)">
          <Label row="0" col="0" :text="item.label" class="label" />
          <Label row="1" col="0" :text="item.tslabel" class="tslabel" />
          <Label row="0" rowSpan="2" col="2" text="&#xf054;" class="font-awesome-solid arrow" />
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script lang="ts" setup>
import { ref, watch, $navigateBack, defineProps } from "nativescript-vue"
import { changeLanguage } from "../../core/database"
import { languageList } from "../../core/viewFunction"
import { useMainStore } from '../../core/store'
const mainStore = useMainStore()
const darkMode = ref(mainStore.dark)
const props = defineProps<{
  back: () => void
}>()
interface Item {
  label: string,
  tslabel: string,
  value: string
}
const list = ref<Item[]>([])
list.value = languageList
watch(() => mainStore.dark, (val) => {
  darkMode.value = val
})
function navigateBack() {
  $navigateBack()

}
function toggle(val: string) {
  console.log(val)
  changeLanguage(val).then(() => {
    props.back()
    $navigateBack()
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
  border-bottom-width: 1px;
  border-color: #c0c0c0;

  .label {
    font-size: 14px;
    padding: 0 40px;
    text-align: left;
    color: #424242;
  }

  .tslabel {
    font-size: 12px;
    padding: 0 40px;
    text-align: left;
  }

  .arrow {
    padding: 0 40px;
  }
}

.dark {
  background-color: #0d0d0d;
  color: #d0d0d0;

  .button {
    .label {
      color: #e0e0e0;
    }
  }
}
</style>