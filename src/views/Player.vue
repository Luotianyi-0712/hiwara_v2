<template>
  <Page>
    <video src="https://ro.qisato.com:2096/public/VID_20220416_033049_395.mp4"/>
  </Page>
</template>
<script setup lang="ts">
import { defineProps } from 'nativescript-vue'
const props = defineProps<{
  id: string;
}>();
</script>