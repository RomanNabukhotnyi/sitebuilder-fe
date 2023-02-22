<template>
    <div class="u-page-create-form">
        <h4>Create page</h4>
        <div class="field">
            <CInput
                v-model="form.name.value"
                v-focus
                class="input"
                type="text"
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
            :is-loading="loadingCreatePage"
            :is-disabled="!form.valid || loadingCreatePage"
            label="Create"
            class="button"
            @click="createPage"
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
    pages: ApiPage[];
    loadingCreatePage: boolean;
}>();

const emit = defineEmits<{
    (e: 'create', page: Omit<ApiPage, 'id' | 'order'>): void;
}>();

const { windowEventListener } = useEventListener();
const { required, exist } = useValidators();
const form = useForm({
    name: {
        value: '',
        validators: {
            required,
            exist: exist(props.pages.map((p) => p.name)),
        },
    },
});

const createPage = () => {
    emit('create', {
        name: form.name.value,
        meta: {},
    });
};

windowEventListener('keyup', (event) => {
    if (event.code === 'Enter' && form.valid) {
        createPage();
    }
});
</script>

<style lang="scss" src="./u-page-create-form.scss"/>
