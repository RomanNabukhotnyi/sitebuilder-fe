<template>
  <div class="page">
    <SlotList
      :slots="getAllSlots"
      @create="createBlock"
      @deleteSlot="deleteSlot"
      @editBlock="editBlock"
      @moveUp="moveUpSlot"
      @moveDown="moveDownSlot"
      @deleteBlock="deleteBlock"
      @moveLeft="moveLeftBlock"
      @moveRight="moveRightBlock"
    />
    <div class="createSlot">
      <MyDialog v-model:show="dialogVisible">
        <CreateSlotForm @create="createSlot" />
      </MyDialog>
      <MyButton class="button__create" @click="showDialog">
        Create Slot
      </MyButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSlotsStore } from '../../../stores/slots';
import { useBlocksStore } from '../../../stores/blocks';
import MyButton from '@/components/common/MyButton.vue';
import MyDialog from '@/components/common/MyDialog.vue';
import CreateSlotForm from './components/CreateSlotForm.vue';
import SlotList from './components/SlotList.vue';
import type { Block } from '@/interfaces/Block';

interface Data {
  dialogVisible: boolean;
}

export default defineComponent({
  name: 'SlotsPage',
  components: {
    MyButton,
    MyDialog,
    CreateSlotForm,
    SlotList,
  },
  setup() {
    const slotsStore = useSlotsStore();
    const blocksStore = useBlocksStore();
    return {
      slotsStore,
      blocksStore,
    };
  },
  data(): Data {
    return {
      dialogVisible: false,
    };
  },
  async mounted() {
    await this.slotsStore.getAllSlotsApi(+this.$route.params.pageId);
  },
  computed: {
    getAllSlots() {
      return this.slotsStore.getAllSlots;
    },
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    openSlot(slotId: number) {
      this.$router.push(`/slots/${slotId}`);
    },
    async createBlock(slotId: number, block: Block) {
      await this.blocksStore.createBlock({
        slotId,
        type: block.type,
        content: block.content,
      });
      await this.slotsStore.getAllSlotsApi(+this.$route.params.pageId);
    },
    async createSlot(slot: any) {
      await this.slotsStore.createSlot({
        pageId: +this.$route.params.pageId,
        type: slot.type,
      });
      await this.slotsStore.getAllSlotsApi(+this.$route.params.pageId);
      this.dialogVisible = false;
    },
    async deleteSlot(id: number) {
      await this.slotsStore.deleteSlot(id);
      await this.slotsStore.getAllSlotsApi(+this.$route.params.pageId);
    },
    async editBlock(block: Block) {
      await this.blocksStore.editBlock(block.id, {
        type: block.type,
        content: block.content,
      });
      this.slotsStore.getAllSlotsApi(+this.$route.params.pageId);
    },
    async deleteBlock(id: number) {
      await this.blocksStore.deleteBlock(id);
      await this.slotsStore.getAllSlotsApi(+this.$route.params.pageId);
    },
    async moveUpSlot(slotId: number) {
      const slots = this.slotsStore.getAllSlots;
      const index = slots.findIndex((slot) => slot.id === slotId);
      if (index === 0) {
        return;
      }
      [slots[index - 1], slots[index]] = [slots[index], slots[index - 1]];
      this.slotsStore.setSlots(slots);
      this.updateOrderSlots();
    },
    async moveDownSlot(slotId: number) {
      const slots = this.slotsStore.getAllSlots;
      const index = slots.findIndex((slot) => slot.id === slotId);
      if (index === slots.length - 1) {
        return;
      }
      [slots[index + 1], slots[index]] = [slots[index], slots[index + 1]];
      this.slotsStore.setSlots(slots);
      this.updateOrderSlots();
    },
    async moveLeftBlock(blockId: number, slotId: number) {
      const blocks = this.getAllSlots.find((slot) => slot.id === slotId)
        ?.blocks!;
      const index = blocks.findIndex((block) => block.id === blockId);
      if (index === 0) {
        return;
      }
      [blocks[index - 1], blocks[index]] = [blocks[index], blocks[index - 1]];
      this.blocksStore.setBlocks(blocks);
      this.updateOrderBlocks(slotId, blocks);
    },
    async moveRightBlock(blockId: number, slotId: number) {
      const blocks = this.getAllSlots.find((slot) => slot.id === slotId)
        ?.blocks!;
      const index = blocks.findIndex((block) => block.id === blockId);
      if (index === blocks.length - 1) {
        return;
      }
      [blocks[index + 1], blocks[index]] = [blocks[index], blocks[index + 1]];
      this.blocksStore.setBlocks(blocks);
      this.updateOrderBlocks(slotId, blocks);
    },
    async updateOrderSlots() {
      await this.slotsStore.updateOrders(
        +this.$route.params.pageId,
        this.getAllSlots.map((slot, index) => ({
          id: slot.id,
          order: index + 1,
        }))
      );
    },
    async updateOrderBlocks(slotId: number, blocks: Block[]) {
      await this.blocksStore.updateOrders(
        slotId,
        blocks.map((block, index) => ({
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
