<template>
  <form
    class="u-block-create-form"
    @submit.prevent="createBlock"
  >
    <h4>Create block</h4>
    <CSelect
      v-model="selectedType"
      class="select"
      :selected="'Type: ' + selectedType"
      :options="options"
    />
    <div v-if="selectedType === BLOCK_TYPES.TEXT">
      <CFieldList
        v-model:fields="formText.fields"
        :is-show-errors="isSubmitted"
      />
    </div>
    <div v-else-if="selectedType === BLOCK_TYPES.IMAGE">
      <CFieldList
        v-model:fields="formImage.fields"
        :is-show-errors="isSubmitted"
      />
    </div>
    <CButton
      :is-loading="loadingCreateBlock"
      :is-disabled="loadingCreateBlock"
      type="submit"
      label="Create"
      class="button"
    />
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

import type { ApiBlock } from '@/types/blocks/ApiBlock';

import CSelect from '@/components/common/c-select';
import CButton from '@/components/common/c-button';
import CFieldList from '@/components/common/c-field-list';

import { useCreateFormBlockText } from './use/useCreateFormBlockText';
import { useCreateFormBlockImage } from './use/useCreateFormBlockImage';

import { BLOCK_TYPES } from '@/constants/block-types';

const props = defineProps<{
  slotId: number;
  loadingCreateBlock: boolean;
}>();

const emit = defineEmits<{
  (e: 'createBlock', slotId: number, value: ApiBlock): void;
}>();

const formText = useCreateFormBlockText();
const formImage = useCreateFormBlockImage();
const selectedType = ref(BLOCK_TYPES.TEXT);
const options = [
  { name: 'text', value: BLOCK_TYPES.TEXT },
  { name: 'image', value: BLOCK_TYPES.IMAGE },
];
const isFormValid = computed(() =>
  selectedType.value === BLOCK_TYPES.TEXT
    ? formText.isValid.value
    : formImage.isValid.value
);
const isSubmitted = ref(false);

const createBlock = () => {
  isSubmitted.value = true;

  if (!isFormValid.value) return;

  const { content, attributes, styles } =
    selectedType.value === BLOCK_TYPES.TEXT
      ? formText.getData()
      : formImage.getData();

  emit('createBlock', props.slotId, {
    type: selectedType.value,
    content,
    attributes,
    styles,
  } as unknown as ApiBlock);
};

watch(selectedType, () => {
  if (selectedType.value === BLOCK_TYPES.TEXT) {
    formText.reset();
  } else {
    formImage.reset();
  }
});
</script>

<style lang="scss" src="./u-block-create-form.scss" />
