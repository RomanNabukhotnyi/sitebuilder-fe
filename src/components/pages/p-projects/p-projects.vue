<template>
    <div class="p-projects">
        <CModal v-model:show="dialogCreateVisible">
            <UProjectCreateForm
                :loading-create-project="loadingCreateProject"
                :projects="projects"
                @create="createProject"
            />
        </CModal>
        <CModal v-model:show="dialogEditVisible">
            <UProjectEditForm
                :loading-edit-project="loadingEditProject"
                :project="editingProject!"
                :projects="projects"
                @edit="editProject"
            />
        </CModal>
        <CModal v-model:show="permissionsVisible">
            <UProjectUserPermissions
                :project="permissionsProject!"
                :projects="projects"
                :user="user"
                :loading-add-permission="loadingAddPermission"
                :loading-delete-permission="loadingDeletePermission"
                @invite="addPermission"
                @delete="deletePermission"
            />
        </CModal>
        <CModal v-model:show="apiKeyVisible">
            <UProjectApiKey
                :project="apiKeyProject!"
                :user="user"
                :loading-create-api-key="loadingCreateApiKey"
                :loading-refresh-api-key="loadingRefreshApiKey"
                :loading-delete-api-key="loadingDeleteApiKey"
                @create="createApiKey"
                @refresh="refreshApiKey"
                @delete="deleteApiKey"
            />
        </CModal>
        <div class="panel">
            <div class="panel__sort">
                <!-- SORT -->
            </div>
            <CSearch v-model="searchQuery"/>
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
                @delete="deleteProject"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

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
const loadingCreateApiKey = computed(() => projectsStore.loadingCreateApiKey);
const loadingRefreshApiKey = computed(() => projectsStore.loadingRefreshApiKey);
const loadingDeleteApiKey = computed(() => projectsStore.loadingDeleteApiKey);
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
const createProject = async (project: { name: string }) => {
    await projectsStore.createProject({ name: project.name });
    dialogCreateVisible.value = false;
};
const editProject = async (project: { id: number; name: string }) => {
    await projectsStore.updateProject(project.id, {
        name: project.name,
    });
    dialogEditVisible.value = false;
};
const deleteProject = async (id: number) => {
    await projectsStore.deleteProject(id);
};
const addPermission = async (id: number, payload: ApiCreatePermission) => {
    await projectsStore.createPermission(id, payload);
};
const deletePermission = async (projectId: number, userId: number) => {
    await projectsStore.deletePermission(projectId, userId);
};
const createApiKey = async (projectId: number) => {
    await projectsStore.createApiKey(projectId);
};
const refreshApiKey = async (id: number, projectId: number) => {
    await projectsStore.refreshApiKey(id, projectId);
};
const deleteApiKey = async (id: number, projectId: number) => {
    await projectsStore.deleteApiKey(id, projectId);
};

onMounted(() => {
    projectsStore.getProjects();
});
</script>

<style lang="scss" src="./p-projects.scss"/>
