<template>
  <div class="u-slot-create-form">
    <h4>Create slot</h4>
    <CSelect
      class="select"
      :selected="'Type: ' + selected"
      :options="options"
      @select="selectOption"
    />
    <CButton
      :is-loading="loadingCreateSlot"
      :is-disabled="loadingCreateSlot"
      label="Create"
      class="button"
      @click="createSlot"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CButton from '@/components/common/c-button';
import CSelect from '@/components/common/c-select';

import { useEventListener } from '@/use/use-event-listener';
import type { Option } from '@/types/Option';

defineProps<{
  loadingCreateSlot: boolean;
}>();

const emit = defineEmits<{
  (e: 'createSlot', value: { type: 'STATIC' | 'DYNAMIC' }): void;
}>();

const { windowEventListener } = useEventListener();
const type = ref<'STATIC' | 'DYNAMIC'>('DYNAMIC');
const selected = ref('dynamic');
const options = [
  { name: 'static', value: 'STATIC' },
  { name: 'dynamic', value: 'DYNAMIC' },
];

const createSlot = () => {
  emit('createSlot', {
    type: type.value,
  });
};
const selectOption = (option: Option<'STATIC' | 'DYNAMIC'>) => {
  type.value = option.value;
  selected.value = option.name;
};

windowEventListener('keyup', (event) => {
  if (event.code === 'Enter') {
    createSlot();
  }
});
</script>

<style lang="scss" src="./u-slot-create-form.scss" />
