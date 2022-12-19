<template>
  <div class="slots">
    <MyDialog v-model:show="dialogVisible">
      <CreateBlockForm :slotId="slotId" @create="createBlock" />
    </MyDialog>
    <div class="slot" v-for="slot in slots" :key="slot.id">
      <div
        class="emptySlot"
        v-if="slot.blocks.length === 0"
        @click="showDialog(slot.id)"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
        </svg>
      </div>
      <div class="blocks" v-else>
        <div class="block" v-for="block in slot.blocks" :key="block.id">
          <div class="type__image" v-if="block.type === 'IMAGE'">
            <img :src="block.content.url" />
          </div>
          <div class="type__text" v-if="block.type === 'TEXT'">
            <h4>{{ block.content.text }}</h4>
          </div>
        </div>
      </div>
      <SlotMenu
        :id="slot.id"
        @create="createBlock"
        @delete="deleteSlot"
        @moveUp="moveUpSlot"
        @moveDown="moveDownSlot"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyDialog from '@/components/common/MyDialog.vue';
import CreateBlockForm from './CreateBlockForm.vue';
import SlotMenu from './SlotMenu.vue';

import type { Slot } from '@/interfaces/Slot';
import type { Block } from '@/interfaces/Block';

interface ISlot extends Slot {
  blocks: Block[];
}

export default defineComponent({
  name: 'SlotList',
  components: {
    MyDialog,
    CreateBlockForm,
    SlotMenu,
  },
  props: {
    slots: {
      type: Array<ISlot>,
      required: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      slotId: 0,
    };
  },
  methods: {
    showDialog(slotId: number) {
      this.slotId = slotId;
      this.dialogVisible = true;
    },
    createBlock(slotId: number, block: Block) {
      this.$emit('create', slotId, block);
      this.dialogVisible = false;
    },
    moveUpSlot(slotId: number) {
      this.$emit('moveUp', slotId);
    },
    moveDownSlot(slotId: number) {
      this.$emit('moveDown', slotId);
    },
    deleteSlot(slotId: number) {
      this.$emit('delete', slotId);
    },
  },
});
</script>

<style scoped>
.slots {
  display: grid;
}
.slot {
  align-items: center;
  display: flex;
  justify-content: center;
  height: auto;
}
.blocks {
  width: 100%;
  text-align: center;
  display: flex;
}
.blocks .block {
  display: block;
  flex: 1;
}
.blocks .type__text h4 {
  margin: 5px;
}
.blocks .type__image img {
  width: 100%;
  height: 100%;
}
.slot:hover {
  border: 1px solid #419bf9;
}
.emptySlot {
  margin: 5px;
  border: 1px dotted;
  color: #554d56;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;
}
</style>
