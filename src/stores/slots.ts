import { defineStore } from 'pinia';

import { IError } from '@/types/IError';
import type { PreparedSlot } from '@/types/slots/PreparedSlot';

import {
  createSlot,
  getSlotsByPageId,
  updateSlotOrder,
  deleteSlot,
} from '@/api/slots';
import {
  createBlock,
  getBlocksBySlotId,
  updateBlock,
  updateBlockOrder,
  deleteBlock,
} from '@/api/blocks';
import type { ApiCreateSlot } from '@/types/slots/ApiCreateSlot';
import type { ApiCreateBlock } from '@/types/blocks/ApiCreateBlock';
import type { ApiUpdateBlock } from '@/types/blocks/ApiUpdateBlock';

interface IUpdateSlotOrderParams {
  pageId: number;
  projectId: number;
  slots: PreparedSlot[];
}

interface IUpdateBlockOrderParams {
  slotId: number;
  projectId: number;
  blocks: PreparedSlot['blocks'];
}

interface IDeleteBlockParams {
  slotId: number;
  blockId: number;
  projectId: number;
}

interface IUpdateBlockParams {
  slotId: number;
  blockId: number;
  projectId: number;
  payload: ApiUpdateBlock;
}

interface State {
  slots: PreparedSlot[];
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
    async createSlot(projectId: number, payload: ApiCreateSlot): Promise<void> {
      try {
        this.loadingCreateSlot = true;
        const slot = await createSlot(projectId, payload);
        this.slots.push({ ...slot, blocks: [] });
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingCreateSlot = false;
      }
    },
    async getSlots(pageId: number, projectId: number): Promise<void> {
      try {
        this.loadingGetSlots = true;
        const slots = await getSlotsByPageId(projectId, pageId);
        const sortedSlots = slots.sort((a, b) => {
          if (a.order === 0) {
            return 1;
          }
          return a.order > b.order ? 1 : -1;
        });
        this.slots = await Promise.all(
          sortedSlots.map(async (slot) => {
            const response = await getBlocksBySlotId(projectId, slot.id);
            const blocks = response.blocks.sort((a, b) => {
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
    async updateSlotOrder({
      pageId,
      projectId,
      slots,
    }: IUpdateSlotOrderParams): Promise<void> {
      try {
        const order = slots.map((slot, index) => ({
          id: slot.id,
          order: index + 1,
        }));
        await updateSlotOrder(projectId, pageId, order);
      } catch (error) {
        throw new IError(error);
      }
    },
    async deleteSlot(id: number, projectId: number): Promise<void> {
      try {
        this.loadingDeleteSlot = true;
        await deleteSlot(projectId, id);
        const index = this.slots.findIndex((slot) => slot.id === id);
        this.slots.splice(index, 1);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingDeleteSlot = false;
      }
    },
    async createBlock(
      projectId: number,
      payload: ApiCreateBlock
    ): Promise<void> {
      try {
        this.loadingCreateBlock = true;
        const block = await createBlock(projectId, payload);
        const index = this.slots.findIndex(
          (slot) => slot.id === payload.slotId
        );
        this.slots[index].blocks.push(block);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingCreateBlock = false;
      }
    },
    async updateBlock({
      slotId,
      blockId,
      projectId,
      payload,
    }: IUpdateBlockParams): Promise<void> {
      try {
        this.loadingEditBlock = true;
        const block = await updateBlock(projectId, blockId, payload);
        const indexSlot = this.slots.findIndex((slot) => slot.id === slotId);
        const indexBlock = this.slots[indexSlot].blocks.findIndex(
          (block) => block.id === blockId
        );
        this.slots[indexSlot].blocks[indexBlock] = block;
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loadingEditBlock = false;
      }
    },
    async updateBlockOrder({
      slotId,
      projectId,
      blocks,
    }: IUpdateBlockOrderParams): Promise<void> {
      try {
        const order = blocks.map((block, index) => ({
          id: block.id,
          order: index + 1,
        }));
        await updateBlockOrder(projectId, slotId, order);
      } catch (error) {
        throw new IError(error);
      }
    },
    async deleteBlock({
      slotId,
      blockId,
      projectId,
    }: IDeleteBlockParams): Promise<void> {
      try {
        this.loadingDeleteBlock = true;
        await deleteBlock(projectId, blockId);
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
  },
});
