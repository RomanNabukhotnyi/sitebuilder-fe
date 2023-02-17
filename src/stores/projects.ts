import { defineStore } from 'pinia';

import type { PreparedProject } from '@/types/projects/PreparedProject';
import type { ApiCreateProject } from '@/types/projects/ApiCreateProject';
import type { ApiPermission } from '../types/permissions/ApiPermission';
import type { ApiKey } from '../types/ApiKey';
import type { ApiCreatePermission } from '@/types/permissions/ApiCreatePermission';
import { IError } from '@/types/IError';

import { getProjects, createProject, updateProject, deleteProject } from '@/api/projects';
import { getPermisiionsByProjectId, createPermission, deletePermission } from '@/api/permissions';
import { getApiKeyByProjectId, createApiKey, deleteApiKey, refreshApiKey } from '@/api/api-key';

interface State {
  projects: PreparedProject[];
  loadingGetProjects: boolean;
  loadingCreateProject: boolean;
  loadingEditProject: boolean;
  loadingDeleteProject: boolean;
  loadingAddPermission: boolean;
  loadingDeletePermission: boolean;
  loadingCreateApiKey: boolean;
  loadingRefreshApiKey: boolean;
  loadingDeleteApiKey: boolean;
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
    loadingCreateApiKey: false,
    loadingRefreshApiKey: false,
    loadingDeleteApiKey: false,
  }),
  actions: {
    async createProject(payload: ApiCreateProject): Promise<void> {
      try {
        this.loadingCreateProject = true;
        const project = await createProject(payload);
        const permissions = await getPermisiionsByProjectId(project.id);
        this.projects.push({
          ...project,
          permissions,
        });
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingCreateProject = false;
      }
    },
    async getProjects(): Promise<void> {
      try {
        this.loadingGetProjects = true;
        const projects = await getProjects();
        this.projects = await Promise.all(
          projects.map(async (project) => {
            let permissions: ApiPermission[];
            let apiKey: ApiKey | undefined;
            try {
              permissions = await getPermisiionsByProjectId(project.id);
            } catch (error) {
              permissions = [];
            }
            try {
              apiKey = await getApiKeyByProjectId(project.id);
            } catch (error) {
              apiKey = undefined;
            }
            return {
              ...project,
              permissions,
              apiKey,
            };
          })
        );
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingGetProjects = false;
      }
    },
    async updateProject(id: number, payload: { name: string }): Promise<void> {
      try {
        this.loadingEditProject = true;
        const project = await updateProject(id, payload);
        const index = this.projects.findIndex((project) => project.id === id);
        Object.assign(this.projects[index], project);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingEditProject = false;
      }
    },
    async deleteProject(id: number): Promise<void> {
      try {
        this.loadingDeleteProject = true;
        await deleteProject(id);
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
      payload: ApiCreatePermission
    ): Promise<void> {
      try {
        this.loadingAddPermission = true;
        const permission = await createPermission(id, payload);
        const index = this.projects.findIndex((project) => project.id === id);
        this.projects[index].permissions.push(permission);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingAddPermission = false;
      }
    },
    async deletePermission(projectId: number, userId: number): Promise<void> {
      try {
        this.loadingDeletePermission = true;
        await deletePermission(projectId, userId);
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
    async createApiKey(projectId: number): Promise<void> {
      try {
        this.loadingCreateApiKey = true;
        const apiKey = await createApiKey(projectId);
        const index = this.projects.findIndex(
          (project) => project.id === projectId
        );
        this.projects[index].apiKey = apiKey;
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingCreateApiKey = false;
      }
    },
    async refreshApiKey(id: number, projectId: number): Promise<void> {
      try {
        this.loadingRefreshApiKey = true;
        const apiKey = await refreshApiKey(projectId, id);
        const index = this.projects.findIndex(
          (project) => project.id === projectId
        );
        this.projects[index].apiKey = apiKey;
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingRefreshApiKey = false;
      }
    },
    async deleteApiKey(id: number, projectId: number): Promise<void> {
      try {
        this.loadingDeleteApiKey = true;
        await deleteApiKey(projectId, id);
        const index = this.projects.findIndex(
          (project) => project.id === projectId
        );
        this.projects[index].apiKey = undefined;
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingDeleteApiKey = false;
      }
    },
  },
});
