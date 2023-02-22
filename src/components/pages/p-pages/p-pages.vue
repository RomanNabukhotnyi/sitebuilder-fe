<template>
    <div class="p-pages">
        <CModal v-model:show="dialogCreateVisible">
            <UPageCreateForm
                :loading-create-page="loadingCreatePage"
                :pages="pages"
                @create="createPage"
            />
        </CModal>
        <CModal v-model:show="dialogEditVisible">
            <UPageEditForm
                :page="editingPage!"
                :loading-edit-page="loadingEditPage"
                :pages="pages"
                @edit="editPage"
            />
        </CModal>
        <div class="panel">
            <div class="panel__sort">
                <!-- SORT -->
            </div>
            <CSearch v-model="searchQuery"/>
            <CButton
                label="Create Page"
                class="button__create"
                @click="showCreateDialog"
            />
        </div>
        <div>
            <UPageList
                :loading-get-pages="loadingGetPages"
                :loading-delete-page="loadingDeletePage"
                :pages="filterPages"
                @show-edit-dialog="showEditDialog"
                @delete="deletePage"
                @update-orders="updateOrders"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import type { ApiPage } from '@/types/pages/ApiPage';

import UPageCreateForm from '@/components/unique/u-page-create-form';
import UPageEditForm from '@/components/unique/u-page-edit-form';
import UPageList from '@/components/unique/u-page-list';
import CModal from '@/components/common/c-modal';
import CButton from '@/components/common/c-button';
import CSearch from '@/components/common/c-search';

import { usePagesStore } from '@/stores/pages';

const pagesStore = usePagesStore();
const route = useRoute();
const pages = computed(() => pagesStore.pages);
const loadingGetPages = computed(() => pagesStore.loadingGetPages);
const loadingCreatePage = computed(() => pagesStore.loadingCreatePage);
const loadingEditPage = computed(() => pagesStore.loadingEditPage);
const loadingDeletePage = computed(() => pagesStore.loadingDeletePage);
const dialogCreateVisible = ref(false);
const dialogEditVisible = ref(false);
const searchQuery = ref('');
const editingPage = ref<ApiPage | null>(null);
const filterPages = computed(() =>
    pages.value.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
);

const showCreateDialog = () => {
    dialogCreateVisible.value = true;
};
const showEditDialog = (page: ApiPage) => {
    editingPage.value = page;
    dialogEditVisible.value = true;
};
const createPage = async (page: Omit<ApiPage, 'id' | 'order'>) => {
    await pagesStore.createPage(+route.params.projectId, {
        ...page,
    });
    dialogCreateVisible.value = false;
};
const updateOrders = async (pages: ApiPage[]) => {
    await pagesStore.updatePageOrder(
        +route.params.projectId,
        pages.map((page, index) => ({ id: page.id, order: index + 1 }))
    );
    pagesStore.pages = pages;
};
const editPage = async (page: ApiPage) => {
    await pagesStore.updatePage(page.id, +route.params.projectId, {
        name: page.name,
        meta: page.meta,
    });
    dialogEditVisible.value = false;
};
const deletePage = async (id: number) => {
    await pagesStore.deletePage(id, +route.params.projectId);
};

onMounted(() => {
    pagesStore.getPages(+route.params.projectId);
});
</script>

<style lang="scss" src="./p-pages.scss"/>
