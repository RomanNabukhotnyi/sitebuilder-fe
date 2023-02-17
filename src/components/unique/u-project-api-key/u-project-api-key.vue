<template>
  <div class="form">
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

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  min-width: 300px;
}
.apiKeys {
  margin: 10px 0;
}
.apiKey {
  display: flex;
  align-items: center;
  margin: 5px 0;
  justify-content: space-between;
}
.loadingApiKey {
  opacity: 0.5;
}
.roleAndActions {
  display: flex;
  align-items: center;
}
.actions {
  display: flex;
}
.button__delete {
  margin: 0 0 0 5px;
  background-color: #ff4747;
}
.button__refresh {
  background-color: #ffc038;
}
.button__refresh:disabled {
  background-color: #a9b5c2;
}
.button__delete:disabled {
  background-color: #a9b5c2;
}
.field {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
}
.button {
  width: 20%;
}
.button:disabled {
  background-color: #a9b5c2;
}
.button:disabled:hover {
  opacity: 1;
  cursor: default;
}
/* animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
.createButton-enter-active,
.createButton-leave-active {
  transition: all 0.5s ease;
}
.createButton-enter-from,
.createButton-leave-to {
  opacity: 0;
  transform: scale(0.3);
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