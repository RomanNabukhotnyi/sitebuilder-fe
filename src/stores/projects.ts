import { defineStore } from 'pinia';
import axios from 'axios';

import type { Project } from '../interfaces/Project';

interface State {
  projects: Project[];
}

export const useProjectsStore = defineStore('projects', {
  state: (): State => ({
    projects: [],
  }),
  getters: {
    getAllProjects: (state): Project[] => state.projects,
  },
  actions: {
    async getAllProjectsApi(): Promise<void> {
      const response = await axios.get('/projects');
      if (response && response.data) {
        this.setProjects(response.data.data);
      }
    },
    getById(id: number): Project | undefined {
      return this.projects.find((project) => project.id === id);
    },
    setProjects(projects: Project[]): void {
      this.projects = projects;
    },
    async createProject(payload: { name: string }): Promise<void> {
      await axios.post('/projects', payload);
    },
    async editProject(id: number, payload: { name: string }): Promise<void> {
      await axios.put(`/projects/${id}`, payload);
    },
    async deleteProject(id: number): Promise<void> {
      await axios.delete(`/projects/${id}`);
    },
  },
});
