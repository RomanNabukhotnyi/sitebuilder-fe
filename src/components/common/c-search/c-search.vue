<template>
  <div class="c-search">
    <CIconSearch class="search__icon" />
    <CInput
      v-model="value"
      class="search__input"
      placeholder="Filter by name"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import CInput from '../c-input';
import CIconSearch from '../c-icon-search';

interface IProps {
     modelValue: string;
     placeholder?: string;
 }

 const props = withDefaults(defineProps<IProps>(), {
     modelValue: '',
     placeholder: ''
 });

const emit = defineEmits<{
  (e: 'update:modelValue', searchQuery: string): void;
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

<style lang="scss" src="./c-search.scss" />
