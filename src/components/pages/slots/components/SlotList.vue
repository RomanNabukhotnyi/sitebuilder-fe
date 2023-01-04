<template>
  <div>
    <div class="slots" v-show="!loadingGetSlots && slots.length !== 0">
      <TransitionGroup name="list">
        <div
          :class="{
            slot: true,
            deleteSlot: loadingDeleteSlot && slot.id === deleteId,
          }"
          v-for="slot in slots"
          :key="slot.id"
        >
          <div v-if="slot.type === 'STATIC'" class="staticSlot">STATIC</div>
          <div
            class="emptySlot"
            v-else-if="slot.blocks.length === 0 && slot.type !== 'STATIC'"
            @click="slot.type !== 'STATIC' && showCreateBlockDialog(slot.id)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
            </svg>
          </div>
          <BlockList
            v-else
            :mySlot="slot"
            :loadingDeleteBlock="loadingDeleteBlock"
            @showEditBlockDialog="showEditBlockDialog"
            @moveLeftBlock="moveLeftBlock"
            @moveRightBlock="moveRightBlock"
            @deleteBlock="deleteBlock"
          />
          <SlotMenu
            :mySlot="slot"
            @showCreateBlockDialog="showCreateBlockDialog"
            @moveUpSlot="moveUpSlot"
            @moveDownSlot="moveDownSlot"
            @deleteSlot="deleteSlot"
          />
        </div>
      </TransitionGroup>
    </div>
    <div v-show="loadingGetSlots">
      <div
        class="slot-placeholder placeholder-animate"
        v-for="item in 3"
        :style="{ animationDelay: `1.${item}s` }"
        :key="item"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SlotMenu from './SlotMenu.vue';
import BlockList from './BlockList.vue';
import type { Slot } from '@/interfaces/Slot';
import type { Block } from '@/interfaces/Block';
interface ISlot extends Slot {
  blocks: Block[];
}
const props = defineProps<{
  slots: ISlot[];
  loadingGetSlots: boolean;
  loadingDeleteSlot: boolean;
  loadingDeleteBlock: boolean;
}>();
const emit = defineEmits<{
  (e: 'moveUpSlot', slotId: number): void;
  (e: 'moveDownSlot', slotId: number): void;
  (e: 'deleteSlot', slotId: number): void;
  (e: 'showCreateBlockDialog', slotId: number): void;
  (e: 'showEditBlockDialog', slotId: number, block: Block): void;
  (e: 'moveLeftBlock', slotId: number, blockId: number): void;
  (e: 'moveRightBlock', slotId: number, blockId: number): void;
  (e: 'deleteBlock', slotId: number, blockId: number): void;
}>();
const deleteId = ref<number | null>(null);
const showCreateBlockDialog = (slotId: number) => {
  emit('showCreateBlockDialog', slotId);
};
const showEditBlockDialog = (slotId: number, block: Block) => {
  emit('showEditBlockDialog', slotId, block);
};
const moveUpSlot = (slotId: number) => {
  if (props.slots.findIndex((slot) => slot.id === slotId) !== 0) {
    emit('moveUpSlot', slotId);
  }
};
const moveDownSlot = (slotId: number) => {
  if (
    props.slots.findIndex((slot) => slot.id === slotId) !==
    props.slots.length - 1
  ) {
    emit('moveDownSlot', slotId);
  }
};
const deleteSlot = (id: number) => {
  deleteId.value = id;
  emit('deleteSlot', id);
};
const moveLeftBlock = (slotId: number, blockId: number) => {
  emit('moveLeftBlock', slotId, blockId);
};
const moveRightBlock = (slotId: number, blockId: number) => {
  emit('moveRightBlock', slotId, blockId);
};
const deleteBlock = (slotId: number, blockId: number) => {
  emit('deleteBlock', slotId, blockId);
};
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
.deleteSlot {
  opacity: 0.5;
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
