<template>
  <div class="c-modal">
    <Transition name="fade">
      <div
        v-if="isShow"
        class="modal-overlay"
        @click="hideDialog"
      />
    </Transition>
    <Transition name="pop">
      <div
        v-if="isShow"
        class="modal"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { watch, toRefs } from 'vue';

import { useEventListener } from '@/use/use-event-listener';

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void;
}>();

const { windowEventListener } = useEventListener();

const { show: isShow } = toRefs(props);

const hideDialog = () => {
  emit('update:show', false);
};

windowEventListener('keyup', (event) => {
  if (event.code === 'Escape') {
    hideDialog();
  }
});

watch(isShow, value => {
     if (value) {
         document.body.classList.add('modal-open');
     } else {
         document.body.classList.remove('modal-open');
     }
 })
</script>

<style lang="scss" src="./c-model.scss" />
