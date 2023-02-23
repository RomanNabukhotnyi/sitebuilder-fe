<template>
  <div class="u-slot-menu">
    <div
      class="menuAction moveUpAction"
      @click="moveUpSlot"
    >
      <CIconArrow />
    </div>
    <div
      class="menuAction moveDownAction"
      @click="moveDownSlot"
    >
      <CIconArrow />
    </div>
    <div
      :class="mySlot.type === 'STATIC' ? 'disabled' : 'menuAction'"
      @click="mySlot.type !== 'STATIC' && showCreateBlockDialog(mySlot.id)"
    >
      <CIconAdd />
    </div>
    <div
      class="menuAction"
      @click="deleteSlot"
    >
      <CIconDelete />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PreparedSlot } from '@/types/slots/PreparedSlot';

import CIconArrow from '@/components/common/c-icon-arrow';
import CIconDelete from '@/components/common/c-icon-delete';
import CIconAdd from '@/components/common/c-icon-add';

const props = defineProps<{
  mySlot: PreparedSlot;
}>();

const emit = defineEmits<{
  (e: 'moveUpSlot', slotId: number): void;
  (e: 'moveDownSlot', slotId: number): void;
  (e: 'deleteSlot', slotId: number): void;
  (e: 'showCreateBlockDialog', slotId: number): void;
}>();

const showCreateBlockDialog = (slotId: number) => {
  emit('showCreateBlockDialog', slotId);
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
</script>

<style lang="scss" src="./u-slot-menu.scss" />
