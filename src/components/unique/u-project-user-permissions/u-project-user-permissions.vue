<template>
  <div class="form">
    <h4>Permissions</h4>
    <div class="permissions">
      <TransitionGroup name="list">
        <div
          v-for="permission in project.permissions"
          :key="permission.id"
          :class="{
            permission: true,
            deletePermission:
              loadingDeletePermission && permission.id === deleteId,
          }"
        >
          <div class="email">
            {{ permission.email }}
          </div>
          <div class="roleAndActions">
            <div class="role">
              {{ permission.permission }}
            </div>
            <div
              v-if="isOwner"
              class="actions"
            >
              <CButton
                class="button__delete"
                :disabled="
                  loadingDeletePermission && permission.id === deleteId
                "
                @click.stop="deletePermission(permission.id, permission.userId)"
              >
                Delete
              </CButton>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div
      v-if="isOwner"
      class="field"
    >
      <div>
        <CInput
          v-model="form.email.value"
          v-focus
          class="input"
          type="text"
          placeholder="Email"
        />
        <div v-if="!form.email.errors.required">
          <p
            v-if="form.email.errors.email"
            class="error"
          >
            That's not a valid email
          </p>
        </div>
      </div>
      <CSelect
        class="select"
        :selected="selected"
        :options="options"
        @select="selectOption"
      />
      <CButton
        class="button"
        :disabled="!form.valid || loadingAddPermission"
        @click="invite"
      >
        <p v-if="!loadingAddPermission">
          Invite
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { ApiCreatePermission } from '@/types/permissions/ApiCreatePermission';
import type { PreparedProject } from '@/types/projects/PreparedProject';
import type { Option } from '@/types/Option';

import CButton from '@/components/common/c-button';
import CInput from '@/components/common/c-input';
import CSelect from '@/components/common/c-select';

import { useValidators } from '@/use/validators';
import { useEventListener } from '@/use/use-event-listener';
import { useForm } from '@/use/form';

const { windowEventListener } = useEventListener();

const props = defineProps<{
  project: PreparedProject;
  projects: PreparedProject[];
  user: { email: string } | null;
  loadingAddPermission: boolean;
  loadingDeletePermission: boolean;
}>();

const emit = defineEmits<{
  (
    e: 'invite',
    id: number,
    payload: ApiCreatePermission,
  ): void;
  (e: 'delete', projectId: number, userId: number): void;
}>();

const isOwner = !!props.project.permissions.find(
  (permission) =>
    permission.email === props.user?.email && permission.permission === 'OWNER'
);
const deleteId = ref<number | null>(null);
const selectedPermission = ref<'OWNER' | 'DESIGNER'>('DESIGNER');
const selected = ref('Designer');
const options = [{ name: 'Designer', value: 'DESIGNER' }];
const { required, email } = useValidators();
const form = useForm({
  email: {
    value: '',
    validators: {
      required,
      email,
    },
  },
});

const selectOption = (option: Option<'OWNER' | 'DESIGNER'>) => {
  selectedPermission.value = option.value;
  selected.value = option.name;
};
const invite = () => {
  emit('invite', props.project.id, {
    email: form.email.value,
    permission: selectedPermission.value,
  });
  form.email.value = '';
};
const deletePermission = (permissionId: number, userId: number) => {
  deleteId.value = permissionId;
  emit('delete', props.project.id, userId);
};

windowEventListener('keyup', (event) => {
  if (event.code === 'Enter' && form.valid) {
    invite();
  }
});
</script>

<style scoped>
img {
  color: white;
  height: 20px;
}
.form {
  display: flex;
  flex-direction: column;
  min-width: 400px;
}
.permissions {
  margin: 10px 0;
}
.permission {
  display: flex;
  align-items: center;
  margin: 5px 0;
  justify-content: space-between;
}
.deletePermission {
  opacity: 0.5;
}
.roleAndActions {
  display: flex;
  align-items: center;
}
.role {
  margin: 0 10px 0 0;
  padding: auto;
}
.actions {
  display: flex;
}
.button__delete {
  background-color: #ff4747;
}
.button__delete:disabled {
  background-color: #a9b5c2;
}
.field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
}
.input {
  width: fit-content;
}
.error {
  position: absolute;
  font-size: 10px;
  color: rgb(255, 107, 107);
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
