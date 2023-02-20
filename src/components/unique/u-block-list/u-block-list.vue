<template>
  <div class="u-block-list">
    <TransitionGroup name="blockList">
      <div
        v-for="block in mySlot.blocks"
        :key="block.id"
        :class="{
          block: true,
          deleteBlock: loadingDeleteBlock && block.id === deleteId,
        }"
      >
        <div
          v-if="block.type === 'IMAGE'"
          class="type__image"
          :style="{
            width: block.styles ? (block.styles as ImageStyles).width : undefined,
            height: block.styles ? (block.styles as ImageStyles).height : undefined,
          }"
        >
          <img :src="(block.content as ImageContent).url">
        </div>
        <div
          v-if="block.type === 'TEXT'"
          class="type__text"
          :style="{
            fontWeight: block.styles ? (block.styles as TextStyles).fontWeight : undefined,
            fontSize: block.styles ? (block.styles as TextStyles).fontSize : undefined,
            color: block.styles ? (block.styles as TextStyles).color : undefined,
          } as StyleValue"
        >
          {{ (block.content as TextContent).text }}
        </div>
        <UBlockMenu
          :block="block"
          :blocks="mySlot.blocks"
          :my-slot="mySlot"
          @show-edit-block-dialog="showEditBlockDialog"
          @move-left-block="moveLeftBlock"
          @move-right-block="moveRightBlock"
          @delete-block="deleteBlock"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, type StyleValue } from 'vue';

import type { PreparedSlot } from '@/types/slots/PreparedSlot';
import type { ApiBlock } from '@/types/blocks/ApiBlock';
import type { ImageStyles } from '@/types/blocks/ImageStyles';
import type { ImageContent } from '@/types/blocks/ImageContent';
import type { TextContent } from '@/types/blocks/TextContent';
import type { TextStyles } from '@/types/blocks/TextStyles';

import UBlockMenu from '../u-block-menu';

defineProps<{
  mySlot: PreparedSlot;
  loadingDeleteBlock: boolean;
}>();

const emit = defineEmits<{
  (e: 'showEditBlockDialog', slotId: number, block: ApiBlock): void;
  (e: 'moveLeftBlock', slotId: number, blockId: number): void;
  (e: 'moveRightBlock', slotId: number, blockId: number): void;
  (e: 'deleteBlock', slotId: number, blockId: number): void;
}>();

const deleteId = ref<number | null>(null);

const showEditBlockDialog = (slotId: number, block: ApiBlock) => {
  emit('showEditBlockDialog', slotId, block);
};
const moveLeftBlock = (slotId: number, blockId: number) => {
  emit('moveLeftBlock', slotId, blockId);
};
const moveRightBlock = (slotId: number, blockId: number) => {
  emit('moveRightBlock', slotId, blockId);
};
const deleteBlock = (slotId: number, blockId: number) => {
  deleteId.value = blockId;
  emit('deleteBlock', slotId, blockId);
};
</script>

<style lang="scss" src="./u-block-list.scss" />
