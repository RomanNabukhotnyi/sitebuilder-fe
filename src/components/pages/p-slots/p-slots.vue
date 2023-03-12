<template>
  <div class="p-slots">
    <CModal v-model:show="dialogCreateSlotVisible">
      <USlotCreateForm
        :loading-create-slot="loadingCreateSlot"
        @create-slot="handleCreateSlot"
      />
    </CModal>
    <CModal v-model:show="dialogCreateBlockVisible">
      <UBlockCreateForm
        :slot-id="slotId!"
        :loading-create-block="loadingCreateBlock"
        @create-block="handleCreateBlock"
      />
    </CModal>
    <CModal v-model:show="dialogEditBlockVisible">
      <UBlockEditForm
        :slot-id="slotId!"
        :block="editingBlock!"
        :loading-edit-block="loadingEditBlock"
        @edit-block="handleEditBlock"
      />
    </CModal>
    <div class="page">
      <USlotList
        :loading-get-slots="loadingGetSlots"
        :loading-delete-slot="loadingDeleteSlot"
        :loading-delete-block="loadingDeleteBlock"
        :slots="slots"
        @move-slot="handleMoveSlot"
        @delete-slot="handleDeleteSlot"
        @create-block="handleCreateBlock"
        @show-create-block-dialog="showCreateBlockDialog"
        @show-edit-block-dialog="showEditBlockDialog"
        @move-block="handleMoveBlock"
        @edit-block="handleEditBlock"
        @delete-block="handleDeleteBlock"
      />
      <div class="createSlot">
        <CButton
          label="Create Slot"
          @click="showCreateSlotDialog"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import CButton from '@/components/common/c-button';
import CModal from '@/components/common/c-modal';
import USlotCreateForm from '@/components/unique/u-slot-create-form';
import UBlockCreateForm from '@/components/unique/u-block-create-form';
import UBlockEditForm from '@/components/unique/u-block-edit-form';
import USlotList from '@/components/unique/u-slot-list';

import type { ApiBlock } from '@/types/blocks/ApiBlock';
import type { ApiUpdateBlock } from '@/types/blocks/ApiUpdateBlock';
import type { MoveBlockData } from '@/types/blocks/MoveBlockData';
import type { MoveSlotData } from '@/types/slots/MoveSlotData';

import { useSlotsStore } from '@/stores/slots';
import { findIndexByKey, swap } from '@/services/array-manipulations-service';

const slotsStore = useSlotsStore();
const route = useRoute();

const {
  slots,
  loadingGetSlots,
  loadingCreateSlot,
  loadingDeleteSlot,
  loadingCreateBlock,
  loadingEditBlock,
  loadingDeleteBlock,
} = storeToRefs(slotsStore);
const dialogCreateSlotVisible = ref(false);
const dialogCreateBlockVisible = ref(false);
const dialogEditBlockVisible = ref(false);
const slotId = ref<number | null>(null);
const editingBlock = ref<ApiBlock | null>(null);
const pageId = computed<number>(() => +route.params.pageId);
const projectId = computed<number>(() => +route.params.projectId);

const showCreateSlotDialog = () => {
  dialogCreateSlotVisible.value = true;
};

const showCreateBlockDialog = (id: number) => {
  slotId.value = id;
  dialogCreateBlockVisible.value = true;
};

const showEditBlockDialog = (id: number, block: ApiBlock) => {
  slotId.value = id;
  editingBlock.value = block;
  dialogEditBlockVisible.value = true;
};

const handleCreateSlot = async (slot: { type: string }) => {
  await slotsStore.createSlot(projectId.value, {
    pageId: pageId.value,
    type: slot.type,
  });
  dialogCreateSlotVisible.value = false;
};

const handleDeleteSlot = (id: number) => {
  slotsStore.deleteSlot(id, projectId.value);
};

const handleCreateBlock = async (slotId: number, block: ApiBlock) => {
  await slotsStore.createBlock(projectId.value, {
    slotId,
    type: block.type,
    content: block.content,
    attributes: block.attributes,
    styles: block.styles,
  });
  dialogCreateBlockVisible.value = false;
};

const handleEditBlock = async (
  slotId: number,
  blockId: number,
  block: ApiUpdateBlock
) => {
  await slotsStore.updateBlock({
    slotId,
    blockId,
    projectId: projectId.value,
    payload: {
      type: block.type,
      content: block.content,
      attributes: block.attributes,
      styles: block.styles,
    },
  });
  dialogEditBlockVisible.value = false;
};

const handleDeleteBlock = (slotId: number, blockId: number) => {
  slotsStore.deleteBlock({ slotId, blockId, projectId: projectId.value });
};

const handleMoveSlot = ({ slotId, direction }: MoveSlotData) => {
  const indexSlot = findIndexByKey(slots.value, 'id', slotId);
  swap(slots.value, indexSlot, direction);
  slotsStore.updateSlotOrder({
    pageId: pageId.value,
    projectId: projectId.value,
    slots: slots.value,
  });
};

const handleMoveBlock = ({ slotId, blockId, direction }: MoveBlockData) => {
  const indexSlot = findIndexByKey(slots.value, 'id', slotId);
  const blocks = slots.value[indexSlot].blocks;
  const indexBlock = findIndexByKey(blocks, 'id', blockId);
  swap(blocks, indexBlock, direction);
  slotsStore.updateBlockOrder({
    slotId,
    projectId: projectId.value,
    blocks,
  });
};

onMounted(() => {
  slotsStore.getSlots(pageId.value, projectId.value);
});
</script>

<style lang="scss" src="./p-slots.scss" />
