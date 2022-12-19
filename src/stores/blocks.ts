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
    async getAllBlocksApi(slotId: number): Promise<void> {
      const response = await axios.get('/blocks', {
        params: {
          slotId,
        },
      });
      if (response && response.data) {
        this.setBlocks(response.data.data.blocks);
      }
    },
    async isEmptySlot(slotId: number): Promise<boolean> {
      const response = await axios.get('/blocks', {
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
    async createBlock(payload: {
      slotId: number;
      type: string;
      content: any;
    }): Promise<void> {
      await axios.post('/blocks', payload);
    },
    async editBlock(
      id: number,
      payload: { type: string; content: any }
    ): Promise<void> {
      await axios.put(`/blocks/${id}`, payload);
    },
    async deleteBlock(id: number): Promise<void> {
      await axios.delete(`/blocks/${id}`);
    },
  },
});
