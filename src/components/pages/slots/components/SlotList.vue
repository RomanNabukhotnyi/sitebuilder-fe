<template>
  <div>
    <MyDialog v-model:show="dialogVisible">
      <CreateBlockForm :slotId="slotId" @create="createBlock" />
    </MyDialog>
    <div class="slots" v-show="!loading && slots.length !== 0">
      <TransitionGroup name="list">
        <div class="slot" v-for="slot in slots" :key="slot.id">
          <div v-if="slot.type === 'STATIC'" class="staticSlot">STATIC</div>
          <div
            class="emptySlot"
            v-else-if="slot.blocks.length === 0 && slot.type !== 'STATIC'"
            @click="slot.type !== 'STATIC' && showDialog(slot.id)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
            </svg>
          </div>
          <BlockList
            v-else
            :mySlot="slot"
            @deleteBlock="deleteBlock"
            @editBlock="editBlock"
            @moveLeft="moveLeftBlock"
            @moveRight="moveRightBlock"
          />
          <SlotMenu
            :mySlot="slot"
            @create="createBlock"
            @delete="deleteSlot"
            @moveUp="moveUpSlot"
            @moveDown="moveDownSlot"
          />
        </div>
      </TransitionGroup>
    </div>
    <div v-show="loading">
      <div
        class="slot-placeholder placeholder-animate"
        v-for="item in 3"
        :style="{ animationDelay: `1.${item}s` }"
        :key="item"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyDialog from '@/components/common/MyDialog.vue';
import CreateBlockForm from './CreateBlockForm.vue';
import SlotMenu from './SlotMenu.vue';
import BlockList from './BlockList.vue';

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
    BlockList,
  },
  props: {
    slots: {
      type: Array<ISlot>,
      required: true,
    },
    loading: {
      type: Boolean,
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
      if (this.$props.slots.findIndex((slot) => slot.id === slotId) !== 0) {
        this.$emit('moveUp', slotId);
      }
    },
    moveDownSlot(slotId: number) {
      if (
        this.$props.slots.findIndex((slot) => slot.id === slotId) !==
        this.$props.slots.length - 1
      ) {
        this.$emit('moveDown', slotId);
      }
    },
    deleteSlot(id: number) {
      this.$emit('deleteSlot', id);
    },
    editBlock(block: Block) {
      this.$emit('editBlock', block);
    },
    deleteBlock(id: number) {
      this.$emit('deleteBlock', id);
    },
    moveLeftBlock(blockId: number, slotId: number) {
      this.$emit('moveLeft', blockId, slotId);
    },
    moveRightBlock(blockId: number, slotId: number) {
      this.$emit('moveRight', blockId, slotId);
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
.staticSlot {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6a6a6a;
  color: white;
  padding: 5px;
}
/* placeholders */
.slot-placeholder {
  background-color: #eeeeee;
  height: 100px;
}
@keyframes loading {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
.placeholder-animate {
  animation-name: loading;
  animation-timing-function: steps(10, end);
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-duration: 1s;
}
/* animations */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
</style>
