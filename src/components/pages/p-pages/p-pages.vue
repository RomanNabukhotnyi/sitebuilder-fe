<template>
  <div class="p-pages">
    <CModal v-model:show="dialogCreateVisible">
      <UPageCreateForm
        :loading-create-page="loadingCreatePage"
        :pages="pages"
        @create="handleCreatePage"
      />
    </CModal>
    <CModal v-model:show="dialogEditVisible">
      <UPageEditForm
        :page="editingPage!"
        :loading-edit-page="loadingEditPage"
        :pages="pages"
        @edit="handleEditPage"
      />
    </CModal>
    <div class="panel">
      <div class="panel__sort">
        <!-- SORT -->
      </div>
      <CSearch v-model="searchQuery" />
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
        @delete="handleDeletePage"
        @update-order="handleUpdateOrder"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

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

const {
  pages,
  loadingGetPages,
  loadingCreatePage,
  loadingEditPage,
  loadingDeletePage,
} = storeToRefs(pagesStore);
const dialogCreateVisible = ref(false);
const dialogEditVisible = ref(false);
const searchQuery = ref('');
const editingPage = ref<ApiPage | null>(null);
const filterPages = computed(() =>
  pages.value.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
const projectId = computed<number>(() => +route.params.projectId);


const showCreateDialog = () => {
  dialogCreateVisible.value = true;
};

const showEditDialog = (page: ApiPage) => {
  editingPage.value = page;
  dialogEditVisible.value = true;
};

const handleCreatePage = async (page: Omit<ApiPage, 'id' | 'order'>) => {
  await pagesStore.createPage(projectId.value, {
    ...page,
  });
  dialogCreateVisible.value = false;
};

const handleUpdateOrder = async (pages: ApiPage[]) => {
  await pagesStore.updatePageOrder(
    projectId.value,
    pages.map((page, index) => ({ id: page.id, order: index + 1 }))
  );
  pagesStore.pages = pages;
};

const handleEditPage = async (page: ApiPage) => {
  await pagesStore.updatePage(page.id, projectId.value, {
    name: page.name,
    meta: page.meta,
  });
  dialogEditVisible.value = false;
};

const handleDeletePage = (id: number) => {
  pagesStore.deletePage(id, projectId.value);
};

onMounted(() => {
  pagesStore.getPages(projectId.value);
});
</script>

<style lang="scss" src="./p-pages.scss" />
