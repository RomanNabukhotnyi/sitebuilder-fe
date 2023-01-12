import { defineStore } from 'pinia';
import axios from 'axios';
import { IError } from '@/interfaces/IError';

import type { Page } from '../interfaces/Page';

interface State {
  pages: Page[];
  loadingGetPages: boolean;
  loadingCreatePage: boolean;
  loadingEditPage: boolean;
  loadingDeletePage: boolean;
}

export const usePagesStore = defineStore('pages', {
  state: (): State => ({
    pages: [],
    loadingGetPages: false,
    loadingCreatePage: false,
    loadingEditPage: false,
    loadingDeletePage: false,
  }),
  actions: {
    async getPages(projectId: number): Promise<void> {
      try {
        this.loadingGetPages = true;
        const response = await axios.get(`/projects/${projectId}/pages`);
        this.pages = (response.data.data as Page[]).sort((a, b) => {
          if (a.order === 0) {
            return 1;
          }
          return a.order > b.order ? 1 : -1;
        });
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingGetPages = false;
      }
    },
    async createPage(
      projectId: number,
      payload: {
        name: string;
        meta: any;
      }
    ): Promise<void> {
      try {
        this.loadingCreatePage = true;
        const respose = await axios.post(
          `/projects/${projectId}/pages`,
          payload
        );
        this.pages.push(respose.data.data);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingCreatePage = false;
      }
    },
    async editPage(
      id: number,
      projectId: number,
      payload: { name: string; meta: any }
    ): Promise<void> {
      try {
        this.loadingEditPage = true;
        const response = await axios.put(
          `/projects/${projectId}/pages/${id}`,
          payload
        );
        const index = this.pages.findIndex((page) => page.id === id);
        this.pages[index] = response.data.data;
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingEditPage = false;
      }
    },
    async updateOrders(projectId: number, orders: any[]): Promise<void> {
      try {
        await axios.put(`/projects/${projectId}/pages/order`, {
          orders,
        });
      } catch (error) {
        throw new IError(error);
      }
    },
    async deletePage(id: number, projectId: number): Promise<void> {
      try {
        this.loadingDeletePage = true;
        await axios.delete(`/projects/${projectId}/pages/${id}`);
        const index = this.pages.findIndex((page) => page.id === id);
        this.pages.splice(index, 1);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingDeletePage = false;
      }
    },
  },
});
