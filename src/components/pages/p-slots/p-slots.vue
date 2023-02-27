<template>
  <div class="p-slots">
    <CModal v-model:show="dialogCreateSlotVisible">
      <USlotCreateForm
        :loading-create-slot="loadingCreateSlot"
        @create-slot="createSlot"
      />
    </CModal>
    <CModal v-model:show="dialogCreateBlockVisible">
      <UBlockCreateForm
        :slot-id="slotId!"
        :loading-create-block="loadingCreateBlock"
        @create-block="createBlock"
      />
    </CModal>
    <CModal v-model:show="dialogEditBlockVisible">
      <UBlockEditForm
        :slot-id="slotId!"
        :block="editingBlock!"
        :loading-edit-block="loadingEditBlock"
        @edit-block="editBlock"
      />
    </CModal>
    <div class="page">
      <USlotList
        :loading-get-slots="loadingGetSlots"
        :loading-delete-slot="loadingDeleteSlot"
        :loading-delete-block="loadingDeleteBlock"
        :slots="slots"
        @move-up-slot="moveUpSlot"
        @move-down-slot="moveDownSlot"
        @delete-slot="deleteSlot"
        @create-block="createBlock"
        @show-create-block-dialog="showCreateBlockDialog"
        @show-edit-block-dialog="showEditBlockDialog"
        @move-left-block="moveLeftBlock"
        @move-right-block="moveRightBlock"
        @edit-block="editBlock"
        @delete-block="deleteBlock"
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

import type { ApiBlock } from '@/types/blocks/ApiBlock';
import type { ApiUpdateBlock } from '@/types/blocks/ApiUpdateBlock';

import CButton from '@/components/common/c-button';
import CModal from '@/components/common/c-modal';
import USlotCreateForm from '@/components/unique/u-slot-create-form';
import UBlockCreateForm from '@/components/unique/u-block-create-form';
import UBlockEditForm from '@/components/unique/u-block-edit-form';
import USlotList from '@/components/unique/u-slot-list';

import { useSlotsStore } from '@/stores/slots';

const slotsStore = useSlotsStore();
const route = useRoute();
const slots = computed(() => slotsStore.slots);
const loadingGetSlots = computed(() => slotsStore.loadingGetSlots);
const loadingCreateSlot = computed(() => slotsStore.loadingCreateSlot);
const loadingDeleteSlot = computed(() => slotsStore.loadingDeleteSlot);
const loadingCreateBlock = computed(() => slotsStore.loadingCreateBlock);
const loadingEditBlock = computed(() => slotsStore.loadingEditBlock);
const loadingDeleteBlock = computed(() => slotsStore.loadingDeleteBlock);
const dialogCreateSlotVisible = ref(false);
const dialogCreateBlockVisible = ref(false);
const dialogEditBlockVisible = ref(false);
const slotId = ref<number | null>(null);
let editingBlock: ApiBlock | null = null;

const showCreateSlotDialog = () => {
  dialogCreateSlotVisible.value = true;
};
const showCreateBlockDialog = (id: number) => {
  slotId.value = id;
  dialogCreateBlockVisible.value = true;
};
const showEditBlockDialog = (id: number, block: ApiBlock) => {
  slotId.value = id;
  editingBlock = block;
  dialogEditBlockVisible.value = true;
};
const createSlot = async (slot: { type: string }) => {
  await slotsStore.createSlot(+route.params.projectId, {
    pageId: +route.params.pageId,
    type: slot.type,
  });
  dialogCreateSlotVisible.value = false;
};
const deleteSlot = async (id: number) => {
  await slotsStore.deleteSlot(id, +route.params.projectId);
};
const createBlock = async (slotId: number, block: ApiBlock) => {
  await slotsStore.createBlock(+route.params.projectId, {
    slotId,
    type: block.type,
    content: block.content,
    attributes: block.attributes,
    styles: block.styles,
  });
  dialogCreateBlockVisible.value = false;
};
const editBlock = async (
  slotId: number,
  blockId: number,
  block: ApiUpdateBlock
) => {
  await slotsStore.updateBlock(slotId, blockId, +route.params.projectId, {
    type: block.type,
    content: block.content,
    attributes: block.attributes,
    styles: block.styles,
  });
  dialogEditBlockVisible.value = false;
};
const deleteBlock = async (slotId: number, blockId: number) => {
  await slotsStore.deleteBlock(slotId, blockId, +route.params.projectId);
};
const moveUpSlot = async (slotId: number) => {
  const index = slots.value.findIndex((slot) => slot.id === slotId);
  if (index === 0) {
    return;
  }
  [slots.value[index - 1], slots.value[index]] = [
    slots.value[index],
    slots.value[index - 1],
  ];
  updateOrderSlots();
};
const moveDownSlot = async (slotId: number) => {
  const index = slots.value.findIndex((slot) => slot.id === slotId);
  if (index === slots.value.length - 1) {
    return;
  }
  [slots.value[index + 1], slots.value[index]] = [
    slots.value[index],
    slots.value[index + 1],
  ];
  updateOrderSlots();
};
const moveLeftBlock = async (slotId: number, blockId: number) => {
  const indexSlot = slots.value.findIndex((slot) => slot.id === slotId);
  const indexBlock = slots.value[indexSlot].blocks.findIndex(
    (block) => block.id === blockId
  );
  if (indexBlock === 0) {
    return;
  }
  [
    slots.value[indexSlot].blocks[indexBlock - 1],
    slots.value[indexSlot].blocks[indexBlock],
  ] = [
    slots.value[indexSlot].blocks[indexBlock],
    slots.value[indexSlot].blocks[indexBlock - 1],
  ];
  updateOrderBlocks(slotId);
};
const moveRightBlock = async (slotId: number, blockId: number) => {
  const indexSlot = slots.value.findIndex((slot) => slot.id === slotId);
  const indexBlock = slots.value[indexSlot].blocks.findIndex(
    (block) => block.id === blockId
  );
  if (indexBlock === slots.value[indexSlot].blocks.length - 1) {
    return;
  }
  [
    slots.value[indexSlot].blocks[indexBlock + 1],
    slots.value[indexSlot].blocks[indexBlock],
  ] = [
    slots.value[indexSlot].blocks[indexBlock],
    slots.value[indexSlot].blocks[indexBlock + 1],
  ];
  updateOrderBlocks(slotId);
};
const updateOrderSlots = async () => {
  await slotsStore.updateSlotOrder(
    +route.params.pageId,
    +route.params.projectId,
    slots.value.map((slot, index) => ({
      id: slot.id,
      order: index + 1,
    }))
  );
};
const updateOrderBlocks = async (slotId: number) => {
  const indexSlot = slots.value.findIndex((slot) => slot.id === slotId);
  await slotsStore.updateBlockOrder(
    slotId,
    +route.params.projectId,
    slots.value[indexSlot].blocks.map((block, index) => ({
      id: block.id,
      order: index + 1,
    }))
  );
};

onMounted(() => {
  slotsStore.getSlots(+route.params.pageId, +route.params.projectId);
});
</script>

<style lang="scss" src="./p-slots.scss" />
