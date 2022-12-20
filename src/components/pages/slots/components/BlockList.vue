<template>
  <div class="blocks">
    <TransitionGroup name="blockList">
      <div class="block" v-for="block in mySlot.blocks" :key="block.id">
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
          @delete="deleteBlock"
          @editBlock="editBlock"
          @moveLeft="moveLeftBlock"
          @moveRight="moveRightBlock"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BlockMenu from './BlockMenu.vue';
import type { Block } from '@/interfaces/Block';

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
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    deleteBlock(id: number) {
      this.$emit('deleteBlock', id);
    },
    moveLeftBlock(blockId: number, slotId: number) {
      this.$emit('moveLeft', blockId, slotId);
    },
    moveRightBlock(blockId: number, slotId: number) {
      this.$emit('moveRight', blockId, slotId);
    },
    editBlock(block: Block) {
      this.$emit('editBlock', block);
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
</style>
