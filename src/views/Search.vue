<template>
  <Page>
    <ActionBar>
      <GridLayout rows="*" columns="*,16px">
        <StackLayout orientation="horizontal" class="search-bg">
          <Label v-if="hint" text="搜索" />
        </StackLayout>
        <SearchBar @textChange="textChange" @submit="submit" col="0" class="search-input" />
      </GridLayout>
    </ActionBar>
  </Page>
</template>
<script lang="ts" setup>
import { ref } from 'nativescript-vue'
const hint = ref<boolean>(true)
function textChange(args: any) {
  if (args.value.length > 0) {
    hint.value = false
  } else {
    hint.value = true
  }
}
function submit(args: any) {

}
</script>
<style scoped lang="scss">
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
}
</style>