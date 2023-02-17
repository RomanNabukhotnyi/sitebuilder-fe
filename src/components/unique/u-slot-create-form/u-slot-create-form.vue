<template>
  <div class="form">
    <h4>Create slot</h4>
    <CSelect
      class="select"
      :selected="'Type: ' + selected"
      :options="options"
      @select="selectOption"
    />
    <CButton
      class="button"
      :disabled="loadingCreateSlot"
      @click="createSlot"
    >
      <p v-if="!loadingCreateSlot">
        Create
      </p>
      <div
        v-else
        class="loadingio-spinner-ellipsis-yg3d79y87xd"
      >
        <div class="ldio-bzxhjz25vr">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </CButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CButton from '@/components/common/c-button';
import CSelect from '@/components/common/c-select';

import { useEventListener } from '@/use/use-event-listener';
import type { Option } from '@/types/Option';

defineProps<{
  loadingCreateSlot: boolean;
}>();

const emit = defineEmits<{
  (e: 'createSlot', value: { type: 'STATIC' | 'DYNAMIC' }): void;
}>();

const { windowEventListener } = useEventListener();
const type = ref<'STATIC' | 'DYNAMIC'>('DYNAMIC');
const selected = ref('dynamic');
const options = [
  { name: 'static', value: 'STATIC' },
  { name: 'dynamic', value: 'DYNAMIC' },
];

const createSlot = () => {
  emit('createSlot', {
    type: type.value,
  });
};
const selectOption = (option: Option<'STATIC' | 'DYNAMIC'>) => {
  type.value = option.value;
  selected.value = option.name;
};

windowEventListener('keyup', (event) => {
  if (event.code === 'Enter') {
    createSlot();
  }
});
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
.select {
  margin: 15px 0;
}
.button {
  align-self: flex-end;
  width: 50%;
}
.button:disabled {
  background-color: #a9b5c2;
}
.button:disabled:hover {
  opacity: 1;
  cursor: default;
}
/* loading */
@keyframes ldio-bzxhjz25vr {
  0% {
    transform: translate(1.2px, 8px) scale(0);
  }
  25% {
    transform: translate(1.2px, 8px) scale(0);
  }
  50% {
    transform: translate(1.2px, 8px) scale(1);
  }
  75% {
    transform: translate(8px, 8px) scale(1);
  }
  100% {
    transform: translate(14.8px, 8px) scale(1);
  }
}
@keyframes ldio-bzxhjz25vr-r {
  0% {
    transform: translate(14.8px, 8px) scale(1);
  }
  100% {
    transform: translate(14.8px, 8px) scale(0);
  }
}
.ldio-bzxhjz25vr div {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  transform: translate(8px, 8px) scale(1);
  background: white;
  animation: ldio-bzxhjz25vr 1s infinite cubic-bezier(0, 0.5, 0.5, 1);
}
.ldio-bzxhjz25vr div:nth-child(1) {
  transform: translate(14.8px, 8px) scale(1);
  animation: ldio-bzxhjz25vr-r 0.25s infinite cubic-bezier(0, 0.5, 0.5, 1);
}
.ldio-bzxhjz25vr div:nth-child(2) {
  animation-delay: -0.25s;
}
.ldio-bzxhjz25vr div:nth-child(3) {
  animation-delay: -0.5s;
}
.ldio-bzxhjz25vr div:nth-child(4) {
  animation-delay: -0.75s;
}
.ldio-bzxhjz25vr div:nth-child(5) {
  animation-delay: -1s;
}
.loadingio-spinner-ellipsis-yg3d79y87xd {
  width: 20px;
  height: 20px;
  display: inline-block;
}
.ldio-bzxhjz25vr {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}
.ldio-bzxhjz25vr div {
  box-sizing: content-box;
}
</style>
