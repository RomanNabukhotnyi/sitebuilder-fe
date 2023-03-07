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

import CIconAdd from '@/components/common/c-icon-add';
import CIconDelete from '@/components/common/c-icon-delete';
import CActionMenu from '@/components/common/c-action-menu';
import CIconArrowUp from '@/components/common/c-icon-arrow-up';
import CIconArrowDown from '@/components/common/c-icon-arrow-down';

import type { TOptionsList } from '@/types/ActionMenu';
import type { PreparedSlot } from '@/types/slots/PreparedSlot';

enum E_ACTION {
    moveUpSlot = 'moveUpSlot',
    moveDownSlot = 'moveDownSlot',
    showCreateBlockDialog = 'showCreateBlockDialog',
    deleteSlot = 'deleteSlot'
}

interface IActionMap {
    moveUpSlot: () => void
    moveDownSlot: () => void
    showCreateBlockDialog: () => void
    deleteSlot: () => void
}

const props = defineProps<{
  mySlot: PreparedSlot;
  index: number;
  slotsLength: number;
}>();

const emit = defineEmits<{
  (e: 'moveUpSlot', slotId: number): void;
  (e: 'moveDownSlot', slotId: number): void;
  (e: 'deleteSlot', slotId: number): void;
  (e: 'showCreateBlockDialog', slotId: number): void;
}>();

const showCreateBlockDialog = () => {
  emit('showCreateBlockDialog',  props.mySlot.id);
};

const moveUpSlot = () => {
  emit('moveUpSlot', props.mySlot.id);
};

const moveDownSlot = () => {
  emit('moveDownSlot', props.mySlot.id);
};

const deleteSlot = () => {
  emit('deleteSlot', props.mySlot.id);
};

const actionMap: IActionMap = {
    moveUpSlot,
    moveDownSlot,
    showCreateBlockDialog,
    deleteSlot
}

const optionsList = computed<TOptionsList>(() => {
    return [
        {
            iconComponent: CIconArrowUp,
            isDisabled: props.mySlot.order === 1,
            actionName: E_ACTION.moveUpSlot
        },
        {
            iconComponent: CIconArrowDown,
            isDisabled: props.index === props.slotsLength - 1,
            actionName: E_ACTION.moveDownSlot
        },
        {
            iconComponent: CIconAdd,
            isDisabled: props.mySlot.type === 'STATIC',
            actionName: E_ACTION.showCreateBlockDialog
        },
        {
            iconComponent: CIconDelete,
            isDisabled: false,
            actionName: E_ACTION.deleteSlot
        },
    ]
})

function handleAction(action: keyof typeof E_ACTION | string) {
    actionMap[action]?.()
}
</script>

<style lang="scss" src="./u-slot-menu.scss" />
