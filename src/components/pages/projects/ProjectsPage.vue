<template>
  <div>
    <div class="panel">
      <div class="panel__sort">
        <!-- SORT -->
      </div>
      <SearchProject v-model:search="search" />
      <MyDialog v-model:show="dialogVisible">
        <CreateProjectForm @create="createProject" :projects="projects" />
      </MyDialog>
      <MyButton class="button__create" @click="showDialog">
        Create Project
      </MyButton>
    </div>
    <div>
      <ProjectList
        :projects="filterProjects"
        :loadingGetProjects="loadingGetProjects"
        :loadingCreateProject="loadingCreateProject"
        :loadingEditProject="loadingEditProject"
        :loadingDeleteProject="loadingDeleteProject"
        @edit="editProject"
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
import MyButton from '../../common/MyButton.vue';
import SearchProject from './components/SearchProject.vue';
import { useProjectsStore } from '../../../store/projects';

interface Data {
  dialogVisible: boolean;
  search: string;
}

export default defineComponent({
  name: 'ProjectsPage',
  components: {
    ProjectList,
    MyDialog,
    CreateProjectForm,
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
      dialogVisible: false,
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
    showDialog() {
      this.dialogVisible = true;
    },
    async createProject(project: { name: string }) {
      await this.projectsStore.createProject({ name: project.name });
      this.dialogVisible = false;
    },
    async editProject(project: { id: number; name: string }) {
      await this.projectsStore.editProject(project.id, {
        name: project.name,
      });
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
