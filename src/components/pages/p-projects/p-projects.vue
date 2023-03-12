<template>
  <div class="p-projects">
    <CModal v-model:show="dialogCreateVisible">
      <UProjectCreateForm
        :loading-create-project="loadingCreateProject"
        :projects="projects"
        @create="handleCreateProject"
      />
    </CModal>
    <CModal v-model:show="dialogEditVisible">
      <UProjectEditForm
        :loading-edit-project="loadingEditProject"
        :project="editingProject!"
        :projects="projects"
        @edit="handleEditProject"
      />
    </CModal>
    <CModal v-model:show="permissionsVisible">
      <UProjectUserPermissions
        :project="permissionsProject!"
        :projects="projects"
        :user="user"
        :loading-add-permission="loadingAddPermission"
        :loading-delete-permission="loadingDeletePermission"
        @invite="handleAddPermission"
        @delete="handleDeletePermission"
      />
    </CModal>
    <CModal v-model:show="apiKeyVisible">
      <UProjectApiKey
        :project="apiKeyProject!"
        :user="user"
        :loading-create-api-key="loadingCreateApiKey"
        :loading-refresh-api-key="loadingRefreshApiKey"
        :loading-delete-api-key="loadingDeleteApiKey"
        @create="handleCreateApiKey"
        @refresh="handleRefreshApiKey"
        @delete="handleDeleteApiKey"
      />
    </CModal>
    <div class="panel">
      <div class="panel__sort">
        <!-- SORT -->
      </div>
      <CSearch v-model="searchQuery" />
      <CButton
        label="Create Project"
        class="button__create"
        @click="showCreateDialog"
      />
    </div>
    <div>
      <UProjectList
        :user="user"
        :projects="filterProjects"
        :loading-get-projects="loadingGetProjects"
        :loading-edit-project="loadingEditProject"
        :loading-delete-project="loadingDeleteProject"
        @show-permissions="showPermissions"
        @show-api-key="showApiKey"
        @show-edit-dialog="showEditDialog"
        @delete="handleDeleteProject"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import type { PreparedProject } from '@/types/projects/PreparedProject';
import type { ApiCreatePermission } from '@/types/permissions/ApiCreatePermission';

import UProjectList from '@/components/unique/u-project-list';
import CModal from '@/components/common/c-modal';
import UProjectCreateForm from '@/components/unique/u-project-create-form';
import UProjectEditForm from '@/components/unique/u-project-edit-form';
import UProjectUserPermissions from '@/components/unique/u-project-user-permissions';
import UProjectApiKey from '@/components/unique/u-project-api-key';
import CButton from '@/components/common/c-button';
import CSearch from '@/components/common/c-search';

import { useProjectsStore } from '@/stores/projects';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const projectsStore = useProjectsStore();

const { user } = storeToRefs(authStore);
const {
  projects,
  loadingGetProjects,
  loadingCreateProject,
  loadingEditProject,
  loadingDeleteProject,
  loadingAddPermission,
  loadingDeletePermission,
  loadingCreateApiKey,
  loadingRefreshApiKey,
  loadingDeleteApiKey,
} = storeToRefs(projectsStore);
const dialogCreateVisible = ref(false);
const dialogEditVisible = ref(false);
const permissionsVisible = ref(false);
const apiKeyVisible = ref(false);
const searchQuery = ref('');
const permissionsProject = ref<PreparedProject | null>(null);
const apiKeyProject = ref<PreparedProject | null>(null);
const editingProject = ref<PreparedProject | null>(null);
const filterProjects = computed(() =>
  projects.value.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const showCreateDialog = () => {
  dialogCreateVisible.value = true;
};

const showPermissions = (project: PreparedProject) => {
  permissionsProject.value = project;
  permissionsVisible.value = true;
};

const showApiKey = (project: PreparedProject) => {
  apiKeyProject.value = project;
  apiKeyVisible.value = true;
};

const showEditDialog = (project: PreparedProject) => {
  editingProject.value = project;
  dialogEditVisible.value = true;
};

const handleCreateProject = async (project: { name: string }) => {
  await projectsStore.createProject({ name: project.name });
  dialogCreateVisible.value = false;
};

const handleEditProject = async (project: { id: number; name: string }) => {
  await projectsStore.updateProject(project.id, {
    name: project.name,
  });
  dialogEditVisible.value = false;
};

const handleDeleteProject = (id: number) => {
  projectsStore.deleteProject(id);
};

const handleAddPermission = (id: number, payload: ApiCreatePermission) => {
  projectsStore.createPermission(id, payload);
};

const handleDeletePermission = (projectId: number, userId: number) => {
  projectsStore.deletePermission(projectId, userId);
};

const handleCreateApiKey = (projectId: number) => {
  projectsStore.createApiKey(projectId);
};

const handleRefreshApiKey = (id: number, projectId: number) => {
  projectsStore.refreshApiKey(id, projectId);
};

const handleDeleteApiKey = (id: number, projectId: number) => {
  projectsStore.deleteApiKey(id, projectId);
};

onMounted(() => {
  projectsStore.getProjects();
});
</script>

<style lang="scss" src="./p-projects.scss" />
