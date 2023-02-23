<template>
  <div class="u-block-menu">
    <div
      class="menuAction moveLeftAction"
      @click="moveLeftBlock"
    >
      <CIconArrow />
    </div>
    <div
      class="menuAction moveRightAction"
      @click="moveRightBlock"
    >
      <CIconArrow />
    </div>
    <div
      class="menuAction"
      @click="showEditBlockDialog"
    >
      <CIconEdit />
    </div>
    <div
      class="menuAction"
      @click="deleteBlock"
    >
      <CIconDelete />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PreparedSlot } from '@/types/slots/PreparedSlot';
import type { ApiBlock } from '@/types/blocks/ApiBlock';

import CIconArrow from '@/components/common/c-icon-arrow';
import CIconDelete from '@/components/common/c-icon-delete';
import CIconEdit from '@/components/common/c-icon-edit';

const props = defineProps<{
  block: ApiBlock;
  blocks: ApiBlock[];
  mySlot: PreparedSlot;
}>();
const emit = defineEmits<{
  (e: 'showEditBlockDialog', slotId: number, block: ApiBlock): void;
  (e: 'moveLeftBlock', slotId: number, blockId: number): void;
  (e: 'moveRightBlock', slotId: number, blockId: number): void;
  (e: 'deleteBlock', slotId: number, blockId: number): void;
}>();
const showEditBlockDialog = () => {
  emit('showEditBlockDialog', props.mySlot.id, props.block);
};
const moveLeftBlock = () => {
  if (props.blocks.findIndex((block) => block.id === props.block.id) !== 0) {
    emit('moveLeftBlock', props.mySlot.id, props.block.id);
  }
};
const moveRightBlock = () => {
  if (
    props.blocks.findIndex((block) => block.id === props.block.id) !==
    props.blocks.length - 1
  ) {
    emit('moveRightBlock', props.mySlot.id, props.block.id);
  }
};
const deleteBlock = () => {
  emit('deleteBlock', props.mySlot.id, props.block.id);
};
</script>

<style lang="scss" src="./u-block-menu.scss" />
