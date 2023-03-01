<template>
  <form
    class="u-project-edit-form"
    @submit.prevent="editProject"
  >
    <h4>Edit project</h4>
    <CFieldList
      v-model:fields="form.fields"
      :is-show-errors="isSubmitted"
    />
    <CButton
      :is-loading="loadingEditProject"
      :is-disabled="loadingEditProject"
      label="Edit"
      class="button"
      type="submit"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { ApiProject } from '@/types/projects/ApiProject';

import CButton from '@/components/common/c-button';
import CFieldList from '@/components/common/c-field-list';

import { useEditFormProject } from './use/useEditFormProject';

const props = defineProps<{
  project: ApiProject;
  projects: ApiProject[];
  loadingEditProject: boolean;
}>();

const emit = defineEmits<{
  (e: 'edit', project: ApiProject): void;
}>();

const form = useEditFormProject(props.project, props.projects);

const isSubmitted = ref(false);

const editProject = () => {
  isSubmitted.value = true;

  if (!form.isValid.value) return;
  
  emit('edit', {
    ...props.project,
    ...form.getData(),
  });
};
</script>

<style lang="scss" src="./u-project-edit-form.scss" />
