<template>
  <div>
    <div class="panel">
      <div class="panel__sort">
        <!-- SORT -->
      </div>
      <SearchPage @filter="filter" />
      <MyDialog v-model:show="dialogVisible">
        <CreatePageForm @create="createPage" :pages="getAllPages" />
      </MyDialog>
      <MyButton class="button__create" @click="showDialog">
        Create Page
      </MyButton>
    </div>
    <div>
      <PageList
        :loading="loading"
        :pages="getAllPages"
        @edit="editPage"
        @delete="deletePage"
        @updateOrders="updateOrders"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePagesStore } from '../../../store/pages';
import CreatePageForm from './components/CreatePageForm.vue';
import PageList from './components/PageList.vue';
import MyDialog from '@/components/common/MyDialog.vue';
import MyButton from '@/components/common/MyButton.vue';
import SearchPage from './components/SearchPage.vue';
import type { Page } from '@/interfaces/Page';

interface Data {
  loading: boolean;
  dialogVisible: boolean;
  search: string;
  orderTemp: number;
  pageTemp: {
    id?: number;
    name?: string;
    meta?: {
      url?: string;
    };
  };
}

export default defineComponent({
  name: 'PagesPage',
  components: {
    CreatePageForm,
    MyDialog,
    MyButton,
    PageList,
    SearchPage,
  },
  setup() {
    const pagesStore = usePagesStore();
    return {
      pagesStore,
    };
  },
  data(): Data {
    return {
      loading: true,
      dialogVisible: false,
      search: '',
      orderTemp: 0,
      pageTemp: {
        meta: {
          url: undefined,
        },
      },
    };
  },
  mounted() {
    this.pagesStore.getAllPagesApi(+this.$route.params.projectId).then(() => {
      this.loading = false;
    });
  },
  computed: {
    getAllPages() {
      return this.pagesStore.getAllPages;
    },
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    async filter(search: string) {
      await this.pagesStore.getAllPagesApi(+this.$route.params.projectId);
      this.pagesStore.setPages(
        this.getAllPages.filter((page) =>
          page.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    },
    async createPage(page: Page) {
      await this.pagesStore.createPage({
        projectId: +this.$route.params.projectId,
        ...page,
      });
      await this.pagesStore.getAllPagesApi(+this.$route.params.projectId);
      this.dialogVisible = false;
    },
    async updateOrders(pages: Page[]) {
      await this.pagesStore.updateOrders(
        +this.$route.params.projectId,
        pages.map((page, index) => ({ id: page.id, order: index + 1 }))
      );
      this.pagesStore.setPages(pages);
    },
    async editPage(page: Page) {
      await this.pagesStore.editPage(page.id, {
        name: page.name,
        meta: page.meta,
      });
      await this.pagesStore.getAllPagesApi(+this.$route.params.projectId);
    },
    async deletePage(id: number) {
      await this.pagesStore.deletePage(id);
      await this.pagesStore.getAllPagesApi(+this.$route.params.projectId);
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
