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
        :block="block!"
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
        <MyButton class="button__create" @click="showCreateSlotDialog">
          Create Slot
        </MyButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useSlotsStore } from '../../../store/slots';
import MyButton from '@/components/common/MyButton.vue';
import MyDialog from '@/components/common/MyDialog.vue';
import CreateSlotForm from './components/CreateSlotForm.vue';
import CreateBlockForm from './components/CreateBlockForm.vue';
import EditBlockForm from './components/EditBlockForm.vue';
import SlotList from './components/SlotList.vue';
import type { Block } from '@/interfaces/Block';

interface Data {
  loading: boolean;
  dialogCreateSlotVisible: boolean;
  dialogCreateBlockVisible: boolean;
  dialogEditBlockVisible: boolean;
  slotId: number | null;
  block: Block | null;
}

export default defineComponent({
  name: 'SlotsPage',
  components: {
    MyButton,
    MyDialog,
    CreateSlotForm,
    CreateBlockForm,
    EditBlockForm,
    SlotList,
  },
  setup() {
    const slotsStore = useSlotsStore();
    const slots = computed(() => slotsStore.slots);
    const loadingGetSlots = computed(() => slotsStore.loadingGetSlots);
    const loadingCreateSlot = computed(() => slotsStore.loadingCreateSlot);
    const loadingDeleteSlot = computed(() => slotsStore.loadingDeleteSlot);
    const loadingCreateBlock = computed(() => slotsStore.loadingCreateBlock);
    const loadingEditBlock = computed(() => slotsStore.loadingEditBlock);
    const loadingDeleteBlock = computed(() => slotsStore.loadingDeleteBlock);
    return {
      slotsStore,
      slots,
      loadingGetSlots,
      loadingCreateSlot,
      loadingDeleteSlot,
      loadingCreateBlock,
      loadingEditBlock,
      loadingDeleteBlock,
    };
  },
  data(): Data {
    return {
      loading: true,
      dialogCreateSlotVisible: false,
      dialogCreateBlockVisible: false,
      dialogEditBlockVisible: false,
      slotId: null,
      block: null,
    };
  },
  mounted() {
    this.slotsStore.getSlots(+this.$route.params.pageId);
  },
  methods: {
    showCreateSlotDialog() {
      this.dialogCreateSlotVisible = true;
    },
    showCreateBlockDialog(slotId: number) {
      this.slotId = slotId;
      this.dialogCreateBlockVisible = true;
    },
    showEditBlockDialog(slotId: number, block: Block) {
      this.slotId = slotId;
      this.block = block;
      this.dialogEditBlockVisible = true;
    },
    openSlot(slotId: number) {
      this.$router.push(`/slots/${slotId}`);
    },
    async createSlot(slot: any) {
      await this.slotsStore.createSlot({
        pageId: +this.$route.params.pageId,
        type: slot.type,
      });
      this.dialogCreateSlotVisible = false;
    },
    async deleteSlot(id: number) {
      await this.slotsStore.deleteSlot(id);
    },
    async createBlock(slotId: number, block: Block) {
      await this.slotsStore.createBlock({
        slotId,
        type: block.type,
        content: block.content,
      });
      this.dialogCreateBlockVisible = false;
    },
    async editBlock(slotId: number, block: Block) {
      await this.slotsStore.editBlock(slotId, block.id, {
        type: block.type,
        content: block.content,
      });
      this.dialogEditBlockVisible = false;
    },
    async deleteBlock(slotId: number, blockId: number) {
      await this.slotsStore.deleteBlock(slotId, blockId);
    },
    async moveUpSlot(slotId: number) {
      const index = this.slots.findIndex((slot) => slot.id === slotId);
      if (index === 0) {
        return;
      }
      [this.slots[index - 1], this.slots[index]] = [
        this.slots[index],
        this.slots[index - 1],
      ];
      this.updateOrderSlots();
    },
    async moveDownSlot(slotId: number) {
      const index = this.slots.findIndex((slot) => slot.id === slotId);
      if (index === this.slots.length - 1) {
        return;
      }
      [this.slots[index + 1], this.slots[index]] = [
        this.slots[index],
        this.slots[index + 1],
      ];
      this.updateOrderSlots();
    },
    async moveLeftBlock(slotId: number, blockId: number) {
      const indexSlot = this.slots.findIndex((slot) => slot.id === slotId);
      const indexBlock = this.slots[indexSlot].blocks.findIndex(
        (block) => block.id === blockId
      );
      if (indexBlock === 0) {
        return;
      }
      [
        this.slots[indexSlot].blocks[indexBlock - 1],
        this.slots[indexSlot].blocks[indexBlock],
      ] = [
        this.slots[indexSlot].blocks[indexBlock],
        this.slots[indexSlot].blocks[indexBlock - 1],
      ];
      this.updateOrderBlocks(slotId);
    },
    async moveRightBlock(slotId: number, blockId: number) {
      const indexSlot = this.slots.findIndex((slot) => slot.id === slotId);
      const indexBlock = this.slots[indexSlot].blocks.findIndex(
        (block) => block.id === blockId
      );
      if (indexBlock === this.slots[indexSlot].blocks.length - 1) {
        return;
      }
      [
        this.slots[indexSlot].blocks[indexBlock + 1],
        this.slots[indexSlot].blocks[indexBlock],
      ] = [
        this.slots[indexSlot].blocks[indexBlock],
        this.slots[indexSlot].blocks[indexBlock + 1],
      ];
      this.updateOrderBlocks(slotId);
    },
    async updateOrderSlots() {
      await this.slotsStore.updateOrderSlots(
        +this.$route.params.pageId,
        this.slots.map((slot, index) => ({
          id: slot.id,
          order: index + 1,
        }))
      );
    },
    async updateOrderBlocks(slotId: number) {
      const indexSlot = this.slots.findIndex((slot) => slot.id === slotId);
      await this.slotsStore.updateOrderBlocks(
        slotId,
        this.slots[indexSlot].blocks.map((block, index) => ({
          id: block.id,
          order: index + 1,
        }))
      );
    },
  },
});
</script>

<style scoped>
@import 'slots.css';
.createSlot {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}
</style>
