<template>
  <div class="u-project-list">
    <div
      v-show="!loadingGetProjects && projects.length !== 0"
      class="projectsContainer"
    >
      <TransitionGroup name="list">
        <div
          v-for="project in projects"
          :key="project.id"
          :class="{
            project: true,
            deleteProject: loadingDeleteProject && project.id === deleteId,
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
              projectHover: !(loadingDeleteProject && project.id === deleteId),
            }"
            @click="
              !(loadingDeleteProject && project.id === deleteId) &&
                !menuVisible &&
                openProject(project.id)
            "
          />
          <div class="imageContainer">
            <button
              type="button"
              class="btnProjectMenu"
              @click.stop="showMenu(project.id)"
            >
              <CIconMenu />
            </button>
            <img
              class="projectImage"
              width="270"
              height="92"
              src="https://img.zeplin.io/https%3A%2F%2Fcdn.zeplin.io%2F638878ea1a052582d3461e31%2Fscreens%2F1ef6e135-a095-40bb-a7a6-ef091643fe44.png?w=270&amp;cropTop=0&amp;cropLeft=0&amp;cropWidth=270&amp;cropHeight=92"
            >
          </div>
          <div class="project__body">
            <div class="projectName">
              {{ project.name }}
            </div>
          </div>
        </div>
      </TransitionGroup>
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

import type { PreparedProject } from '@/types/projects/PreparedProject';

import UProjectMenu from '../u-project-menu';
import CIconMenu from '@/components/common/c-icon-menu';

defineProps<{
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

const openProject = (projectId: number) => {
  router.push(`/projects/${projectId}`);
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
