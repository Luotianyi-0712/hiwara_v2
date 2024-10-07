<template>
  <div style="height: 150vh;">
    <!-- 滚动内容 -->
    <div style="height: 100vh;"></div>
    <!-- 当这个元素进入视口时，将触发事件 -->
    <div id="elementA" style="height: 50px; background-color: lightblue;">
      Element A
    </div>
    <div style="height: 100vh;"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

const onElementBecomesVisible = () => {
  console.log('Event B triggered because Element A is visible');
  // 在这里执行事件B的逻辑
};

const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  observer.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        onElementBecomesVisible();
      }
    });
  }, options);

  const elementA = document.getElementById('elementA');
  if (elementA) {
    observer.value.observe(elementA);
  }
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>
