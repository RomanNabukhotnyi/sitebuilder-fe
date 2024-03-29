<template>
  <div class="u-project-list">
    <div
      v-show="!loadingGetProjects && projects.length"
      class="projectsContainer"
    >
      <CTransitionList>
        <div
          v-for="project in projects"
          :key="project.id"
          :class="{
            project: true,
            deleteProject: isDeletedProject(project.id),
          }"
        >
          <UProjectMenu
            v-if="project.id === menuProjectId"
            v-model:show="menuVisible"
            :user="user"
            :project="project"
            @show-permissions="showPermissions(project)"
            @show-api-key="showApiKey(project)"
            @edit="showEditDialog(project)"
            @delete="deleteProject(project.id)"
          />
          <div
            :class="{
              projectHover: !isDeletedProject(project.id),
            }"
            @click="openProject(project.id)"
          />
          <div class="imageContainer">
            <button
              type="button"
              class="btnProjectMenu"
              @click.stop="showMenu(project.id)"
            >
              <CIconMenu />
            </button>
          </div>
          <div class="project__body">
            <div class="projectName">
              {{ project.name }}
            </div>
          </div>
        </div>
      </CTransitionList>
    </div>
    <div
      v-show="!loadingGetProjects && projects.length === 0"
      class="noProjects"
    >
      <h3>No projects</h3>
    </div>
    <div
      v-show="loadingGetProjects"
      class="projectsContainer"
    >
      <div
        v-for="item in 3"
        :key="item"
        class="project-placeholder placeholder-animate"
        :style="{ animationDelay: `1.${item}s` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import CIconMenu from '@/components/common/c-icon-menu';
import CTransitionList from '@/components/common/c-transition-list';

import type { PreparedProject } from '@/types/projects/PreparedProject';

import UProjectMenu from '../u-project-menu';
import { ROUTE_NAMES } from '@/constants/route-names-constants';

const props = defineProps<{
  user: { email: string } | null;
  projects: PreparedProject[];
  loadingGetProjects: boolean;
  loadingDeleteProject: boolean;
}>();

const emit = defineEmits<{
  (e: 'showPermissions', project: PreparedProject): void;
  (e: 'showApiKey', project: PreparedProject): void;
  (e: 'showEditDialog', project: PreparedProject): void;
  (e: 'delete', id: number): void;
}>();

const router = useRouter();
const menuVisible = ref(false);
const menuProjectId = ref<number | null>(null);
const deleteId = ref<number | null>(null);
const isDeletedProject = (projectId: number) => props.loadingDeleteProject && projectId === deleteId.value;

const openProject = (projectId: number) => {
  if (isDeletedProject(projectId)) return;

  router.push({
    name: ROUTE_NAMES.PAGES,
    params: {
      projectId,
    },
  });
};
const showMenu = (projectId: number) => {
  menuProjectId.value = projectId;
  menuVisible.value = true;
};
const showPermissions = (project: PreparedProject) => {
  menuVisible.value = false;
  emit('showPermissions', project);
};
const showApiKey = (project: PreparedProject) => {
  menuVisible.value = false;
  emit('showApiKey', project);
};
const showEditDialog = (project: PreparedProject) => {
  menuVisible.value = false;
  emit('showEditDialog', project);
};
const deleteProject = (id: number) => {
  menuVisible.value = false;
  deleteId.value = id;
  emit('delete', id);
};
</script>

<style lang="scss" src="./u-project-list.scss" />
