import { defineStore } from 'pinia';
import axios from 'axios';

import type { Block } from '../interfaces/Block';

interface State {
  blocks: Block[];
}

export const useBlocksStore = defineStore('blocks', {
  state: (): State => ({
    blocks: [],
  }),
  getters: {
    getAllBlocks: (state): Block[] => state.blocks,
  },
  actions: {
    async getAllBlocksApi(slotId: number, projectId: number): Promise<void> {
      const response = await axios.get(`/projects/${projectId}/blocks`, {
        params: {
          slotId,
        },
      });
      if (response && response.data) {
        this.setBlocks(response.data.data.blocks);
      }
    },
    async isEmptySlot(slotId: number, projectId: number): Promise<boolean> {
      const response = await axios.get(`/projects/${projectId}/blocks`, {
        params: {
          slotId,
        },
      });
      if (response && response.data) {
        const blocks = response.data.data.blocks;
        if (blocks.length === 0) {
          return true;
        }
      }
      return false;
    },
    getById(id: number): Block | undefined {
      return this.blocks.find((block) => block.id === id);
    },
    setBlocks(blocks: Block[]): void {
      this.blocks = blocks;
    },
    async createBlock(
      projectId: number,
      payload: {
        slotId: number;
        type: string;
        content: any;
      }
    ): Promise<void> {
      await axios.post(`/projects/${projectId}/blocks`, payload);
    },
    async editBlock(
      id: number,
      projectId: number,
      payload: { type: string; content: any }
    ): Promise<void> {
      await axios.put(`/projects/${projectId}/blocks/${id}`, payload);
    },
    async deleteBlock(id: number, projectId: number): Promise<void> {
      await axios.delete(`/projects/${projectId}/blocks/${id}`);
    },
    async updateOrders(
      slotId: number,
      projectId: number,
      orders: any[]
    ): Promise<void> {
      await axios.put(`/projects/${projectId}/blocks/order`, {
        slotId,
        orders,
      });
    },
  },
});
