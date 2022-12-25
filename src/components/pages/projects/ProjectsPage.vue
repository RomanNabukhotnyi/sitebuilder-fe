<template>
  <div>
    <MyDialog v-model:show="dialogCreateVisible">
      <CreateProjectForm
        @create="createProject"
        :loadingCreateProject="loadingCreateProject"
        :projects="projects"
      />
    </MyDialog>
    <MyDialog v-model:show="dialogEditVisible">
      <EditProjectForm
        @edit="editProject"
        :loadingEditProject="loadingEditProject"
        :project="project!"
        :projects="projects"
      />
    </MyDialog>
    <div class="panel">
      <div class="panel__sort">
        <!-- SORT -->
      </div>
      <SearchProject v-model:search="search" />
      <MyButton class="button__create" @click="showCreateDialog">
        Create Project
      </MyButton>
    </div>
    <div>
      <ProjectList
        :projects="filterProjects"
        @showEditDialog="showEditDialog"
        :loadingGetProjects="loadingGetProjects"
        :loadingEditProject="loadingEditProject"
        :loadingDeleteProject="loadingDeleteProject"
        @delete="deleteProject"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import ProjectList from './components/ProjectList.vue';
import MyDialog from '../../common/MyDialog.vue';
import CreateProjectForm from './components/CreateProjectForm.vue';
import EditProjectForm from './components/EditProjectForm.vue';
import MyButton from '../../common/MyButton.vue';
import SearchProject from './components/SearchProject.vue';
import { useProjectsStore } from '../../../store/projects';
import type { Project } from '@/interfaces/Project';

interface Data {
  dialogCreateVisible: boolean;
  dialogEditVisible: boolean;
  project: Project | null;
  search: string;
}

export default defineComponent({
  name: 'ProjectsPage',
  components: {
    ProjectList,
    MyDialog,
    CreateProjectForm,
    EditProjectForm,
    MyButton,
    SearchProject,
  },
  setup() {
    const projectsStore = useProjectsStore();
    const projects = computed(() => projectsStore.projects);
    const loadingGetProjects = computed(() => projectsStore.loadingGetProjects);
    const loadingCreateProject = computed(
      () => projectsStore.loadingCreateProject
    );
    const loadingEditProject = computed(() => projectsStore.loadingEditProject);
    const loadingDeleteProject = computed(
      () => projectsStore.loadingDeleteProject
    );
    return {
      projectsStore,
      projects,
      loadingGetProjects,
      loadingCreateProject,
      loadingEditProject,
      loadingDeleteProject,
    };
  },
  data(): Data {
    return {
      dialogCreateVisible: false,
      dialogEditVisible: false,
      project: null,
      search: '',
    };
  },
  mounted() {
    this.projectsStore.getProjects();
  },
  computed: {
    filterProjects() {
      return this.projects.filter((project) =>
        project.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    showCreateDialog() {
      this.dialogCreateVisible = true;
    },
    showEditDialog(project: Project) {
      this.project = project;
      this.dialogEditVisible = true;
    },
    async createProject(project: { name: string }) {
      await this.projectsStore.createProject({ name: project.name });
      this.dialogCreateVisible = false;
    },
    async editProject(project: { id: number; name: string }) {
      await this.projectsStore.editProject(project.id, {
        name: project.name,
      });
      this.dialogEditVisible = false;
    },
    async deleteProject(id: number) {
      await this.projectsStore.deleteProject(id);
    },
  },
});
</script>

<style scoped>
.panel {
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  top: 0;
  height: 76px;
}
.button__create {
  margin: 0 36px 0 auto;
}
</style>
