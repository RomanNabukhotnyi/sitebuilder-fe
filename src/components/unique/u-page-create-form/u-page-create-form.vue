<template>
  <form
    class="u-page-create-form"
    @submit.prevent="createPage"
  >
    <h4>Create page</h4>
    <CFieldList
      v-model:fields="form.fields"
      :is-show-errors="isSubmitted"
    />
    <CButton
      :is-loading="loadingCreatePage"
      :is-disabled="loadingCreatePage"
      label="Create"
      class="button"
      type="submit"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { ApiPage } from '@/types/pages/ApiPage';

import CButton from '@/components/common/c-button';
import CFieldList from '@/components/common/c-field-list';

import { useCreateFormPage } from './use/useCreateFormPage';

const props = defineProps<{
  pages: ApiPage[];
  loadingCreatePage: boolean;
}>();

const emit = defineEmits<{
  (e: 'create', page: Omit<ApiPage, 'id' | 'order'>): void;
}>();

const form = useCreateFormPage(props.pages);

const isSubmitted = ref(false);

const createPage = () => {
  isSubmitted.value = true;

  if (!form.isValid.value) return;

  emit('create', form.getData());
};
</script>

<style lang="scss" src="./u-page-create-form.scss" />
