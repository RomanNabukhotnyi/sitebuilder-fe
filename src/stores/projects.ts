import { defineStore } from 'pinia';
import axios from 'axios';

interface State {
  projects: { id: number; name: string; createdAt: string }[];
}

export const useProjectsStore = defineStore('projects', {
  state: (): State => ({
    projects: [],
  }),
  getters: {
    getAllProjects: (state) => state.projects,
  },
  actions: {
    async getAllProjectsApi() {
      const response = await axios.get('/projects');
      if (response && response.data) {
        this.setProjects(response.data.data);
      }
    },
    getById(id: number) {
      return this.projects.find((project) => project.id === id);
    },
    setProjects(payload: any[]) {
      this.projects = payload;
    },
    async createProject(payload: { name: string }) {
      await axios.post('/projects', payload);
    },
    async editProject(projectId: number, payload: { name: string }) {
      await axios.put(`/projects/${projectId}`, payload);
    },
    async deleteProject(projectId: number) {
      await axios.delete(`/projects/${projectId}`);
    },
  },
});
