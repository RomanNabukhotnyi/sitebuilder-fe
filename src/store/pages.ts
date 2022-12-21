import { defineStore } from 'pinia';
import axios from 'axios';

import type { Page } from '../interfaces/Page';

interface State {
  pages: Page[];
}

export const usePagesStore = defineStore('pages', {
  state: (): State => ({
    pages: [],
  }),
  getters: {
    getAllPages: (state): Page[] => state.pages,
  },
  actions: {
    async getAllPagesApi(projectId: number): Promise<void> {
      const response = await axios.get('/pages', {
        params: {
          projectId,
        },
      });
      if (response && response.data) {
        this.setPages(
          (response.data.data as Page[]).sort((a, b) => {
            if (a.order === 0) {
              return 1;
            }
            return a.order > b.order ? 1 : -1;
          })
        );
      }
    },
    getById(id: number): Page | undefined {
      return this.pages.find((page) => page.id === id);
    },
    setPages(pages: Page[]): void {
      this.pages = pages;
    },
    async createPage(payload: {
      projectId: number;
      name: string;
      meta: any;
    }): Promise<void> {
      await axios.post('/pages', payload);
    },
    async editPage(
      id: number,
      payload: { name: string; meta: any }
    ): Promise<void> {
      await axios.put(`/pages/${id}`, payload);
    },
    async updateOrders(projectId: number, orders: any[]): Promise<void> {
      await axios.put('/pages/order', {
        projectId,
        orders,
      });
    },
    async deletePage(id: number): Promise<void> {
      await axios.delete(`/pages/${id}`);
    },
  },
});
