<template>
  <div>
    <MyDialog v-model:show="dialogCreateVisible">
      <CreatePageForm
        @create="createPage"
        :loadingCreatePage="loadingCreatePage"
        :pages="pages"
      />
    </MyDialog>
    <MyDialog v-model:show="dialogEditVisible">
      <EditPageForm
        :page="editingPage!"
        @edit="editPage"
        :loadingEditPage="loadingEditPage"
        :pages="pages"
      />
    </MyDialog>
    <div class="panel">
      <div class="panel__sort">
        <!-- SORT -->
      </div>
      <SearchPage v-model:search="searchQuery" />
      <MyButton class="button__create" @click="showCreateDialog">
        Create Page
      </MyButton>
    </div>
    <div>
      <PageList
        :loadingGetPages="loadingGetPages"
        :loadingDeletePage="loadingDeletePage"
        @showEditDialog="showEditDialog"
        :pages="filterPages"
        @delete="deletePage"
        @updateOrders="updateOrders"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { usePagesStore } from '@/stores/pages';
import { useRoute } from 'vue-router';
import CreatePageForm from './components/CreatePageForm.vue';
import EditPageForm from './components/EditPageForm.vue';
import PageList from './components/PageList.vue';
import MyDialog from '@/components/common/MyDialog.vue';
import MyButton from '@/components/common/MyButton.vue';
import SearchPage from './components/SearchPage.vue';
import type { Page } from '@/interfaces/Page';
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
const editingPage = ref<Page | null>(null);
onMounted(() => {
  pagesStore.getPages(+route.params.projectId);
});
const filterPages = computed(() =>
  pages.value.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
const showCreateDialog = () => {
  dialogCreateVisible.value = true;
};
const showEditDialog = (page: Page) => {
  editingPage.value = page;
  dialogEditVisible.value = true;
};
const createPage = async (page: Omit<Page, 'id' | 'order'>) => {
  await pagesStore.createPage({
    projectId: +route.params.projectId,
    ...page,
  });
  dialogCreateVisible.value = false;
};
const updateOrders = async (pages: Page[]) => {
  await pagesStore.updateOrders(
    +route.params.projectId,
    pages.map((page, index) => ({ id: page.id, order: index + 1 }))
  );
  pagesStore.pages = pages;
};
const editPage = async (page: Page) => {
  await pagesStore.editPage(page.id, {
    name: page.name,
    meta: page.meta,
  });
  dialogEditVisible.value = false;
};
const deletePage = async (id: number) => {
  await pagesStore.deletePage(id);
};
</script>

<style scoped>
.panel {
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  top: 0;
  height: 76px;
}
.button__create {
  margin: 0 36px 0 auto;
}
</style>
