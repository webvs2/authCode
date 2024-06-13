

<template>
  <div>
    <validate-input code="1234" :length="4" tips="请输入"></validate-input>
  </div>
</template>
<script setup lang="ts">
import ValidateInput from './packages/validateInput.vue'
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
