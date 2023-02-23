<template>
  <div
    ref="el"
    class="c-select"
  >
    <div
      class="selected"
      @click="optionsVisible = !optionsVisible"
    >
      <div>
        {{ selected }}
      </div>
      <CIconChevron :is-flip="optionsVisible" />
    </div>
    <Transition name="slide">
      <div
        v-if="optionsVisible"
        class="options"
      >
        <div
          v-for="option in options"
          :key="option.name"
          class="option"
          @click="selectOption(option)"
        >
          {{ option.name }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { Option } from '@/types/Option';

import CIconChevron from '../c-icon-chevron';

import { useEventListener } from '@/use/use-event-listener';

defineProps<{
  selected: string;
  options: Option[];
}>();

const emit = defineEmits<{
  (e: 'select', option: Option): void;
}>();

const { windowEventListener } = useEventListener();
const optionsVisible = ref(false);
const el = ref<HTMLElement | null>(null);

const selectOption = (option: Option) => {
  emit('select', option);
  optionsVisible.value = false;
};
const hideOptions = (event: Event) => {
  if (!el.value?.contains(event.target as Node)) {
    optionsVisible.value = false;
  }
};

windowEventListener('click', hideOptions);
</script>

<style lang="scss" src="./c-select.scss" />
