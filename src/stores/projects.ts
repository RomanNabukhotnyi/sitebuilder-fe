import { defineStore } from 'pinia';
import axios from 'axios';
import { computed } from 'vue';
import { useAuthStore } from './auth';
import type { Project } from '../interfaces/Project';
import type { Permission } from '../interfaces/Permission';
import { IError } from '@/interfaces/IError';

interface IProject extends Project {
  permissions: Permission[];
}

interface State {
  projects: IProject[];
  loadingGetProjects: boolean;
  loadingCreateProject: boolean;
  loadingEditProject: boolean;
  loadingDeleteProject: boolean;
  loadingAddPermission: boolean;
  loadingDeletePermission: boolean;
}

export const useProjectsStore = defineStore('projects', {
  state: (): State => ({
    projects: [],
    loadingGetProjects: false,
    loadingCreateProject: false,
    loadingEditProject: false,
    loadingDeleteProject: false,
    loadingAddPermission: false,
    loadingDeletePermission: false,
  }),
  actions: {
    async getProjects(): Promise<void> {
      try {
        this.loadingGetProjects = true;
        const response = await axios.get('/projects');
        const projects = response.data.data as Project[];
        this.projects = await Promise.all(
          projects.map(async (project) => {
            let permissions: Permission[];
            try {
              permissions = (
                await axios.get(`/projects/${project.id}/permissions`)
              ).data.data;
            } catch (error) {
              permissions = [];
            }
            return {
              ...project,
              permissions,
            };
          })
        );
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingGetProjects = false;
      }
    },
    async createProject(payload: { name: string }): Promise<void> {
      try {
        const authStore = useAuthStore();
        const user = computed(() => authStore.user);
        this.loadingCreateProject = true;
        const response = await axios.post('/projects', payload);
        this.projects.push({
          ...response.data.data,
          permissions: [
            {
              email: user.value?.email,
              permission: 'OWNER',
            },
          ],
        });
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingCreateProject = false;
      }
    },
    async editProject(id: number, payload: { name: string }): Promise<void> {
      try {
        this.loadingEditProject = true;
        const response = await axios.put(`/projects/${id}`, payload);
        const index = this.projects.findIndex((project) => project.id === id);
        Object.assign(this.projects[index], response.data.data);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingEditProject = false;
      }
    },
    async deleteProject(id: number): Promise<void> {
      try {
        this.loadingDeleteProject = true;
        await axios.delete(`/projects/${id}`);
        const index = this.projects.findIndex((project) => project.id === id);
        this.projects.splice(index, 1);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingDeleteProject = false;
      }
    },
    async createPermission(
      id: number,
      payload: { email: string; permission: string }
    ): Promise<void> {
      try {
        this.loadingAddPermission = true;
        const response = await axios.post(
          `/projects/${id}/permissions`,
          payload
        );
        const index = this.projects.findIndex((project) => project.id === id);
        this.projects[index].permissions.push(response.data.data);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingAddPermission = false;
      }
    },
    async deletePermission(projectId: number, userId: number): Promise<void> {
      try {
        this.loadingDeletePermission = true;
        await axios.delete(`/projects/${projectId}/permissions/${userId}`);
        const projectIndex = this.projects.findIndex(
          (project) => project.id === projectId
        );
        const permissionIndex = this.projects[
          projectIndex
        ].permissions.findIndex((permission) => permission.userId === userId);
        this.projects[projectIndex].permissions.splice(permissionIndex, 1);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingDeletePermission = false;
      }
    },
  },
});
