<template>
  <div class="u-block-menu">
    <div
      class="menuAction moveAction"
      @click="moveLeftBlock"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path
          d="M12.9970936,6.70710678 L12.9970936,19 L11.9970936,19 L11.9970936,6.70710678 L7.85355339,10.8556944 C7.65829124,11.0509566 7.34170876,11.0509566 7.14644661,10.8556944 C6.95118446,10.6604323 6.95118446,10.3438498 7.14644661,10.1485877 L12.4970936,4.79289322 L17.8536152,10.1485877 C18.0488773,10.3438498 18.0488773,10.6604323 17.8536152,10.8556944 C17.658353,11.0509566 17.3417706,11.0509566 17.1465084,10.8556944 L12.9970936,6.70710678 Z"
        />
      </svg>
    </div>
    <div
      class="menuAction moveAction"
      @click="moveRightBlock"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path
          d="M12.9970936,17.2928932 L17.1465084,13.1443056 C17.3417706,12.9490434 17.658353,12.9490434 17.8536152,13.1443056 C18.0488773,13.3395677 18.0488773,13.6561502 17.8536152,13.8514123 L12.4970936,19.2071068 L7.14644661,13.8514123 C6.95118446,13.6561502 6.95118446,13.3395677 7.14644661,13.1443056 C7.34170876,12.9490434 7.65829124,12.9490434 7.85355339,13.1443056 L11.9970936,17.2928932 L11.9970936,5 L12.9970936,5 L12.9970936,17.2928932 Z"
        />
      </svg>
    </div>
    <div
      class="menuAction"
      @click="showEditBlockDialog"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path
          fill-rule="evenodd"
          d="M18.699,8.62387506 L17.305,10.0198751 L13.97,6.67887506 L15.363,5.28287506 C15.8,4.84687506 16.56,4.84587506 16.997,5.28287506 L18.699,6.98687506 C19.15,7.43787506 19.15,8.17287506 18.699,8.62387506 L18.699,8.62387506 Z M10.973,16.3598751 L9.645,15.0298751 L13.155,11.5168751 L12.474,10.8348751 L8.965,14.3488751 L7.637,13.0198751 L13.289,7.36087506 L16.625,10.7018751 L10.973,16.3598751 Z M6.426,17.5738751 L7.253,13.9988751 L9.995,16.7438751 L6.426,17.5738751 Z M19.381,6.30587506 L17.678,4.60187506 C16.878,3.79887506 15.481,3.79987506 14.682,4.60187506 L6.512,12.7818751 L5,18.9998751 L11.21,17.4858751 L19.381,9.30587506 C20.206,8.47787506 20.206,7.13287506 19.381,6.30587506 L19.381,6.30587506 Z"
        />
      </svg>
    </div>
    <div
      class="menuAction"
      @click="deleteBlock"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path
          fill-rule="evenodd"
          d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PreparedSlot } from '@/types/slots/PreparedSlot';
import type { ApiBlock } from '@/types/blocks/ApiBlock';

const props = defineProps<{
  block: ApiBlock;
  blocks: ApiBlock[];
  mySlot: PreparedSlot;
}>();
const emit = defineEmits<{
  (e: 'showEditBlockDialog', slotId: number, block: ApiBlock): void;
  (e: 'moveLeftBlock', slotId: number, blockId: number): void;
  (e: 'moveRightBlock', slotId: number, blockId: number): void;
  (e: 'deleteBlock', slotId: number, blockId: number): void;
}>();
const showEditBlockDialog = () => {
  emit('showEditBlockDialog', props.mySlot.id, props.block);
};
const moveLeftBlock = () => {
  if (props.blocks.findIndex((block) => block.id === props.block.id) !== 0) {
    emit('moveLeftBlock', props.mySlot.id, props.block.id);
  }
};
const moveRightBlock = () => {
  if (
    props.blocks.findIndex((block) => block.id === props.block.id) !==
    props.blocks.length - 1
  ) {
    emit('moveRightBlock', props.mySlot.id, props.block.id);
  }
};
const deleteBlock = () => {
  emit('deleteBlock', props.mySlot.id, props.block.id);
};
</script>

<style lang="scss" src="./u-block-menu.scss" />
