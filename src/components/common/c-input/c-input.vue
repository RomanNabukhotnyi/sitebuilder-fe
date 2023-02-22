<template>
  <input
    v-model="value"
    :type="type"
    :placeholder="placeholder"
    class="c-input"
  >
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
    modelValue?: string | null;
    type?: 'text' | 'password' | 'email' | 'number';
    placeholder?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    modelValue: null,
    type: 'text',
    placeholder: ''
});

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

<style lang="scss" src="./c.input.scss" />
