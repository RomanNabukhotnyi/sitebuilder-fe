<template>
  <div class="u-slot-create-form">
    <h4>Create slot</h4>
    <CSelect
      v-model="selectedType"
      class="select"
      :selected="'Type: ' + selectedType"
      :options="options"
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
import { SLOT_TYPES } from '@/constants/slot-types';

defineProps<{
  loadingCreateSlot: boolean;
}>();

const emit = defineEmits<{
  (e: 'createSlot', value: { type: string }): void;
}>();

const { windowEventListener } = useEventListener();
const selectedType = ref(SLOT_TYPES.DYNAMIC);
const options = [
  { name: 'static', value: 'STATIC' },
  { name: 'dynamic', value: 'DYNAMIC' },
];

const createSlot = () => {
  emit('createSlot', {
    type: selectedType.value,
  });
};

windowEventListener('keyup', (event) => {
  if (event.code === 'Enter') {
    createSlot();
  }
});
</script>

<style lang="scss" src="./u-slot-create-form.scss" />
