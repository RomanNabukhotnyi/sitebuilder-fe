<template>
  <Transition v-if="show" name="menu">
    <div class="menu" ref="el">
      <div class="email">{{ user?.email }}</div>
      <div class="action" @click="$emit('logout')">Log out</div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEventListener } from '@/use/eventListener';
withDefaults(
  defineProps<{
    user: { email: string } | null;
    show: boolean;
  }>(),
  {
    show: false,
  }
);
const emit = defineEmits<{
  (e: 'logout'): void;
  (e: 'update:show', value: boolean): void;
}>();
const hideDialog = () => {
  emit('update:show', false);
};
const el = ref<HTMLElement | null>(null);
useEventListener(window, 'click', (event) => {
  if (
    !document.getElementById('avatar')!.contains(event.target as Node) &&
    !el.value?.contains(event.target as Node)
  ) {
    hideDialog();
  }
});
</script>

<style scoped>
.menu {
  position: absolute;
  top: calc(100% - 10px);
  right: 10px;
  min-width: 150px;
  background-color: white;
  border: 1px solid #edeced;
  z-index: 1;
}
.email {
  margin: 10px;
  text-align: center;
}
.action {
  padding: 10px;
  border-top: 1px solid #edeced;
  cursor: pointer;
}
.action:hover {
  background-color: #f2f2f2;
}
/* animations */
.menu-enter-active {
  transition: all 0.5s ease;
}
.menu-enter-from {
  opacity: 0.9;
  transform: scale(0.9);
}
</style>
