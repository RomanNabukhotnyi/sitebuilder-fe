import { defineStore } from 'pinia';
import axios from 'axios';

interface State {
  pages: { id: number; order: number; createdAt: string; name: string }[];
}

export const usePagesStore = defineStore('pages', {
  state: (): State => ({
    pages: [],
  }),
  getters: {
    getAllPages: (state) => state.pages,
  },
  actions: {
    async getAllPagesApi(projectId: number) {
      const response = await axios.get('/pages', {
        params: {
          projectId,
        },
      });
      if (response && response.data) {
        this.setPages(response.data.data);
      }
    },
    getById(id: number) {
      return this.pages.find((page) => page.id === id);
    },
    setPages(payload: any[]) {
      this.pages = payload;
    },
    async createPage(payload: { projectId: number; name: string; meta: any }) {
      await axios.post('/pages', payload);
    },
    async editPage(pageId: number, payload: { name: string; meta: any }) {
      await axios.put(`/pages/${pageId}`, payload);
    },
    async updateOrders(projectId: number, orders: any[]) {
      await axios.put('/pages/order', {
        projectId,
        orders,
      });
    },
    async deletePage(pageId: number) {
      await axios.delete(`/pages/${pageId}`);
    },
  },
});
