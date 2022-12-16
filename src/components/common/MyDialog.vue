<template>
  <div class="dialog" v-show="show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false);
    },
  },
});
</script>

<style scoped>
.dialog {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  z-index: 999;
}
.dialog__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  padding: 20px;
}
</style>
