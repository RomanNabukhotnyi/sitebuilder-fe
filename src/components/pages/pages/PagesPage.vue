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
        :page="page!"
        @edit="editPage"
        :loadingEditPage="loadingEditPage"
        :pages="pages"
      />
    </MyDialog>
    <div class="panel">
      <div class="panel__sort">
        <!-- SORT -->
      </div>
      <SearchPage v-model:search="search" />
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

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { usePagesStore } from '../../../store/pages';
import CreatePageForm from './components/CreatePageForm.vue';
import EditPageForm from './components/EditPageForm.vue';
import PageList from './components/PageList.vue';
import MyDialog from '@/components/common/MyDialog.vue';
import MyButton from '@/components/common/MyButton.vue';
import SearchPage from './components/SearchPage.vue';
import type { Page } from '@/interfaces/Page';

interface Data {
  dialogCreateVisible: boolean;
  dialogEditVisible: boolean;
  page: Page | null;
  search: string;
}

export default defineComponent({
  name: 'PagesPage',
  components: {
    CreatePageForm,
    EditPageForm,
    MyDialog,
    MyButton,
    PageList,
    SearchPage,
  },
  setup() {
    const pagesStore = usePagesStore();
    const pages = computed(() => pagesStore.pages);
    const loadingGetPages = computed(() => pagesStore.loadingGetPages);
    const loadingCreatePage = computed(() => pagesStore.loadingCreatePage);
    const loadingEditPage = computed(() => pagesStore.loadingEditPage);
    const loadingDeletePage = computed(() => pagesStore.loadingDeletePage);
    return {
      pagesStore,
      pages,
      loadingGetPages,
      loadingCreatePage,
      loadingEditPage,
      loadingDeletePage,
    };
  },
  data(): Data {
    return {
      dialogCreateVisible: false,
      dialogEditVisible: false,
      page: null,
      search: '',
    };
  },
  mounted() {
    this.pagesStore.getPages(+this.$route.params.projectId);
  },
  computed: {
    filterPages() {
      return this.pages.filter((project) =>
        project.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    showCreateDialog() {
      this.dialogCreateVisible = true;
    },
    showEditDialog(page: Page) {
      this.page = page;
      this.dialogEditVisible = true;
    },
    async createPage(page: Page) {
      await this.pagesStore.createPage({
        projectId: +this.$route.params.projectId,
        ...page,
      });
      this.dialogCreateVisible = false;
    },
    async updateOrders(pages: Page[]) {
      await this.pagesStore.updateOrders(
        +this.$route.params.projectId,
        pages.map((page, index) => ({ id: page.id, order: index + 1 }))
      );
      this.pagesStore.pages = pages;
    },
    async editPage(page: Page) {
      await this.pagesStore.editPage(page.id, {
        name: page.name,
        meta: page.meta,
      });
      this.dialogEditVisible = false;
    },
    async deletePage(id: number) {
      await this.pagesStore.deletePage(id);
    },
  },
});
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
