export interface ApiCreateSlot {
    pageId: number;
    type: 'STATIC' | 'DYNAMIC';
    order?: number;
}