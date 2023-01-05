<template>
  <div class="form">
    <h4>Edit project</h4>
    <div class="field">
      <MyInput
        v-focus
        class="input"
        type="text"
        placeholder="Name"
        v-model="form.name.value"
      />
      <div v-if="!form.name.errors.required">
        <p v-if="form.name.errors.exist" class="error">
          A project with that name exist
        </p>
      </div>
    </div>
    <MyButton
      class="button"
      :disabled="!form.valid || loadingEditProject"
      @click="editProject"
    >
      <p v-if="!loadingEditProject">Edit</p>
      <div v-else class="loadingio-spinner-ellipsis-yg3d79y87xd">
        <div class="ldio-bzxhjz25vr">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </MyButton>
  </div>
</template>

<script setup lang="ts">
import MyButton from '../../../common/MyButton.vue';
import MyInput from '../../../common/MyInput.vue';
import type { Project } from '@/interfaces/Project';
import { useValidators } from '@/use/validators';
import { useForm } from '@/use/form';
const props = defineProps<{
  project: Project;
  projects: Project[];
  loadingEditProject: boolean;
}>();
const emit = defineEmits<{
  (e: 'edit', project: Project): void;
}>();
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
window.addEventListener('keyup', (event) => {
  if (event.code === 'Enter' && form.valid) {
    editProject();
  }
});
const editProject = () => {
  emit('edit', {
    ...props.project,
    name: form.name.value,
  });
};
</script>

<style scoped>
img {
  color: white;
  height: 20px;
}
.form {
  display: flex;
  flex-direction: column;
}
.field {
  margin: 15px 0;
}
.error {
  font-size: 10px;
  color: rgb(255, 107, 107);
}
.button {
  align-self: flex-end;
  width: 50%;
}
.button:disabled {
  background-color: #a9b5c2;
}
.button:disabled:hover {
  opacity: 1;
  cursor: default;
}
/* loading */
@keyframes ldio-bzxhjz25vr {
  0% {
    transform: translate(1.2px, 8px) scale(0);
  }
  25% {
    transform: translate(1.2px, 8px) scale(0);
  }
  50% {
    transform: translate(1.2px, 8px) scale(1);
  }
  75% {
    transform: translate(8px, 8px) scale(1);
  }
  100% {
    transform: translate(14.8px, 8px) scale(1);
  }
}
@keyframes ldio-bzxhjz25vr-r {
  0% {
    transform: translate(14.8px, 8px) scale(1);
  }
  100% {
    transform: translate(14.8px, 8px) scale(0);
  }
}
.ldio-bzxhjz25vr div {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  transform: translate(8px, 8px) scale(1);
  background: white;
  animation: ldio-bzxhjz25vr 1s infinite cubic-bezier(0, 0.5, 0.5, 1);
}
.ldio-bzxhjz25vr div:nth-child(1) {
  transform: translate(14.8px, 8px) scale(1);
  animation: ldio-bzxhjz25vr-r 0.25s infinite cubic-bezier(0, 0.5, 0.5, 1);
}
.ldio-bzxhjz25vr div:nth-child(2) {
  animation-delay: -0.25s;
}
.ldio-bzxhjz25vr div:nth-child(3) {
  animation-delay: -0.5s;
}
.ldio-bzxhjz25vr div:nth-child(4) {
  animation-delay: -0.75s;
}
.ldio-bzxhjz25vr div:nth-child(5) {
  animation-delay: -1s;
}
.loadingio-spinner-ellipsis-yg3d79y87xd {
  width: 20px;
  height: 20px;
  display: inline-block;
}
.ldio-bzxhjz25vr {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}
.ldio-bzxhjz25vr div {
  box-sizing: content-box;
}
</style>
