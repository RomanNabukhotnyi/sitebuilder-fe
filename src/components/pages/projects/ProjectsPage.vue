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
        :project="editingProject!"
        :projects="projects"
      />
    </MyDialog>
    <MyDialog v-model:show="permissionsVisible">
      <UsersPermissions
        :project="permissionsProject!"
        :projects="projects"
        :user="user"
        :loadingAddPermission="loadingAddPermission"
        :loadingDeletePermission="loadingDeletePermission"
        @invite="addPermission"
        @delete="deletePermission"
      />
    </MyDialog>
    <div class="panel">
      <div class="panel__sort">
        <!-- SORT -->
      </div>
      <SearchProject v-model:search="searchQuery" />
      <MyButton class="button__create" @click="showCreateDialog">
        Create Project
      </MyButton>
    </div>
    <div>
      <ProjectList
        :user="user"
        :projects="filterProjects"
        @showPermissions="showPermissions"
        @showEditDialog="showEditDialog"
        :loadingGetProjects="loadingGetProjects"
        :loadingEditProject="loadingEditProject"
        :loadingDeleteProject="loadingDeleteProject"
        @delete="deleteProject"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ProjectList from './components/ProjectList.vue';
import MyDialog from '../../common/MyDialog.vue';
import CreateProjectForm from './components/CreateProjectForm.vue';
import EditProjectForm from './components/EditProjectForm.vue';
import UsersPermissions from './components/UsersPermissions.vue';
import MyButton from '../../common/MyButton.vue';
import SearchProject from './components/SearchProject.vue';
import { useProjectsStore } from '@/stores/projects';
import { useAuthStore } from '@/stores/auth';
import type { Project } from '@/interfaces/Project';
import type { Permission } from '@/interfaces/Permission';

interface IProject extends Project {
  permissions: Permission[];
}
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const projectsStore = useProjectsStore();
const projects = computed(() => projectsStore.projects);
const loadingGetProjects = computed(() => projectsStore.loadingGetProjects);
const loadingCreateProject = computed(() => projectsStore.loadingCreateProject);
const loadingEditProject = computed(() => projectsStore.loadingEditProject);
const loadingDeleteProject = computed(() => projectsStore.loadingDeleteProject);
const loadingAddPermission = computed(() => projectsStore.loadingAddPermission);
const loadingDeletePermission = computed(
  () => projectsStore.loadingDeletePermission
);
const dialogCreateVisible = ref(false);
const dialogEditVisible = ref(false);
const permissionsVisible = ref(false);
const searchQuery = ref('');
const permissionsProject = ref<IProject | null>(null);
const editingProject = ref<IProject | null>(null);
const filterProjects = computed(() =>
  projects.value.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
onMounted(() => {
  projectsStore.getProjects();
});
const showCreateDialog = () => {
  dialogCreateVisible.value = true;
};
const showPermissions = (project: IProject) => {
  permissionsProject.value = project;
  permissionsVisible.value = true;
};
const showEditDialog = (project: IProject) => {
  editingProject.value = project;
  dialogEditVisible.value = true;
};
const createProject = async (project: { name: string }) => {
  await projectsStore.createProject({ name: project.name });
  dialogCreateVisible.value = false;
};
const editProject = async (project: { id: number; name: string }) => {
  await projectsStore.editProject(project.id, {
    name: project.name,
  });
  dialogEditVisible.value = false;
};
const deleteProject = async (id: number) => {
  await projectsStore.deleteProject(id);
};
const addPermission = async (
  id: number,
  payload: { email: string; permission: string }
) => {
  await projectsStore.createPermission(id, payload);
};
const deletePermission = async (projectId: number, userId: number) => {
  await projectsStore.deletePermission(projectId, userId);
};
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
