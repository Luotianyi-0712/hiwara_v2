<template>
  <GridLayout row="*">
    <ScrollView>
      <StackLayout>
        <GridLayout rows="auto,auto" columns="10px,*,2*" class="item">
          <GridLayout row="0" col="0" class="icon"></GridLayout>
          <StackLayout row="0" col="1" class="title">
            <Label row="0" text="公告" class="label" />
            <Label row="1" text="重要信息" class="illustrate" />
          </StackLayout>
          <StackLayout row="0" col="2" class="info" orientation="horizontal">
            <Label row="0" text="发布" class="label" />
            <Label row="0" text="0" class="number" />
            <Label row="0" text="主题" class="label" />
            <Label row="0" text="0" class="number" />
          </StackLayout>
          <StackLayout row="1" col="1" colSpan="2" class="last">
            <Label row="0" text="上一个发布" class="label" />
            <Label row="1"
              text="上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布上一个发布"
              class="msg" />
          </StackLayout>
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>
<script lang="ts" setup>
import { getHomeForum } from '../../core/api'
import { ref } from 'nativescript-vue'
interface forumHomeItem {
  type: string,
  lastThread: string,
  user: string,
  createdAt: string
}
const forumHomeList = ref<forumHomeItem[]>([])
getHomeForum().then(res => {
  console.log(res)
  forumHomeList.value = res
})
</script>
<style scoped lang="scss">
.item {
  border-bottom-width: 1px;
  border-color: #c0c0c0;
  padding: 60px;
}

.icon {
  background-color: #00796B;
  border-radius: 50%;
  margin-right: 10px;
}

.title {

  .label {
    font-size: 18px;
    font-weight: bold;
    color: #262626;
  }

  .illustrate {
    font-size: 14;
  }
}

.info {
  font-size: 14px;

  .label {
    color: #262626;
  }

  .number {
    padding: 0 20px;
  }
}

.last {
  padding-top: 40px;

  .label {
    color: #262626;
  }
}
</style>