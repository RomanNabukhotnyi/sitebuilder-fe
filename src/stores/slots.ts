import { defineStore } from 'pinia';
import axios from 'axios';

import type { Slot } from '../interfaces/Slot';
import type { Block } from '../interfaces/Block';

interface ISlot extends Slot {
  blocks: Block[];
}

interface State {
  slots: ISlot[];
}

export const useSlotsStore = defineStore('slots', {
  state: (): State => ({
    slots: [],
  }),
  getters: {
    getAllSlots: (state) => state.slots,
  },
  actions: {
    async getAllSlotsApi(pageId: number): Promise<void> {
      const response = await axios.get('/slots', {
        params: {
          pageId,
        },
      });
      if (response && response.data) {
        const sortedSlots = (response.data.data as ISlot[]).sort((a, b) => {
          if (a.order === 0) {
            return 1;
          }
          return a.order > b.order ? 1 : -1;
        });
        this.setSlots(
          await Promise.all(
            sortedSlots.map(async (slot) => {
              const blocks = (
                (
                  await axios.get('/blocks', {
                    params: {
                      slotId: slot.id,
                    },
                  })
                ).data.data.blocks as Block[]
              ).sort((a, b) => {
                if (a.order === 0) {
                  return 1;
                }
                return a.order > b.order ? 1 : -1;
              });
              return {
                ...slot,
                blocks,
              };
            })
          )
        );
      }
    },
    getById(id: number) {
      return this.slots.find((slot) => slot.id === id);
    },
    async updateOrders(pageId: number, orders: any[]): Promise<void> {
      await axios.put('/slots/order', {
        pageId,
        orders,
      });
    },
    setSlots(slots: any[]): void {
      this.slots = slots;
    },
    async createSlot(payload: { pageId: number; type: string }): Promise<void> {
      await axios.post('/slots', payload);
    },
    async deleteSlot(id: number): Promise<void> {
      await axios.delete(`/slots/${id}`);
    },
  },
});
