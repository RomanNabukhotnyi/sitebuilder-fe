<template>
  <div
    v-if="show"
    class="overlay" 
    @click="emit('update:show', false)"
  />
  <Transition 
    v-if="show" 
    name="menu"
  >
    <div 
      ref="el" 
      class="menu"
    >
      <div class="email">
        {{ user?.email }}
      </div>
      <div 
        class="action" 
        @click="$emit('logout')"
      >
        Log out
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
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
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
}
.menu {
  position: absolute;
  top: calc(100% - 10px);
  right: 10px;
  min-width: 150px;
  background-color: white;
  border: 1px solid #edeced;
  z-index: 999;
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
