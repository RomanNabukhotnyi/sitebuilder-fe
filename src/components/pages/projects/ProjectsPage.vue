<template>
  <div>
    <div class="panel">
      <div class="panel__sort">
        <!-- SORT -->
      </div>
      <SearchProject @filter="filter" />
      <MyDialog v-model:show="dialogVisible">
        <CreateProjectForm @create="createProject" :projects="getAllProjects" />
      </MyDialog>
      <MyButton class="button__create" @click="showDialog">
        Create Project
      </MyButton>
    </div>
    <div>
      <ProjectList
        v-if="getAllProjects.length !== 0"
        :projects="getAllProjects"
        @edit="editProject"
        @delete="deleteProject"
      />
      <div v-else class="noProjects">
        <h3>No projects</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProjectList from './components/ProjectList.vue';
import MyDialog from '../../common/MyDialog.vue';
import CreateProjectForm from './components/CreateProjectForm.vue';
import MyButton from '../../common/MyButton.vue';
import SearchProject from './components/SearchProject.vue';
import { useProjectsStore } from '../../../stores/projects';

interface Data {
  dialogVisible: boolean;
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
    return {
      projectsStore,
    };
  },
  data(): Data {
    return {
      dialogVisible: false,
    };
  },
  async mounted() {
    await this.projectsStore.getAllProjectsApi();
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
      await this.projectsStore.getAllProjectsApi();
      this.dialogVisible = false;
    },
    async editProject(project: { id: number; name: string }) {
      await this.projectsStore.editProject(project.id, {
        name: project.name,
      });
      await this.projectsStore.getAllProjectsApi();
    },
    async deleteProject(id: number) {
      await this.projectsStore.deleteProject(id);
      await this.projectsStore.getAllProjectsApi();
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
.noProjects {
  padding: 60px 84px 108px;
  text-align: center;
}
.noProjects h3 {
  line-height: 28px;
  font-weight: 300;
  font-size: 24px;
  color: #554d56;
  margin-bottom: 12px;
}
.button__create {
  margin: 0 36px 0 auto;
}
</style>
