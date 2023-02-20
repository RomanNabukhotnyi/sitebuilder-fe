<template>
  <div class="c-modal">
    <Transition name="fade">
      <div
        v-if="show"
        class="modal-overlay"
        @click="hideDialog"
      />
    </Transition>
    <Transition name="pop">
      <div
        v-if="showDialog()"
        class="modal"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useEventListener } from '@/use/use-event-listener';

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void;
}>();

const { windowEventListener } = useEventListener();

const showDialog = () => {
  if (props.show) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
  return props.show;
};

const hideDialog = () => {
  emit('update:show', false);
};

windowEventListener('keyup', (event) => {
  if (event.code === 'Escape') {
    hideDialog();
  }
});
</script>

<style lang="scss" src="./c-model.scss" />
