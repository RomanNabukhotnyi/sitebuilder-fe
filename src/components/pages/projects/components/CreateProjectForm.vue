<template>
  <div class="form">
    <h4>Create project</h4>
    <div class="field">
      <MyInput
        class="input"
        type="text"
        placeholder="Name"
        @input="nameValidation"
        v-model="project.name"
      />
      <p v-if="nameError" class="error">{{ nameError }}</p>
    </div>
    <MyButton class="button" :disabled="validation" @click="createProject"
      >Create</MyButton
    >
  </div>
</template>

<script lang="ts">
import MyButton from '../../../common/MyButton.vue';
import MyInput from '../../../common/MyInput.vue';
import { defineComponent } from 'vue';
import type { Project } from '@/interfaces/Project';

export default defineComponent({
  name: 'CreateProjectForm',
  components: {
    MyButton,
    MyInput,
  },
  props: {
    projects: {
      type: Array<Project>,
      required: true,
    },
  },
  data() {
    return {
      project: {
        name: '',
      },
      nameError: '',
    };
  },
  computed: {
    validation(): boolean {
      return !!this.nameError;
    },
  },
  methods: {
    nameValidation(): boolean {
      if (this.project.name === '') {
        this.nameError = 'Field is required';
        return false;
      }
      if (
        this.$props.projects.find(
          (project) => project.name === this.project.name
        )
      ) {
        this.nameError = 'A project with that name exists';
        return false;
      }
      this.nameError = '';
      return true;
    },
    createProject() {
      if (this.nameValidation()) {
        this.$emit('create', this.project);
      }
    },
  },
});
</script>

<style scoped>
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
}
.button:disabled {
  background-color: #a9b5c2;
}
.button:disabled:hover {
  opacity: 1;
  cursor: default;
}
</style>
