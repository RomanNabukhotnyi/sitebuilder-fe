import { defineStore } from 'pinia';
import axios from 'axios';
import { IError } from '@/interfaces/IError';

import type { Slot } from '../interfaces/Slot';
import type { Block } from '../interfaces/Block';

interface ISlot extends Slot {
  blocks: Block[];
}

interface State {
  slots: ISlot[];
  loadingGetSlots: boolean;
  loadingCreateSlot: boolean;
  loadingDeleteSlot: boolean;
  loadingCreateBlock: boolean;
  loadingEditBlock: boolean;
  loadingDeleteBlock: boolean;
}

export const useSlotsStore = defineStore('slots', {
  state: (): State => ({
    slots: [],
    loadingGetSlots: false,
    loadingCreateSlot: false,
    loadingDeleteSlot: false,
    loadingCreateBlock: false,
    loadingEditBlock: false,
    loadingDeleteBlock: false,
  }),
  actions: {
    async getSlots(pageId: number): Promise<void> {
      try {
        this.loadingGetSlots = true;
        const response = await axios.get('/slots', {
          params: {
            pageId,
          },
        });
        const sortedSlots = (response.data.data as ISlot[]).sort((a, b) => {
          if (a.order === 0) {
            return 1;
          }
          return a.order > b.order ? 1 : -1;
        });
        this.slots = await Promise.all(
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
        );
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingGetSlots = false;
      }
    },
    async updateOrderSlots(pageId: number, orders: any[]): Promise<void> {
      try {
        await axios.put('/slots/order', {
          pageId,
          orders,
        });
      } catch (error) {
        throw new IError(error);
      }
    },
    async createSlot(payload: { pageId: number; type: string }): Promise<void> {
      try {
        this.loadingCreateSlot = true;
        const response = await axios.post('/slots', payload);
        this.slots.push({ ...response.data.data, blocks: [] });
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingCreateSlot = false;
      }
    },
    async deleteSlot(id: number): Promise<void> {
      try {
        this.loadingDeleteSlot = true;
        await axios.delete(`/slots/${id}`);
        const index = this.slots.findIndex((slot) => slot.id === id);
        this.slots.splice(index, 1);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingDeleteSlot = false;
      }
    },
    async createBlock(payload: {
      slotId: number;
      type: string;
      content: any;
    }): Promise<void> {
      try {
        this.loadingCreateBlock = true;
        const response = await axios.post('/blocks', payload);
        const index = this.slots.findIndex(
          (slot) => slot.id === payload.slotId
        );
        this.slots[index].blocks.push(response.data.data);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingCreateBlock = false;
      }
    },
    async editBlock(
      slotId: number,
      blockId: number,
      payload: { type: string; content: any }
    ): Promise<void> {
      try {
        this.loadingEditBlock = true;
        const response = await axios.put(`/blocks/${blockId}`, payload);
        const indexSlot = this.slots.findIndex((slot) => slot.id === slotId);
        const indexBlock = this.slots[indexSlot].blocks.findIndex(
          (block) => block.id === blockId
        );
        this.slots[indexSlot].blocks[indexBlock] = response.data.data;
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingEditBlock = false;
      }
    },
    async deleteBlock(slotId: number, blockId: number): Promise<void> {
      try {
        this.loadingDeleteBlock = true;
        await axios.delete(`/blocks/${blockId}`);
        const indexSlot = this.slots.findIndex((slot) => slot.id === slotId);
        const indexBlock = this.slots[indexSlot].blocks.findIndex(
          (block) => block.id === blockId
        );
        this.slots[indexSlot].blocks.splice(indexBlock, 1);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingDeleteBlock = false;
      }
    },
    async updateOrderBlocks(slotId: number, orders: any[]): Promise<void> {
      try {
        await axios.put('/blocks/order', {
          slotId,
          orders,
        });
      } catch (error) {
        throw new IError(error);
      }
    },
  },
});
