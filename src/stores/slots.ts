import { defineStore } from 'pinia';
import axios from 'axios';

interface State {
  slots: any[];
}

export const useSlotsStore = defineStore('slots', {
  state: (): State => ({
    slots: [],
  }),
  getters: {
    getAllSlots: (state) => state.slots,
  },
  actions: {
    async getAllSlotsApi(pageId: number) {
      const response = await axios.get('/slots', {
        params: {
          pageId,
        },
      });
      if (response && response.data) {
        this.setSlots(response.data.data);
      }
    },
    getById(id: number) {
      return this.slots.find((slot) => slot.id === id);
    },
    setSlots(payload: any[]) {
      this.slots = payload;
    },
    async createSlot(payload: { pageId: number; type: string }) {
      await axios.post('/slots', payload);
    },
    async deleteSlot(slotId: number) {
      await axios.delete(`/slots/${slotId}`);
    },
  },
});
