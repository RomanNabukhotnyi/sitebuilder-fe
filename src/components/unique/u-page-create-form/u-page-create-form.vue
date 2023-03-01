<template>
  <form
    class="u-page-create-form"
    @submit.prevent="createPage"
  >
    <h4>Create page</h4>
    <CFieldList :fields="form.getFields()" />
    <CButton
      :is-loading="loadingCreatePage"
      :is-disabled="!form.valid || loadingCreatePage"
      label="Create"
      class="button"
      @click="createPage"
    />
  </form>
</template>

<script setup lang="ts">
import type { ApiPage } from '@/types/pages/ApiPage';

import CButton from '@/components/common/c-button';
import CFieldList from '@/components/common/c-field-list';

import { useValidators } from '@/use/validators';
import { useForm } from '@/use/form';

const props = defineProps<{
  pages: ApiPage[];
  loadingCreatePage: boolean;
}>();

const emit = defineEmits<{
  (e: 'create', page: Omit<ApiPage, 'id' | 'order'>): void;
}>();

const { required, exist } = useValidators();
const form = useForm({
  name: {
    placeholder: 'Name',
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
</script>

<style lang="scss" src="./u-page-create-form.scss" />
