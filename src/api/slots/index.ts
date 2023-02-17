import type { ApiCreateSlot } from '@/types/slots/ApiCreateSlot';
import type { Slot } from '@/types/slots/ApiSlot';
import type { Order } from '@/types/Order';

import { api } from '@/services/api-service';

export const createSlot = (
  projectId: number | string,
  payload: ApiCreateSlot
): Promise<Slot> => api.post(`/projects/${projectId}/slots`, payload);

export const getSlotsByPageId = (
  projectId: number | string,
  pageId: number | string
): Promise<Slot[]> =>
  api.get(`/projects/${projectId}/slots`, {
    params: {
      pageId,
    },
  });

export const updateSlotOrder = (
  projectId: number | string,
  pageId: number | string,
  orders: Order[]
): Promise<Slot[]> =>
  api.put(`/projects/${projectId}/slots/order`, {
    pageId,
    orders,
  });

export const deleteSlot = (
  projectId: number | string,
  slotId: number | string
): Promise<{ id: number }> =>
  api.delete(`/projects/${projectId}/slots/${slotId}`);
