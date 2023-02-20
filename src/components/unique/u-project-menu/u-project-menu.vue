<template>
  <div class="u-project-menu">
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
        <div
          class="action"
          @click="$emit('showPermissions', project)"
        >
          Permissions
        </div>
        <div
          v-if="isOwner"
          class="action"
          @click="$emit('showApiKey', project)"
        >
          Api key
        </div>
        <div
          v-if="isOwner"
          class="action"
          @click="$emit('edit', project)"
        >
          Edit
        </div>
        <div
          v-if="isOwner"
          class="action"
          @click="$emit('delete', project.id)"
        >
          Delete
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { PreparedProject } from '@/types/projects/PreparedProject';

const props = withDefaults(
  defineProps<{
    show: boolean;
    user: { email: string } | null;
    project: PreparedProject;
  }>(),
  {
    show: false,
  }
);

const emit = defineEmits<{
  (e: 'showPermissions', project: PreparedProject): void;
  (e: 'showApiKey', project: PreparedProject): void;
  (e: 'edit', project: PreparedProject): void;
  (e: 'delete', projectId: number): void;
  (e: 'update:show', value: boolean): void;
}>();

const isOwner = !!props.project.permissions.find(
  (permission) =>
    permission.email === props.user?.email && permission.permission === 'OWNER'
);
</script>

<style lang="scss" src="./u-project-menu.scss" />
