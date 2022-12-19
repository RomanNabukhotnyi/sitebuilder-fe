<template>
  <div class="projectsContainer">
    <MyDialog v-model:show="dialogVisible">
      <EditProjectForm :project="project" @edit="editProject" />
    </MyDialog>
    <div
      class="project"
      v-for="project in projects"
      :key="project.id"
      @click="openProject(project.id)"
    >
      <div class="imageContainer">
        <img
          class="projectImage"
          width="270"
          height="92"
          src="https://img.zeplin.io/https%3A%2F%2Fcdn.zeplin.io%2F638878ea1a052582d3461e31%2Fscreens%2F1ef6e135-a095-40bb-a7a6-ef091643fe44.png?w=270&amp;cropTop=0&amp;cropLeft=0&amp;cropWidth=270&amp;cropHeight=92"
        />
      </div>
      <div class="project__body">
        <div class="projectName">
          {{ project.name }}
        </div>
        <div class="actions">
          <MyButton class="button__edit" @click.stop="showDialog(project)">
            Edit
          </MyButton>
          <MyButton
            class="button__delete"
            @click.stop="deleteProject(project.id)"
          >
            Delete
          </MyButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyButton from '../../../common/MyButton.vue';
import EditProjectForm from './EditProjectForm.vue';
import MyDialog from '../../../common/MyDialog.vue';

import type { Project } from '@/interfaces/Project';

export default defineComponent({
  name: 'ProjectList',
  components: {
    MyButton,
    EditProjectForm,
    MyDialog,
  },
  props: {
    projects: {
      type: Array<Project>,
      required: true,
    },
  },
  setup() {
    return {};
  },
  data() {
    return {
      dialogVisible: false,
      project: {},
    };
  },
  methods: {
    openProject(projectId: number) {
      this.$router.push(`/projects/${projectId}`);
    },
    showDialog(project: Project) {
      this.project = project;
      this.dialogVisible = true;
    },
    deleteProject(id: number) {
      this.$emit('delete', id);
    },
    editProject(project: { id: number; name: string }) {
      this.$emit('edit', project);
      this.dialogVisible = false;
    },
  },
});
</script>

<style scoped>
.projectsContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, 272px);
  grid-gap: 24px;
  justify-content: center;
  padding: 12px 0;
}
.project {
  position: relative;
  width: 272px;
  border-radius: 2px;
  border: 1px solid #edeced;
  cursor: pointer;
}
.imageContainer {
  width: 100%;
  height: 92px;
  background-color: #fbfbfb;
}
.imageContainer .projectImage {
  width: 100%;
  height: 92px;
  opacity: 1;
}
.project__body {
  padding: 18px 12px 12px;
  background-color: #fff;
}
.project__body .projectName {
  margin-bottom: 18px;
  line-height: 21px;
  font-size: 18px;
  color: #554d56;
}
.actions {
  display: flex;
  justify-content: end;
}
.button__edit {
  background-color: #ffc038;
}
.button__delete {
  background-color: #ff4747;
}
</style>
