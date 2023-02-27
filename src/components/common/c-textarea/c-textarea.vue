<template>
  <textarea
    v-model="value"
    class="c-textarea textarea"
    @blur="touch"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'touch'): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const touch = () => {
  emit('touch');
}
</script>

<style lang="scss" src="./c-textarea.scss" />
