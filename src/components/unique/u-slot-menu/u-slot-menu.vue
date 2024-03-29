<template>
  <div class="u-slot-menu">
    <CActionMenu
      :is-column="true"
      :options-list="optionsList"
      @action="handleAction"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import CActionMenu from '@/components/common/c-action-menu';

import type { PreparedSlot } from '@/types/slots/PreparedSlot';
import type { OptionsListItem } from '@/types/ActionMenu';
import type { MoveSlotData } from '@/types/slots/MoveSlotData';

import { MOVE_SLOT_DIRECTIONS } from '@/constants/move-directions';

enum E_ACTION {
  moveUpSlot = 'moveUpSlot',
  moveDownSlot = 'moveDownSlot',
  showCreateBlockDialog = 'showCreateBlockDialog',
  deleteSlot = 'deleteSlot',
}

interface IActionMap {
  [key: string]: () => void;
}

const props = defineProps<{
  mySlot: PreparedSlot;
  index: number;
  slotsLength: number;
}>();

const emit = defineEmits<{
  (e: 'moveSlot', data: MoveSlotData): void;
  (e: 'deleteSlot', slotId: number): void;
  (e: 'showCreateBlockDialog', slotId: number): void;
}>();

const optionsList = computed<OptionsListItem[]>(() => {
  return [
    {
      iconName: 'arrow_upward',
      isDisabled: props.index === 0,
      actionName: E_ACTION.moveUpSlot,
    },
    {
      iconName: 'arrow_downward',
      isDisabled: props.index === props.slotsLength - 1,
      actionName: E_ACTION.moveDownSlot,
    },
    {
      iconName: 'add',
      isDisabled: props.mySlot.type === 'STATIC',
      actionName: E_ACTION.showCreateBlockDialog,
    },
    {
      iconName: 'delete',
      isDisabled: false,
      actionName: E_ACTION.deleteSlot,
    },
  ];
});

const showCreateBlockDialog = () => {
  emit('showCreateBlockDialog', props.mySlot.id);
};

const moveUpSlot = () => {
  emit('moveSlot', {
    slotId: props.mySlot.id,
    direction: MOVE_SLOT_DIRECTIONS.UP,
  });
};

const moveDownSlot = () => {
  emit('moveSlot', {
    slotId: props.mySlot.id,
    direction: MOVE_SLOT_DIRECTIONS.DOWN,
  });
};

const deleteSlot = () => {
  emit('deleteSlot', props.mySlot.id);
};

const actionMap: IActionMap = {
  moveUpSlot,
  moveDownSlot,
  showCreateBlockDialog,
  deleteSlot,
};

const handleAction = (action: string) => {
  actionMap[action]?.();
};
</script>

<style lang="scss" src="./u-slot-menu.scss" />
