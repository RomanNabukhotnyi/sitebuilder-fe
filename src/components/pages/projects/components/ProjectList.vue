<template>
  <div>
    <div
      class="projectsContainer"
      v-show="!loadingGetProjects && projects.length !== 0"
    >
      <TransitionGroup name="list">
        <div
          v-for="project in projects"
          :class="{
            project: true,
            deleteProject: loadingDeleteProject && project.id === deleteId,
          }"
          :key="project.id"
        >
          <ProjectMenu
            v-if="project.id === menuProjectId"
            :user="user"
            :project="project"
            v-model:show="menuVisible"
            @showPermissions="showPermissions(project)"
            @showApiKey="showApiKey(project)"
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
          ></div>
          <div class="imageContainer">
            <button
              type="button"
              class="btnProjectMenu"
              @click.stop="showMenu(project.id)"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#554d56"
                  fill-rule="evenodd"
                  d="M11.437 7.5a2 2 0 0 1-3.874 0H4.5a.5.5 0 0 1 0-1H7.563a2 2 0 0 1 3.874 0H19.5a.5.5 0 1 1 0 1h-8.063zm-1.07 0a.995.995 0 0 0 0-1 1 1 0 1 0 0 1zm3.196 4.5a2 2 0 0 1 3.874 0H19.5a.5.5 0 1 1 0 1h-2.063a2 2 0 0 1-3.874 0H4.5a.5.5 0 1 1 0-1h9.063zm1.07 0a.995.995 0 0 0 0 1 1 1 0 1 0 0-1zm-5.196 6a2 2 0 0 1-3.874 0H4.5a.5.5 0 1 1 0-1h1.063a2 2 0 0 1 3.874 0H19.5a.5.5 0 1 1 0 1H9.437zm-1.07 0a.995.995 0 0 0 0-1 1 1 0 1 0 0 1z"
                ></path>
              </svg>
            </button>
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
    <div v-show="loadingGetProjects" class="projectsContainer">
      <div
        class="project-placeholder placeholder-animate"
        v-for="item in 3"
        :style="{ animationDelay: `1.${item}s` }"
        :key="item"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ProjectMenu from './ProjectMenu.vue';
import type { Project } from '@/interfaces/Project';
import type { Permission } from '@/interfaces/Permission';

interface IProject extends Project {
  permissions: Permission[];
}

defineProps<{
  user: { email: string } | null;
  projects: IProject[];
  loadingGetProjects: boolean;
  loadingDeleteProject: boolean;
}>();
const emit = defineEmits<{
  (e: 'showPermissions', project: IProject): void;
  (e: 'showApiKey', project: IProject): void;
  (e: 'showEditDialog', project: IProject): void;
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
const showPermissions = (project: IProject) => {
  menuVisible.value = false;
  emit('showPermissions', project);
};
const showApiKey = (project: IProject) => {
  menuVisible.value = false;
  emit('showApiKey', project);
};
const showEditDialog = (project: IProject) => {
  menuVisible.value = false;
  emit('showEditDialog', project);
};
const deleteProject = (id: number) => {
  menuVisible.value = false;
  deleteId.value = id;
  emit('delete', id);
};
</script>

<style scoped lang="scss">
.projectsContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, 272px);
  grid-gap: 24px;
  justify-content: center;
  padding: 12px 0;
}
.project {
  position: relative;
  width: 272px;
  border-radius: 2px;
  border: 1px solid #edeced;
  cursor: pointer;
}
.project:hover .projectHover {
  border: 2px solid #419bf9;
  top: -2px;
  left: -2px;
  position: absolute;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  transition: opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgba(65, 154, 249, 0.2);
  border-radius: 4px;
}
.deleteProject .btnProjectMenu {
  display: none;
}
.btnProjectMenu {
  position: absolute;
  top: 12px;
  left: 12px;
  cursor: pointer;
  border-radius: 50%;
  min-width: 28px;
  min-height: 28px;
  line-height: 0;
}
.project:not(:hover) .btnProjectMenu {
  opacity: 0;
  transition: opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.project:hover .btnProjectMenu {
  opacity: 1;
  transition: opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1);
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
.deleteProject {
  opacity: 0.5;
  cursor: default;
}
.project__body .projectName {
  line-height: 21px;
  font-size: 18px;
  color: #554d56;
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
/* animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
/* placeholders */
.project-placeholder {
  background-color: #eeeeee;
  width: 272px;
  height: 191px;
  border-radius: 2px;
}
@keyframes loading {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
.placeholder-animate {
  animation-name: loading;
  animation-timing-function: steps(10, end);
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-duration: 1s;
}
</style>
