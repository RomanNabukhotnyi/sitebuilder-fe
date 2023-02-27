<template>
  <input
    v-model="value"
    :type="type"
    :placeholder="placeholder"
    class="c-input"
    @blur="touch"
  >
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
     modelValue?: string;
     type?: 'text' | 'password' | 'email' | 'number';
     placeholder?: string;
 }

 const props = withDefaults(defineProps<IProps>(), {
     modelValue: '',
     type: 'text',
     placeholder: ''
 });

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

<style lang="scss" src="./c.input.scss" />
