import { defineStore } from 'pinia';
import axios from 'axios';

type Content = {
  text?: string;
  url?: string;
  subtext?: string | undefined;
};

interface State {
  slots: {
    id: number;
    type: string;
    order: number;
    blocks: { id: number; type: string; content: Content }[];
  }[];
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
        this.setSlots(
          response.data.data.sort((a: any, b: any) => {
            if (a.order === 0) {
              return;
            }
            return a.order > b.order;
          })
        );
      } else {
        return;
      }
      this.setSlots(
        await Promise.all(
          this.slots.map(async (slot) => {
            const blocks = (
              await axios.get('/blocks', {
                params: {
                  slotId: slot.id,
                },
              })
            ).data.data.blocks;
            return {
              ...slot,
              blocks,
            };
          })
        )
      );
    },
    getById(id: number) {
      return this.slots.find((slot) => slot.id === id);
    },
    async updateOrders(pageId: number, orders: any[]) {
      await axios.put('/slots/order', {
        pageId,
        orders,
      });
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
