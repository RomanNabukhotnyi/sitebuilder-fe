<template>
  <form
    class="u-project-create-form"
    @submit.prevent="createProject"
  >
    <h4>Create project</h4>
    <CFieldList :fields="form.getFields()" />
    <CButton
      :is-loading="loadingCreateProject"
      :is-disabled="!form.valid || loadingCreateProject"
      label="Create"
      class="button"
      @click="createProject"
    />
  </form>
</template>

<script setup lang="ts">
import type { ApiProject } from '@/types/projects/ApiProject';

import CButton from '@/components/common/c-button';
import CFieldList from '@/components/common/c-field-list';

import { useValidators } from '@/use/validators';
import { useForm } from '@/use/form';

const props = defineProps<{
  projects: ApiProject[];
  loadingCreateProject: boolean;
}>();

const emit = defineEmits<{
  (e: 'create', project: Pick<ApiProject, 'name'>): void;
}>();

const { required, exist } = useValidators();
const form = useForm({
  name: {
    placeholder: 'Name',
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
</script>

<style lang="scss" src="./u-project-create-form.scss" />
