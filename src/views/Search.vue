<template>
  <Page>
    <ActionBar>
      <GridLayout rows="*" columns="*,16px">
        <TextField col="0" hint="搜索" class="search-input"/>
      </GridLayout>
    </ActionBar>
  </Page>
</template>
<style scoped lang="scss">
.search-input {
  background-color: #fff;
  border-radius: 50%;
  padding: 0 20;
  font-size: 14;
  height: 90px;
  color: #484848;
}
</style>