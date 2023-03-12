<template>
  <div class="u-block-menu">
    <CActionMenu
      :options-list="optionsList"
      @action="handleAction"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import CActionMenu from '@/components/common/c-action-menu';

import type { OptionsListItem } from '@/types/ActionMenu';
import type { PreparedSlot } from '@/types/slots/PreparedSlot';
import type { ApiBlock } from '@/types/blocks/ApiBlock';
import type { MoveBlockData } from '@/types/blocks/MoveBlockData';

import { MOVE_BLOCK_DIRECTIONS } from '@/constants/move-directions';

enum E_ACTION {
  showEditBlockDialog = 'showEditBlockDialog',
  moveLeftBlock = 'moveLeftBlock',
  moveRightBlock = 'moveRightBlock',
  deleteBlock = 'deleteBlock',
}

interface IActionMap {
  [key: string]: () => void;
}

const props = defineProps<{
  block: ApiBlock;
  blocks: ApiBlock[];
  mySlot: PreparedSlot;
  index: number;
  blocksLength: number;
}>();

const emit = defineEmits<{
  (e: 'showEditBlockDialog', slotId: number, block: ApiBlock): void;
  (e: 'moveBlock', data: MoveBlockData): void;
  (e: 'deleteBlock', slotId: number, blockId: number): void;
}>();

const optionsList = computed<OptionsListItem[]>(() => {
  return [
    {
      iconName: 'arrow_back',
      isDisabled: props.index === 0,
      actionName: E_ACTION.moveLeftBlock,
    },
    {
      iconName: 'arrow_forward',
      isDisabled: props.index === props.blocksLength - 1,
      actionName: E_ACTION.moveRightBlock,
    },
    {
      iconName: 'edit',
      isDisabled: false,
      actionName: E_ACTION.showEditBlockDialog,
    },
    {
      iconName: 'delete',
      isDisabled: false,
      actionName: E_ACTION.deleteBlock,
    },
  ];
});

const showEditBlockDialog = () => {
  emit('showEditBlockDialog', props.mySlot.id, props.block);
};

const moveLeftBlock = () => {
  emit('moveBlock', {
    slotId: props.mySlot.id,
    blockId: props.block.id,
    direction: MOVE_BLOCK_DIRECTIONS.LEFT
  });
};

const moveRightBlock = () => {
  emit('moveBlock', {
    slotId: props.mySlot.id,
    blockId: props.block.id,
    direction: MOVE_BLOCK_DIRECTIONS.RIGHT
  });
};

const deleteBlock = () => {
  emit('deleteBlock', props.mySlot.id, props.block.id);
};

const actionMap: IActionMap = {
  showEditBlockDialog,
  moveLeftBlock,
  moveRightBlock,
  deleteBlock,
};

const handleAction = (action: string) => {
  actionMap[action]?.();
}
</script>

<style lang="scss" src="./u-block-menu.scss" />
