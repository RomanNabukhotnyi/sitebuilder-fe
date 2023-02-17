import { defineStore } from 'pinia';

import { IError } from '@/types/IError';
import type { ApiPage } from '../types/pages/ApiPage';
import type { ApiCreatePage } from '@/types/pages/ApiCreatePage';
import type { ApiUpdatePage } from '@/types/pages/ApiUpdatePage';
import type { Order } from '@/types/Order';

import { createPage, getPagesByProjectId, deletePage, updatePageOrder, updatePage } from '@/api/pages';

interface State {
  pages: ApiPage[];
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
    async createPage(
      projectId: number,
      payload: ApiCreatePage
    ): Promise<void> {
      try {
        this.loadingCreatePage = true;
        const page = await createPage(projectId, payload);
        this.pages.push(page);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingCreatePage = false;
      }
    },
    async getPages(projectId: number): Promise<void> {
      try {
        this.loadingGetPages = true;
        const pages = await getPagesByProjectId(projectId);
        this.pages = pages.sort((a, b) => {
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
    async updatePage(
      id: number,
      projectId: number,
      payload: ApiUpdatePage
    ): Promise<void> {
      try {
        this.loadingEditPage = true;
        const page = await updatePage(projectId, id, payload);
        const index = this.pages.findIndex((page) => page.id === id);
        this.pages[index] = page;
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingEditPage = false;
      }
    },
    async updatePageOrder(projectId: number, orders: Order[]): Promise<void> {
      try {
        await updatePageOrder(projectId, orders);
      } catch (error) {
        throw new IError(error);
      }
    },
    async deletePage(id: number, projectId: number): Promise<void> {
      try {
        this.loadingDeletePage = true;
        await deletePage(projectId, id);
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
