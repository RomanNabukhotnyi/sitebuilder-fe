<template>
  <div>
    <MyDialog v-model:show="dialogCreateSlotVisible">
      <CreateSlotForm
        :loadingCreateSlot="loadingCreateSlot"
        @createSlot="createSlot"
      />
    </MyDialog>
    <MyDialog v-model:show="dialogCreateBlockVisible">
      <CreateBlockForm
        :slotId="slotId!"
        :loadingCreateBlock="loadingCreateBlock"
        @createBlock="createBlock"
      />
    </MyDialog>
    <MyDialog v-model:show="dialogEditBlockVisible">
      <EditBlockForm
        :slotId="slotId!"
        :block="editingBlock!"
        :loadingEditBlock="loadingEditBlock"
        @editBlock="editBlock"
      />
    </MyDialog>
    <div class="page">
      <SlotList
        :loadingGetSlots="loadingGetSlots"
        :loadingDeleteSlot="loadingDeleteSlot"
        :loadingDeleteBlock="loadingDeleteBlock"
        :slots="slots"
        @moveUpSlot="moveUpSlot"
        @moveDownSlot="moveDownSlot"
        @deleteSlot="deleteSlot"
        @createBlock="createBlock"
        @showCreateBlockDialog="showCreateBlockDialog"
        @showEditBlockDialog="showEditBlockDialog"
        @moveLeftBlock="moveLeftBlock"
        @moveRightBlock="moveRightBlock"
        @editBlock="editBlock"
        @deleteBlock="deleteBlock"
      />
      <div class="createSlot">
        <MyButton @click="showCreateSlotDialog">Create Slot</MyButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSlotsStore } from '@/stores/slots';
import MyButton from '@/components/common/MyButton.vue';
import MyDialog from '@/components/common/MyDialog.vue';
import CreateSlotForm from './components/CreateSlotForm.vue';
import CreateBlockForm from './components/CreateBlockForm.vue';
import EditBlockForm from './components/EditBlockForm.vue';
import SlotList from './components/SlotList.vue';
import type { Block } from '@/interfaces/Block';
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
let editingBlock: Block | null = null;
onMounted(() => {
  slotsStore.getSlots(+route.params.pageId);
});
const showCreateSlotDialog = () => {
  dialogCreateSlotVisible.value = true;
};
const showCreateBlockDialog = (id: number) => {
  slotId.value = id;
  dialogCreateBlockVisible.value = true;
};
const showEditBlockDialog = (id: number, block: Block) => {
  slotId.value = id;
  editingBlock = block;
  dialogEditBlockVisible.value = true;
};
const createSlot = async (slot: any) => {
  await slotsStore.createSlot({
    pageId: +route.params.pageId,
    type: slot.type,
  });
  dialogCreateSlotVisible.value = false;
};
const deleteSlot = async (id: number) => {
  await slotsStore.deleteSlot(id);
};
const createBlock = async (slotId: number, block: Block) => {
  await slotsStore.createBlock({
    slotId,
    type: block.type,
    content: block.content,
  });
  dialogCreateBlockVisible.value = false;
};
const editBlock = async (
  slotId: number,
  block: Pick<Block, 'id' | 'type' | 'content'>
) => {
  await slotsStore.editBlock(slotId, block.id, {
    type: block.type,
    content: block.content,
  });
  dialogEditBlockVisible.value = false;
};
const deleteBlock = async (slotId: number, blockId: number) => {
  await slotsStore.deleteBlock(slotId, blockId);
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
  await slotsStore.updateOrderSlots(
    +route.params.pageId,
    slots.value.map((slot, index) => ({
      id: slot.id,
      order: index + 1,
    }))
  );
};
const updateOrderBlocks = async (slotId: number) => {
  const indexSlot = slots.value.findIndex((slot) => slot.id === slotId);
  await slotsStore.updateOrderBlocks(
    slotId,
    slots.value[indexSlot].blocks.map((block, index) => ({
      id: block.id,
      order: index + 1,
    }))
  );
};
</script>

<style scoped>
.page {
  width: 90%;
  position: relative;
  margin: 15px auto;
  outline: 1px solid #bcb5b9;
}
.createSlot {
  border: 1px dashed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
