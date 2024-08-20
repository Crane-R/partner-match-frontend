

<template>

  <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
  />



</template>

<script setup lang="ts">

import { ref } from 'vue';
const active = ref('s');


</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
