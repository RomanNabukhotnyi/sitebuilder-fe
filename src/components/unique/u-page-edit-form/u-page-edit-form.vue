<template>
    <div class="u-page-edit-form">
        <h4>Edit page</h4>
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
                    A page with that name exist
                </p>
            </div>
        </div>
        <CButton
            :is-loading="loadingEditPage"
            :is-disabled="!form.valid || loadingEditPage"
            label="Edit"
            class="button"
            @click="editProject"
        />
    </div>
</template>

<script setup lang="ts">
import type { ApiPage } from '@/types/pages/ApiPage';

import CButton from '@/components/common/c-button';
import CInput from '@/components/common/c-input';

import { useValidators } from '@/use/validators';
import { useEventListener } from '@/use/use-event-listener';
import { useForm } from '@/use/form';

const props = defineProps<{
    page: ApiPage;
    pages: ApiPage[];
    loadingEditPage: boolean;
}>();

const emit = defineEmits<{
    (e: 'edit', page: ApiPage): void;
}>();

const { windowEventListener } = useEventListener();
const { required, exist } = useValidators();
const form = useForm({
    name: {
        value: props.page.name,
        validators: {
            required,
            exist: exist(
                props.pages
                    .map((p) => p.name)
                    .filter((name) => name !== props.page.name)
            ),
        },
    },
});

const editProject = () => {
    emit('edit', {
        ...props.page,
        name: form.name.value,
    });
};

windowEventListener('keyup', (event) => {
    if (event.code === 'Enter' && form.valid) {
        editProject();
    }
});
</script>

<style lang="scss" src="./u-page-edit-form.scss"/>
