<template>
  <input v-model="value" class="input" type="text" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style scoped>
.input {
  width: 100%;
  padding: 10px;
  border-radius: 2px;
  border: 0;
  background-color: #eeeeee;
  height: 40px;
  font-size: 15px;
  color: #554d56;
  caret-color: #419bf9;
  outline-color: #419bf9;
}
</style>
