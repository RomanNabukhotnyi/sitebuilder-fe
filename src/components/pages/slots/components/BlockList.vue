<template>
  <div class="blocks">
    <TransitionGroup name="blockList">
      <div
        :class="{
          block: true,
          deleteBlock: loadingDeleteBlock && block.id === deleteId,
        }"
        v-for="block in mySlot.blocks"
        :key="block.id"
      >
        <div class="type__image" v-if="block.type === 'IMAGE'">
          <img :src="block.content.url" />
        </div>
        <div class="type__text" v-if="block.type === 'TEXT'">
          {{ block.content.text }}
        </div>
        <BlockMenu
          :block="block"
          :blocks="mySlot.blocks"
          :mySlot="mySlot"
          @showEditBlockDialog="showEditBlockDialog"
          @moveLeftBlock="moveLeftBlock"
          @moveRightBlock="moveRightBlock"
          @deleteBlock="deleteBlock"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import type { Block } from '@/interfaces/Block';
import { defineComponent } from 'vue';
import BlockMenu from './BlockMenu.vue';

interface Data {
  deleteId: number | null;
}

export default defineComponent({
  name: 'SlotList',
  components: {
    BlockMenu,
  },
  props: {
    mySlot: {
      type: Object,
      required: true,
    },
    loadingDeleteBlock: {
      type: Boolean,
      required: true,
    },
  },
  emits: [
    'showEditBlockDialog',
    'moveLeftBlock',
    'moveRightBlock',
    'deleteBlock',
  ],
  data(): Data {
    return {
      deleteId: null,
    };
  },
  methods: {
    showEditBlockDialog(slotId: number, block: Block) {
      this.$emit('showEditBlockDialog', slotId, block);
    },
    moveLeftBlock(slotId: number, blockId: number) {
      this.$emit('moveLeftBlock', slotId, blockId);
    },
    moveRightBlock(slotId: number, blockId: number) {
      this.$emit('moveRightBlock', slotId, blockId);
    },
    deleteBlock(slotId: number, blockId: number) {
      this.deleteId = blockId;
      this.$emit('deleteBlock', slotId, blockId);
    },
  },
});
</script>

<style scoped>
.blocks {
  width: 100%;
  display: flex;
}
.blocks .block {
  min-height: 100px;
  display: block;
  flex: 1;
  position: relative;
}
.deleteBlock {
  opacity: 0.5;
}
.blocks .type__text {
  height: 100%;
  display: grid;
  text-align: center;
  align-items: center;
  padding: 5px;
}
.blocks .type__image {
  height: 100%;
}
.blocks .type__image img {
  width: 100%;
  height: 100%;
}
.block:hover {
  border: 1px solid #419bf9;
}
/* animations */
.blockList-move,
.blockList-enter-active,
.blockList-leave-active {
  transition: all 0.5s ease;
}
.blockList-enter-from,
.blockList-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
.blockList-leave-active {
  position: absolute;
}
</style>
