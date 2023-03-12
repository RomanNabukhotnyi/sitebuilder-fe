<template>
  <div class="u-slot-list">
    <div
      v-show="!loadingGetSlots && slots.length"
      class="slots"
    >
      <CTransitionList>
        <div
          v-for="(slot, index) in slots"
          :key="slot.id"
          :class="{ deleteSlot: isDeletedSlot(slot.id) }"
          class="slot"
        >
          <div
            v-if="slot.type === 'STATIC'"
            class="staticSlot"
          >
            STATIC
          </div>
          <div
            v-else-if="slot.blocks.length === 0 && slot.type !== 'STATIC'"
            class="emptySlot"
            @click="slot.type !== 'STATIC' && showCreateBlockDialog(slot.id)"
          >
            <CIcon icon-name="add" />
          </div>
          <UBlockList
            v-else
            :my-slot="slot"
            :loading-delete-block="loadingDeleteBlock"
            @show-edit-block-dialog="showEditBlockDialog"
            @move-block="moveBlock"
            @delete-block="deleteBlock"
          />
          <USlotMenu
            :index="index"
            :slots-length="slots.length"
            :my-slot="slot"
            class="slot-list__menu"
            @show-create-block-dialog="showCreateBlockDialog"
            @move-slot="moveSlot"
            @delete-slot="deleteSlot"
          />
        </div>
      </CTransitionList>
    </div>
    <div v-show="loadingGetSlots">
      <div
        v-for="item in 3"
        :key="item"
        class="slot-placeholder placeholder-animate"
        :style="{ animationDelay: `1.${item}s` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CIcon from '@/components/common/c-icon';
import CTransitionList from '@/components/common/c-transition-list';
import USlotMenu from '@/components/unique/u-slot-menu';
import UBlockList from '@/components/unique/u-block-list';

import type { PreparedSlot } from '@/types/slots/PreparedSlot';
import type { ApiBlock } from '@/types/blocks/ApiBlock';
import type { MoveBlockData } from '@/types/blocks/MoveBlockData';
import type { MoveSlotData } from '@/types/slots/MoveSlotData';

const props = defineProps<{
  slots: PreparedSlot[];
  loadingGetSlots: boolean;
  loadingDeleteSlot: boolean;
  loadingDeleteBlock: boolean;
}>();

const emit = defineEmits<{
  (e: 'moveSlot', data: MoveSlotData): void;
  (e: 'deleteSlot', slotId: number): void;
  (e: 'showCreateBlockDialog', slotId: number): void;
  (e: 'showEditBlockDialog', slotId: number, block: ApiBlock): void;
  (e: 'moveBlock', data: MoveBlockData): void;
  (e: 'deleteBlock', slotId: number, blockId: number): void;
}>();

const deleteId = ref<number | null>(null);
const isDeletedSlot = (slotId: number) => props.loadingDeleteSlot && slotId === deleteId.value;

const showCreateBlockDialog = (slotId: number) => {
  emit('showCreateBlockDialog', slotId);
};

const showEditBlockDialog = (slotId: number, block: ApiBlock) => {
  emit('showEditBlockDialog', slotId, block);
};

const moveSlot = (data: MoveSlotData) => {
  emit('moveSlot', data);
};

const deleteSlot = (id: number) => {
  deleteId.value = id;
  emit('deleteSlot', id);
};

const moveBlock = (data: MoveBlockData) => {
  emit('moveBlock', data);
};

const deleteBlock = (slotId: number, blockId: number) => {
  emit('deleteBlock', slotId, blockId);
};
</script>

<style lang="scss" src="./u-slot-list.scss" />
