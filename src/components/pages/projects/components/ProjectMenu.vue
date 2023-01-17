<template>
  <div v-if="show" class="overlay" @click="emit('update:show', false)"></div>
  <Transition v-if="show" name="menu">
    <div class="menu" ref="el">
      <div class="action" @click="$emit('showPermissions', project)">
        Permissions
      </div>
      <div v-if="isOwner" class="action" @click="$emit('showApiKey', project)">
        Api key
      </div>
      <div v-if="isOwner" class="action" @click="$emit('edit', project)">
        Edit
      </div>
      <div v-if="isOwner" class="action" @click="$emit('delete', project.id)">
        Delete
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Project } from '@/interfaces/Project';
import type { Permission } from '@/interfaces/Permission';
interface IProject extends Project {
  permissions: Permission[];
}
const props = withDefaults(
  defineProps<{
    show: boolean;
    user: { email: string } | null;
    project: IProject;
  }>(),
  {
    show: false,
  }
);
const emit = defineEmits<{
  (e: 'showPermissions', project: IProject): void;
  (e: 'showApiKey', project: IProject): void;
  (e: 'edit', project: IProject): void;
  (e: 'delete', projectId: number): void;
  (e: 'update:show', value: boolean): void;
}>();
console.log(props.project);
const isOwner = !!props.project.permissions.find(
  (permission) =>
    permission.email === props.user?.email && permission.permission === 'OWNER'
);
</script>

<style scoped>
.menu {
  position: absolute;
  top: 10px;
  left: 10px;
  min-width: 150px;
  background-color: white;
  z-index: 999;
  font-size: 15px;
  color: #554d56;
  box-shadow: 0 2px 4px 0 rgba(85, 77, 86, 0.5);
}
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
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
