<template>
  <form
    class="u-page-edit-form"
    @submit.prevent="editPage"
  >
    <h4>Edit page</h4>
    <CFieldList :fields="form.getFields()" />
    <CButton
      :is-loading="loadingEditPage"
      :is-disabled="!form.valid || loadingEditPage"
      label="Edit"
      class="button"
      @click="editPage"
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
  page: ApiPage;
  pages: ApiPage[];
  loadingEditPage: boolean;
}>();

const emit = defineEmits<{
  (e: 'edit', page: ApiPage): void;
}>();

const { required, exist } = useValidators();
const form = useForm({
  name: {
    value: props.page.name,
    placeholder: 'Name',
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

const editPage = () => {
  emit('edit', {
    ...props.page,
    name: form.name.value,
  });
};
</script>

<style lang="scss" src="./u-page-edit-form.scss" />
