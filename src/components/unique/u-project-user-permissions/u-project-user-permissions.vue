<template>
    <div class="u-project-user-permissions">
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
                                :is-disabled="loadingDeletePermission && permission.id === deleteId"
                                label="Delete"
                                class="button__delete"
                                @click.stop="deletePermission(permission.id, permission.userId)"
                            />
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
    (e: 'invite', id: number, payload: ApiCreatePermission): void;
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

<style lang="scss" src="./u-project-user-permissions.scss"/>
