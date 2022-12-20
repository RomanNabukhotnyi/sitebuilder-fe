<template>
  <MyDialog v-model:show="dialogVisible">
    <CreateBlockForm :slotId="mySlot.id" @create="createBlock" />
  </MyDialog>
  <div class="slotMenu">
    <div class="menuAction moveAction" @click="moveUpSlot">
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path
          d="M12.9970936,6.70710678 L12.9970936,19 L11.9970936,19 L11.9970936,6.70710678 L7.85355339,10.8556944 C7.65829124,11.0509566 7.34170876,11.0509566 7.14644661,10.8556944 C6.95118446,10.6604323 6.95118446,10.3438498 7.14644661,10.1485877 L12.4970936,4.79289322 L17.8536152,10.1485877 C18.0488773,10.3438498 18.0488773,10.6604323 17.8536152,10.8556944 C17.658353,11.0509566 17.3417706,11.0509566 17.1465084,10.8556944 L12.9970936,6.70710678 Z"
        ></path>
      </svg>
    </div>
    <div class="menuAction moveAction" @click="moveDownSlot">
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path
          d="M12.9970936,17.2928932 L17.1465084,13.1443056 C17.3417706,12.9490434 17.658353,12.9490434 17.8536152,13.1443056 C18.0488773,13.3395677 18.0488773,13.6561502 17.8536152,13.8514123 L12.4970936,19.2071068 L7.14644661,13.8514123 C6.95118446,13.6561502 6.95118446,13.3395677 7.14644661,13.1443056 C7.34170876,12.9490434 7.65829124,12.9490434 7.85355339,13.1443056 L11.9970936,17.2928932 L11.9970936,5 L12.9970936,5 L12.9970936,17.2928932 Z"
        ></path>
      </svg>
    </div>
    <div
      :class="mySlot.type === 'STATIC' ? 'disabled' : 'menuAction'"
      @click="mySlot.type !== 'STATIC' && showDialog()"
    >
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path
          fill-rule="evenodd"
          d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z"
        />
      </svg>
    </div>
    <div @click="deleteSlot" class="menuAction">
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path
          fill-rule="evenodd"
          d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Block } from '@/interfaces/Block';
import MyDialog from '@/components/common/MyDialog.vue';
import CreateBlockForm from './CreateBlockForm.vue';

export default defineComponent({
  name: 'SlotMenu',
  components: {
    MyDialog,
    CreateBlockForm,
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
    showDialog() {
      this.dialogVisible = true;
    },
    moveUpSlot() {
      this.$emit('moveUp', this.$props.mySlot.id);
    },
    moveDownSlot() {
      this.$emit('moveDown', this.$props.mySlot.id);
    },
    deleteSlot() {
      this.$emit('delete', this.$props.mySlot.id);
    },
    createBlock(slotId: number, block: Block) {
      this.$emit('create', slotId, block);
      this.dialogVisible = false;
    },
  },
});
</script>

<style scoped>
.slotMenu {
  position: absolute;
  left: 100%;
  display: none;
  width: 36px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 10px 0 rgba(0, 0, 0, 0.08),
    0 1px 20px 0 rgba(0, 0, 0, 0.08);
}
.slot:hover .slotMenu {
  display: block;
}
.menuAction {
  cursor: pointer;
  padding-top: 3px;
  padding-bottom: 3px;
}
.menuAction:hover {
  color: #116dff;
}
.menuAction {
  display: flex;
  justify-content: center;
  width: 100%;
}
.menuAction:first-child {
  padding-top: 6px;
  padding-bottom: 3px;
}
.slot:last-child .moveAction:nth-child(2) {
  cursor: default;
  color: #bcbcbc;
}
.slot:first-child .moveAction:first-child svg {
  cursor: default;
  color: #bcbcbc;
}
.menuAction:last-child {
  padding-top: 3px;
  padding-bottom: 6px;
}
.disabled {
  cursor: default;
  color: #bcbcbc;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
