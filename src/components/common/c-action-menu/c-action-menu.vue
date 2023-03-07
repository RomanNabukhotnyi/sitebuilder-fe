<template>
  <div class="c-action-menu">
    <div
      :class="{ 'action-menu__list--column': isColumn }"
      class="action-menu__list"
    >
      <div
        v-for="option in optionsList"
        :key="option.iconName"
        :class="{ 'action-menu__list-item--disabled': option.isDisabled }"
        class="action-menu__list-item"
        @click="handleActionClick(option)"
      >
        <CIcon :icon-name="option.iconName" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CIcon from '../c-icon';

import type { OptionsListItem } from '@/types/ActionMenu';

interface IProps {
  optionsList: OptionsListItem[];
  isColumn?: boolean;
}

withDefaults(defineProps<IProps>(), {
  isColumn: false,
});

const emit = defineEmits<{
  (e: 'action', action: string): void;
}>();

function handleActionClick(option: OptionsListItem) {
  if (option.isDisabled) return;

  emit('action', option.actionName);
}
</script>

<style lang="scss" src="./c-action-menu.scss" />
