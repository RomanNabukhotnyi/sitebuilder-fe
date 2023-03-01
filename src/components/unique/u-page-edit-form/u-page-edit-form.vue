<template>
  <form
    class="u-page-edit-form"
    @submit.prevent="editPage"
  >
    <h4>Edit page</h4>
    <CFieldList
      v-model:fields="form.fields"
      :is-show-errors="isSubmitted"
    />
    <CButton
      :is-loading="loadingEditPage"
      :is-disabled="loadingEditPage"
      label="Edit"
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

import { useEditFormPage } from './use/useEditFormPage';

const props = defineProps<{
  page: ApiPage;
  pages: ApiPage[];
  loadingEditPage: boolean;
}>();

const emit = defineEmits<{
  (e: 'edit', page: ApiPage): void;
}>();

const form = useEditFormPage(props.page, props.pages);

const isSubmitted = ref(false);

const editPage = () => {
  isSubmitted.value = true;

  if (!form.isValid.value) return;

  emit('edit', {
    ...props.page,
    ...form.getData(),
  });
};
</script>

<style lang="scss" src="./u-page-edit-form.scss" />
