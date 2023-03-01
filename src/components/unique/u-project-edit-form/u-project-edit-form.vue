<template>
  <div class="u-project-edit-form">
    <h4>Edit project</h4>
    <CField
      :errors="form.name.errors"
      class="field"
    >
      <CInput
        v-model="form.name.value"
        v-focus
        class="input"
        type="text"
        placeholder="Name"
      />
    </CField>
    <CButton
      :is-loading="loadingEditProject"
      :is-disabled="!form.valid || loadingEditProject"
      label="Edit"
      class="button"
      @click="editProject"
    />
  </div>
</template>

<script setup lang="ts">
import CField from '@/components/common/c-field';
import CButton from '@/components/common/c-button';
import CInput from '@/components/common/c-input';

import type { ApiProject } from '@/types/projects/ApiProject';

import { useValidators } from '@/use/validators';
import { useEventListener } from '@/use/use-event-listener';
import { useForm } from '@/use/form';

const props = defineProps<{
  project: ApiProject;
  projects: ApiProject[];
  loadingEditProject: boolean;
}>();

const emit = defineEmits<{
  (e: 'edit', project: ApiProject): void;
}>();

const { windowEventListener } = useEventListener();
const { required, exist } = useValidators();
const form = useForm({
  name: {
    value: props.project.name,
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

windowEventListener('keyup', (event) => {
  if (event.code === 'Enter' && form.valid) {
    editProject();
  }
});
</script>

<style lang="scss" src="./u-project-edit-form.scss" />
