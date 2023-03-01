<template>
  <form
    class="u-project-create-form"
    @submit.prevent="createProject"
  >
    <h4>Create project</h4>
    <CFieldList
      v-model:fields="form.fields"
      :is-show-errors="isSubmitted"
    />
    <CButton
      :is-loading="loadingCreateProject"
      :is-disabled="loadingCreateProject"
      label="Create"
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

import { useCreateFormProject } from './use/useCreateFormProject';

const props = defineProps<{
  projects: ApiProject[];
  loadingCreateProject: boolean;
}>();

const emit = defineEmits<{
  (e: 'create', project: Pick<ApiProject, 'name'>): void;
}>();

const form = useCreateFormProject(props.projects);

const isSubmitted = ref(false);

const createProject = () => {
  isSubmitted.value = true;

  if (!form.isValid.value) return;

  emit('create', form.getData());
};
</script>

<style lang="scss" src="./u-project-create-form.scss" />
