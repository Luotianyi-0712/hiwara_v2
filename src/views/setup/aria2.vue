<template>
  <Page>
    <ActionBar>
      <GridLayout columns="32px,auto,*" class="topBar">
        <Label col="0" text="&#xf104;" class="font-awesome-solid" @tap="navigateBack" />
        <Label col="1" text="Aria2推送设置" />
      </GridLayout>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <GridLayout columns="*,auto" rows="48px" class="button">
          <Label col="0" text="启用Aria2" class="label" style="padding:0 40px" />
          <GridLayout col="1" style="padding: 0 16px;">
            <Switch :checked="open" @checkedChange="changeSwitch" />
          </GridLayout>
        </GridLayout>
        <GridLayout columns="*" rows="auto,auto,auto" class="button">
          <Label row="0" text="Aria2 RPC" class="label" />
          <TextField row="1" v-model="rpc" hint="请输入RPC地址" :isEnabled="open" />
          <Label row="2" text="请填写Aria2服务器的RPC地址，示例：https://127.0.0.1:6800/jsonrpc" class="tip" />
        </GridLayout>
        <GridLayout columns="*" rows="36px,auto,auto" class="button">
          <Label row="0" text="Token" class="label" />
          <TextField row="1" v-model="token" hint="请输入Token" :isEnabled="open" />
        </GridLayout>
        <GridLayout columns="*" rows="auto,auto,auto" class="button">
          <Label row="0" text="下载路径" class="label" />
          <TextField row="1" v-model="download" hint="请输入下载路径" :isEnabled="open" />
          <Label row="2" text="注意：此处下载路径是Aria2服务器的下载路径，不是手机的下载路径" class="tip" />
        </GridLayout>
        <Button text="保存设置" @tap="toggle" :isEnabled="open" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script lang="ts" setup>
import { ref, $navigateBack } from "nativescript-vue"
import { getConfig, changeAriaSwitch } from "../../core/database"
const open = ref<boolean>(false)
const rpc = ref<string>('')
const token = ref<string>('')
const download = ref<string>('')
getConfig().then(data => {
  open.value = Boolean(data.aria)
  rpc.value = data.ariaRPC
  token.value = data.ariaToken
  download.value = data.ariaDownload
})
function navigateBack() {
  $navigateBack()
}
function changeSwitch(args: any) {
  open.value = args.value
  changeAriaSwitch(open.value)
}
function toggle() {

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
    padding: 20px 40px 0 40px;
    color: #424242;
  }

  TextField {
    font-size: 14px;
    margin: 0 28px;
  }

  .tip {
    font-size: 11px;
    padding: 0 40px 20px 40px;
  }
}

Button {
  margin: 10px 20px;
}
</style>