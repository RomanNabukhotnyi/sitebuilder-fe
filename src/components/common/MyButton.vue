<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
.btn {
  position: relative;
  display: flex;
  background-color: #419bf9;
  color: #fff;
  height: 28px;
  border-radius: 2px;
  font-size: 15px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px;
}
</style>
