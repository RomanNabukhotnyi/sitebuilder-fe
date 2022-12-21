<template>
  <textarea :value="modelValue" @input="updateTextarea" class="input" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyTextarea',
  props: {
    modelValue: {
      type: [String, Number],
    },
  },
  methods: {
    updateTextarea(event: any) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
});
</script>

<style scoped>
.input {
  padding: 10px;
  border-radius: 2px;
  border: 0;
  background-color: #f7f7f7;
  height: 40px;
  font-size: 15px;
  color: #554d56;
  caret-color: #419bf9;
  outline-color: #419bf9;
}
</style>
