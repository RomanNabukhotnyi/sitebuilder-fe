<template>
  <form
    class="u-block-edit-form"
    @submit.prevent="editBlock"
  >
    <h4>Edit block</h4>
    <div v-if="block.type === BLOCK_TYPES.TEXT">
      <CFieldList
        v-model:fields="formText.fields"
        :is-show-errors="isSubmitted"
      />
    </div>
    <div v-else-if="block.type === BLOCK_TYPES.IMAGE">
      <CFieldList
        v-model:fields="formImage.fields"
        :is-show-errors="isSubmitted"
      />
    </div>
    <CButton
      :is-loading="loadingEditBlock"
      :is-disabled="loadingEditBlock"
      type="submit"
      label="Edit"
      class="button"
    />
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import type { ApiBlock } from '@/types/blocks/ApiBlock';
import type { ApiUpdateBlock } from '@/types/blocks/ApiUpdateBlock';

import CButton from '@/components/common/c-button';
import CFieldList from '@/components/common/c-field-list';

import { useEditFormBlockText } from './use/useEditFormBlockText';
import { useEditFormBlockImage } from './use/useEditFormBlockImage';
import { BLOCK_TYPES } from '@/constants/block-types';

const props = defineProps<{
  slotId: number;
  block: ApiBlock;
  loadingEditBlock: boolean;
}>();

const emit = defineEmits<{
  (
    e: 'editBlock',
    slotId: number,
    blockId: number,
    block: ApiUpdateBlock
  ): void;
}>();

const formText = useEditFormBlockText(props.block);
const formImage = useEditFormBlockImage(props.block);
const isFormValid = computed(() =>
  props.block.type === BLOCK_TYPES.TEXT
    ? formText.isValid.value
    : formImage.isValid.value
);
const isSubmitted = ref(false);

const editBlock = () => {
  isSubmitted.value = true;

  if (!isFormValid.value) return;

  const { content, attributes, styles } =
    props.block.type === BLOCK_TYPES.TEXT
      ? formText.getData()
      : formImage.getData();

  emit('editBlock', props.slotId, props.block.id, {
    type: props.block.type,
    content,
    attributes,
    styles,
  });
};
</script>

<style lang="scss" src="./u-block-edit-form.scss" />
