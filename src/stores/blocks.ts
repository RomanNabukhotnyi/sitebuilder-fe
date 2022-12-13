import { defineStore } from 'pinia';
import axios from 'axios';

interface State {
  blocks: any[];
}

export const useBlocksStore = defineStore('blocks', {
  state: (): State => ({
    blocks: [],
  }),
  getters: {
    getAllBlocks: (state) => state.blocks,
  },
  actions: {
    async getAllBlocksApi(slotId: number) {
      const response = await axios.get('/blocks', {
        params: {
          slotId,
        },
      });
      if (response && response.data) {
        this.setBlocks(response.data.data.blocks);
      }
    },
    getById(id: number) {
      return this.blocks.find((block) => block.id === id);
    },
    setBlocks(payload: any[]) {
      this.blocks = payload;
    },
    async createBlock(payload: { slotId: number; type: string; content: any }) {
      await axios.post('/blocks', payload);
    },
    async editBlock(blockId: number, payload: { type: string; content: any }) {
      await axios.put(`/blocks/${blockId}`, payload);
    },
    async deleteBlock(blockId: number) {
      await axios.delete(`/blocks/${blockId}`);
    },
  },
});
