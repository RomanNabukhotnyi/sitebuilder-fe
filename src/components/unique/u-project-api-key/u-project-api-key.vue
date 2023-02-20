<template>
  <div class="u-project-api-key">
    <h4>Api key</h4>
    <div class="apiKeys">
      <Transition name="list">
        <div
          v-if="project.apiKey && !loadingCreateApiKey"
          :class="{
            apiKey: true,
            loadingApiKey: loadingDeleteApiKey || loadingRefreshApiKey,
          }"
        >
          <div class="apiKey">
            {{ project.apiKey.key }}
          </div>
          <div class="roleAndActions">
            <div
              v-if="isOwner"
              class="actions"
            >
              <CButton
                class="button__refresh"
                :disabled="loadingRefreshApiKey"
                @click.stop="refresh"
              >
                Refresh
              </CButton>
              <CButton
                class="button__delete"
                :disabled="loadingDeleteApiKey"
                @click.stop="deleteApiKey"
              >
                Delete
              </CButton>
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <Transition name="createButton">
      <div
        v-if="isOwner && !project.apiKey"
        class="field"
      >
        <CButton
          class="button"
          :disabled="loadingCreateApiKey"
          @click="create"
        >
          <p v-if="!loadingCreateApiKey">
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
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { PreparedProject } from '@/types/projects/PreparedProject';

import CButton from '@/components/common/c-button';

import { useEventListener } from '@/use/use-event-listener';

const props = defineProps<{
  project: PreparedProject;
  user: { email: string } | null;
  loadingCreateApiKey: boolean;
  loadingRefreshApiKey: boolean;
  loadingDeleteApiKey: boolean;
}>();

const emit = defineEmits<{
  (e: 'create', projectId: number): void;
  (e: 'refresh', id: number, projectId: number): void;
  (e: 'delete', id: number, projectId: number): void;
}>();

const { windowEventListener } = useEventListener();
const isOwner = !!props.project.permissions.find(
  (permission) =>
    permission.email === props.user?.email && permission.permission === 'OWNER'
);

const create = () => {
  emit('create', props.project.id);
};
const refresh = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  emit('refresh', props.project.apiKey!.id, props.project.id);
};
const deleteApiKey = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  emit('delete', props.project.apiKey!.id, props.project.id);
};

windowEventListener('keyup', (event) => {
  if (event.code === 'Enter') {
    create();
  }
});
</script>

<style lang="scss" src="./u-project-api-key.scss" />
