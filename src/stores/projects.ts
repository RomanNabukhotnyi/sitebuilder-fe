import { defineStore } from 'pinia';
import axios from 'axios';

import type { Project } from '../interfaces/Project';
import { IError } from '@/interfaces/IError';

interface State {
  projects: Project[];
  loadingGetProjects: boolean;
  loadingCreateProject: boolean;
  loadingEditProject: boolean;
  loadingDeleteProject: boolean;
}

export const useProjectsStore = defineStore('projects', {
  state: (): State => ({
    projects: [],
    loadingGetProjects: false,
    loadingCreateProject: false,
    loadingEditProject: false,
    loadingDeleteProject: false,
  }),
  actions: {
    async getProjects(): Promise<void> {
      try {
        this.loadingGetProjects = true;
        const response = await axios.get('/projects');
        this.projects = response.data.data;
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingGetProjects = false;
      }
    },
    async createProject(payload: { name: string }): Promise<void> {
      try {
        this.loadingCreateProject = true;
        const response = await axios.post('/projects', payload);
        this.projects.push(response.data.data);
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
        this.projects[index] = response.data.data;
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
  },
});
