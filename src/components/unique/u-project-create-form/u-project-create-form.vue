<template>
    <div class="u-project-create-form">
        <h4>Create project</h4>
        <div class="field">
            <CInput
                v-model="form.name.value"
                v-focus
                class="input"
                placeholder="Name"
            />
            <div v-if="!form.name.errors.required">
                <p
                    v-if="form.name.errors.exist"
                    class="error"
                >
                    A project with that name exist
                </p>
            </div>
        </div>
        <CButton
            :is-loading="loadingCreateProject"
            :is-disabled="!form.valid || loadingCreateProject"
            label="Create"
            class="button"
            @click="createProject"
        />
    </div>
</template>

<script setup lang="ts">
import type { ApiProject } from '@/types/projects/ApiProject';

import CButton from '@/components/common/c-button';
import CInput from '@/components/common/c-input';

import { useValidators } from '@/use/validators';
import { useEventListener } from '@/use/use-event-listener';
import { useForm } from '@/use/form';

const props = defineProps<{
    projects: ApiProject[];
    loadingCreateProject: boolean;
}>();

const emit = defineEmits<{
    (e: 'create', project: Pick<ApiProject, 'name'>): void;
}>();

const { windowEventListener } = useEventListener();
const { required, exist } = useValidators();
const form = useForm({
    name: {
        value: '',
        validators: {
            required,
            exist: exist(props.projects.map((p) => p.name)),
        },
    },
});

const createProject = () => {
    emit('create', {
        name: form.name.value,
    });
};

windowEventListener('keyup', (event) => {
    if (event.code === 'Enter' && form.valid) {
        createProject();
    }
});
</script>

<style lang="scss" src="./u-project-create-form.scss"/>
