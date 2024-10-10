<template>
  <Page>
    <Label :text="id" />
  </Page>
</template>
<script setup lang="ts">
import { defineProps } from 'nativescript-vue'
const props = defineProps<{
  id: string;
}>();
</script>