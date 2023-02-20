<template>
  <div class="u-project-edit-form">
    <h4>Edit project</h4>
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
          A project with that name exist
        </p>
      </div>
    </div>
    <CButton
      class="button"
      :disabled="!form.valid || loadingEditProject"
      @click="editProject"
    >
      <p v-if="!loadingEditProject">
        Edit
      </p>
      <div
        v-else
        class="loadingio-spinner-ellipsis-yg3d79y87xd"
      >
        <div class="ldio-bzxhjz25vr">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </CButton>
  </div>
</template>

<script setup lang="ts">
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
