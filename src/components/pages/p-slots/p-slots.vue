<template>
    <div class="p-slots">
        <CModal v-model:show="dialogCreateSlotVisible">
            <USlotCreateForm
                :loading-create-slot="loadingCreateSlot"
                @create-slot="handleCreateSlot"
            />
        </CModal>
        <CModal v-model:show="dialogCreateBlockVisible">
            <UBlockCreateForm
                :slot-id="slotId!"
                :loading-create-block="loadingCreateBlock"
                @create-block="handleCreateBlock"
            />
        </CModal>
        <CModal v-model:show="dialogEditBlockVisible">
            <UBlockEditForm
                :slot-id="slotId!"
                :block="editingBlock!"
                :loading-edit-block="loadingEditBlock"
                @edit-block="editBlock"
            />
        </CModal>
        <div class="page">
            <USlotList
                :loading-get-slots="loadingGetSlots"
                :loading-delete-slot="loadingDeleteSlot"
                :loading-delete-block="loadingDeleteBlock"
                :slots="slots"
                @move-up-slot="moveUpSlot"
                @move-down-slot="moveDownSlot"
                @delete-slot="handleDeleteSlot"
                @create-block="handleCreateBlock"
                @show-create-block-dialog="showCreateBlockDialog"
                @show-edit-block-dialog="showEditBlockDialog"
                @move-block="handleMoveBlock"
                @edit-block="editBlock"
                @delete-block="handleDeleteBlock"
            />
            <div class="createSlot">
                <CButton
                    label="Create Slot"
                    @click="showCreateSlotDialog"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import type { ApiBlock } from '@/types/blocks/ApiBlock';
import type { ApiUpdateBlock } from '@/types/blocks/ApiUpdateBlock';

import CButton from '@/components/common/c-button';
import CModal from '@/components/common/c-modal';
import USlotCreateForm from '@/components/unique/u-slot-create-form';
import UBlockCreateForm from '@/components/unique/u-block-create-form';
import UBlockEditForm from '@/components/unique/u-block-edit-form';
import USlotList from '@/components/unique/u-slot-list';

import { useSlotsStore } from '@/stores/slots';
import type { IMoveBlockData } from '@/types/blocks/MoveEvents';
import { E_MOVE_BLOCK_DIRECTION } from '@/types/blocks/MoveEvents';
import { E_SWAP_DIRECTION, findIndexByKey, swap } from '@/services/array-manipulations-service';
import { storeToRefs } from 'pinia';

const {
    getSlots,
    createSlot,
    deleteSlot,
    updateSlotOrder,
    createBlock,
    updateBlock,
    deleteBlock,
    updateBlockOrder
} = useSlotsStore();

const slotsStore = useSlotsStore();

const {
    slots,
    loadingGetSlots,
    loadingCreateSlot,
    loadingDeleteSlot,
    loadingCreateBlock,
    loadingEditBlock,
    loadingDeleteBlock
} = storeToRefs(slotsStore);

const route = useRoute();

const slotId = ref<number | null>(null);
const dialogCreateSlotVisible = ref(false);
const dialogCreateBlockVisible = ref(false);
const dialogEditBlockVisible = ref(false);

const pageId = computed<number>(() => +route.params.pageId);
const projectId = computed<number>(() => +route.params.projectId);

let editingBlock: ApiBlock | null = null;

const showCreateSlotDialog = () => {
    dialogCreateSlotVisible.value = true;
};
const showCreateBlockDialog = (id: number) => {
    slotId.value = id;
    dialogCreateBlockVisible.value = true;
};
const showEditBlockDialog = (id: number, block: ApiBlock) => {
    slotId.value = id;
    editingBlock = block;
    dialogEditBlockVisible.value = true;
};
const handleCreateSlot = async (slot: { type: string }) => {
    await createSlot(projectId.value, {
        pageId: pageId.value,
        type: slot.type,
    });
    dialogCreateSlotVisible.value = false;
};
const handleDeleteSlot = async (id: number) => {
    await deleteSlot(id, projectId.value);
};
const handleCreateBlock = async (slotId: number, block: ApiBlock) => {
    await createBlock(projectId.value, {
        slotId,
        type: block.type,
        content: block.content,
        attributes: block.attributes,
        styles: block.styles,
    });
    dialogCreateBlockVisible.value = false;
};
const editBlock = async (
    slotId: number,
    blockId: number,
    block: ApiUpdateBlock
) => {
    await updateBlock(slotId, blockId, projectId.value, {
        type: block.type,
        content: block.content,
        attributes: block.attributes,
        styles: block.styles,
    });
    dialogEditBlockVisible.value = false;
};
const handleDeleteBlock = async (slotId: number, blockId: number) => {
    await deleteBlock(slotId, blockId, projectId.value);
};

const moveUpSlot = async (slotId: number) => {
    const index = slots.value.findIndex((slot) => slot.id === slotId);
    if (index === 0) {
        return;
    }
    [slots.value[index - 1], slots.value[index]] = [
        slots.value[index],
        slots.value[index - 1],
    ];
    updateOrderSlots();
};

const moveDownSlot = async (slotId: number) => {
    const index = slots.value.findIndex((slot) => slot.id === slotId);
    if (index === slots.value.length - 1) {
        return;
    }
    [slots.value[index + 1], slots.value[index]] = [
        slots.value[index],
        slots.value[index + 1],
    ];
    updateOrderSlots();
};

const handleMoveBlock = ({ slotId, blockId, direction }: IMoveBlockData) => {
    const indexSlot = findIndexByKey(slots.value, 'id', slotId);
    const indexBlock = findIndexByKey(slots.value[indexSlot].blocks, 'id', blockId);

    if (direction === E_MOVE_BLOCK_DIRECTION.LEFT) {
        swap(slots.value[indexSlot].blocks, indexBlock, E_SWAP_DIRECTION.LEFT);
    } else {
        swap(slots.value[indexSlot].blocks, indexBlock, E_SWAP_DIRECTION.RIGHT);
    }

    updateOrderBlocks(slotId);
};

const updateOrderSlots = () => {
    updateSlotOrder({
        pageId: pageId.value,
        projectId: projectId.value,
        orders: slots.value
    });
};
const updateOrderBlocks = async (slotId: number) => {
    const indexSlot = slots.value.findIndex((slot) => slot.id === slotId);
    await updateBlockOrder(
        slotId,
        projectId.value,
        slots.value[indexSlot].blocks.map((block, index) => ({
            id: block.id,
            order: index + 1,
        }))
    );
};

onMounted(() => {
    getSlots(pageId.value, projectId.value);
});
</script>

<style lang="scss" src="./p-slots.scss"/>
