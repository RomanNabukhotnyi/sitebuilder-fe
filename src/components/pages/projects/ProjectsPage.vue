<template>
  <div class="main">
    <div class="panel">
      <div class="panel__sort">
        <!-- SORT -->
      </div>
      <search-project @filter="filter" />
      <my-dialog v-model:show="dialogVisible">
        <create-project-form @create="createProject" />
      </my-dialog>
      <my-button class="button-create" @click="showDialog">
        Create Project
      </my-button>
    </div>
    <div>
      <div v-if="getAllProjects.length !== 0" class="projectsContainer">
        <projects-list
          :projects="getAllProjects"
          @edit="editProject"
          @delete="deleteProject"
        />
      </div>
      <div v-else class="noProjects">
        <h3>No projects 🤷‍♀️</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProjectsList from './components/ProjectsList.vue';
import MyDialog from './components/MyDialog.vue';
import CreateProjectForm from './components/CreateProjectForm.vue';
import MyButton from './components/MyButton.vue';
import SearchProject from './components/SearchProject.vue';
import { useProjectsStore } from '../../../stores/projects';

interface Data {
  dialogVisible: boolean;
}

export default defineComponent({
  components: {
    ProjectsList,
    MyDialog,
    CreateProjectForm,
    MyButton,
    SearchProject,
  },
  setup() {
    const projectsStore = useProjectsStore();
    return {
      projectsStore,
    };
  },
  data(): Data {
    return {
      dialogVisible: false,
    };
  },
  mounted() {
    this.projectsStore.getAllProjectsApi();
  },
  computed: {
    getAllProjects() {
      return this.projectsStore.getAllProjects;
    },
  },
  methods: {
    async filter(search: string) {
      await this.projectsStore.getAllProjectsApi();
      this.projectsStore.setProjects(
        this.getAllProjects.filter((project) =>
          project.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async createProject(project: { name: string }) {
      await this.projectsStore.createProject({ name: project.name });
      this.projectsStore.getAllProjectsApi();
      this.dialogVisible = false;
    },
    async editProject(project: { id: number; name: string }) {
      await this.projectsStore.editProject(project.id, {
        name: project.name,
      });
      this.projectsStore.getAllProjectsApi();
      this.dialogVisible = false;
    },
    async deleteProject(id: number) {
      await this.projectsStore.deleteProject(id);
      this.projectsStore.getAllProjectsApi();
    },
  },
});
</script>

<style scoped>
@import 'projects.css';
</style>
