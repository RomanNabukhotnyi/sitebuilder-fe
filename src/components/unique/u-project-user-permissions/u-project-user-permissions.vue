<template>
  <div class="u-project-user-permissions">
    <h4>Permissions</h4>
    <div class="permissions">
      <CTransitionList>
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
                :is-disabled="
                  loadingDeletePermission && permission.id === deleteId
                "
                label="Delete"
                class="button__delete"
                @click.stop="deletePermission(permission.id, permission.userId)"
              />
            </div>
          </div>
        </div>
      </CTransitionList>
    </div>
    <div
      v-if="isOwner"
      class="field"
    >
      <CFieldList :fields="form.getFields()" />
      <CSelect
        v-model="selectedPermission"
        class="select"
        :selected="selectedPermission"
        :options="options"
        @select="selectOption"
      />
      <CButton
        :is-loading="loadingAddPermission"
        :is-disabled="!form.valid || loadingAddPermission"
        label="Invite"
        class="button"
        @click="invite"
      />
    </div>
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

import { useValidators } from '@/use/validators';
import { useEventListener } from '@/use/use-event-listener';
import { useForm } from '@/use/form';

import { PERMISSIONS } from '@/constants/permissions';

const { windowEventListener } = useEventListener();

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

const isOwner = !!props.project.permissions.find(
  (permission) =>
    permission.email === props.user?.email && permission.permission === 'OWNER'
);
const deleteId = ref<number | null>(null);
const selectedPermission = ref(PERMISSIONS.DESIGNER);
const options = [{ name: 'Designer', value: 'DESIGNER' }];
const { required, email } = useValidators();
const form = useForm({
  email: {
    placeholder: 'Email',
    componentClass: 'input',
    validators: {
      required,
      email,
    },
  },
});

const selectOption = (option: Option<'OWNER' | 'DESIGNER'>) => {
  selectedPermission.value = option.value;
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

<style lang="scss" src="./u-project-user-permissions.scss" />
