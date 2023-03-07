<template>
  <div class="u-project-user-permissions">
    <h4>Permissions</h4>
    <div class="permissions">
      <CTransitionList>
        <div
          v-for="permission in project.permissions"
          :key="permission.id"
          :class="{ deletePermission: isDeletedPermission(permission.id) }"
          class="permission"
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
                :is-disabled="isDeletedPermission(permission.id)"
                label="Delete"
                class="button__delete"
                @click.stop="deletePermission(permission.id, permission.userId)"
              />
            </div>
          </div>
        </div>
      </CTransitionList>
    </div>
    <form
      v-if="isOwner"
      class="form"
      @submit.prevent="invite"
    >
      <CFieldList
        v-model:fields="form.fields"
        :is-show-errors="isSubmitted"
      />
      <CSelect
        v-model="selectedPermission"
        class="select"
        :selected="selectedPermission"
        :options="options"
        @select="selectOption"
      />
      <CButton
        :is-loading="loadingAddPermission"
        :is-disabled="loadingAddPermission"
        label="Invite"
        class="button"
        type="submit"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { ApiCreatePermission } from '@/types/permissions/ApiCreatePermission';
import type { PreparedProject } from '@/types/projects/PreparedProject';
import type { Option } from '@/types/Option';

import CTransitionList from '@/components/common/c-transition-list';
import CButton from '@/components/common/c-button';
import CSelect from '@/components/common/c-select';
import CFieldList from '@/components/common/c-field-list';

import { useCreateFormPermission } from './use/useCreateFormPermission';

import { PERMISSIONS } from '@/constants/permissions';

const props = defineProps<{
  project: PreparedProject;
  projects: PreparedProject[];
  user: { email: string } | null;
  loadingAddPermission: boolean;
  loadingDeletePermission: boolean;
}>();

const emit = defineEmits<{
  (e: 'invite', id: number, payload: ApiCreatePermission): void;
  (e: 'delete', projectId: number, userId: number): void;
}>();

const form = useCreateFormPermission();

const isOwner = !!props.project.permissions.find(
  (permission) =>
    permission.email === props.user?.email && permission.permission === 'OWNER'
);
const deleteId = ref<number | null>(null);
const selectedPermission = ref(PERMISSIONS.DESIGNER);
const options = [{ name: 'Designer', value: 'DESIGNER' }];
const isSubmitted = ref(false);
const isDeletedPermission = (permissionId: number) => props.loadingDeletePermission && permissionId === deleteId.value;

const selectOption = (option: Option<'OWNER' | 'DESIGNER'>) => {
  selectedPermission.value = option.value;
};
const invite = () => {
  isSubmitted.value = true;

  if (!form.isValid.value) return;

  emit('invite', props.project.id, {
    ...form.getData(),
    permission: selectedPermission.value,
  });
  form.fields.email.value = '';
};
const deletePermission = (permissionId: number, userId: number) => {
  deleteId.value = permissionId;
  emit('delete', props.project.id, userId);
};
</script>

<style lang="scss" src="./u-project-user-permissions.scss" />
