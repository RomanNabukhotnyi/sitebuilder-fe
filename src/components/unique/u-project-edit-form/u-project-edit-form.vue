<template>
  <form
    class="u-project-edit-form"
    @submit.prevent="editProject"
  >
    <h4>Edit project</h4>
    <CFieldList :fields="form.getFields()" />
    <CButton
      :is-loading="loadingEditProject"
      :is-disabled="!form.valid || loadingEditProject"
      label="Edit"
      class="button"
      @click="editProject"
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
  project: ApiProject;
  projects: ApiProject[];
  loadingEditProject: boolean;
}>();

const emit = defineEmits<{
  (e: 'edit', project: ApiProject): void;
}>();

const { required, exist } = useValidators();
const form = useForm({
  name: {
    value: props.project.name,
    placeholder: 'Name',
    validators: {
      required,
      exist: exist(
        props.projects
          .map((p) => p.name)
          .filter((name) => name !== props.project.name)
      ),
    },
  },
});

const editProject = () => {
  emit('edit', {
    ...props.project,
    name: form.name.value,
  });
};
</script>

<style lang="scss" src="./u-project-edit-form.scss" />
