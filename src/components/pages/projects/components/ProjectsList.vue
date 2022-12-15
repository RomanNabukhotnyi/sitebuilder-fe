<template>
  <div v-for="project in projects" :key="project.id">
    <div class="projects">
      <div class="project" @click="openProject(project.id)">
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
          <div class="hstack">
            <div class="ms-auto">
              <my-button class="button__edit" @click.stop="showDialog">
                Edit
              </my-button>
              <my-dialog v-model:show="dialogVisible">
                <edit-project-form :project="project" @edit="editProject" />
              </my-dialog>
            </div>
            <my-button
              class="button__delete"
              @click.stop="deleteProject(project.id)"
            >
              Delete
            </my-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyButton from './MyButton.vue';
import EditProjectForm from './EditProjectForm.vue';
import MyDialog from './MyDialog.vue';

interface Project {
  id: number;
  name: string;
  createdAt: string;
}

export default defineComponent({
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
    };
  },
  methods: {
    openProject(projectId: number) {
      this.$router.push(`projects/${projectId}/pages`);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    deleteProject(id: number) {
      this.$emit('delete', id);
    },
    editProject(project: { id: number; name: string }) {
      this.$emit('edit', project);
    },
  },
});
</script>

<style scoped>
.projects {
  position: relative;
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
.button__edit {
  background-color: #ffc038;
}
.button__delete {
  background-color: #ff4747;
}
</style>
