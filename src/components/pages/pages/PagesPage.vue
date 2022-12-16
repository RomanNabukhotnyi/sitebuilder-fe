<template>
  <div>
    <div class="panel">
      <div class="panel__sort">
        <!-- SORT -->
      </div>
      <search-page @filter="filter" />
      <my-dialog v-model:show="dialogVisible">
        <create-page-form @create="createPage" />
      </my-dialog>
      <my-button class="button__create" @click="showDialog">
        Create Page
      </my-button>
    </div>
    <div>
      <page-list
        v-if="getAllPages.length !== 0"
        :pages="getAllPages"
        @edit="editPage"
        @delete="deletePage"
      />
      <div v-else class="noPages">
        <h3>No pages 🤷‍♀️</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { usePagesStore } from '../../../stores/pages';
import CreatePageForm from './components/CreatePageForm.vue';
import PageList from './components/PageList.vue';
import MyDialog from '@/components/common/MyDialog.vue';
import MyButton from '@/components/common/MyButton.vue';
import SearchPage from './components/SearchPage.vue';

interface Data {
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

interface Page {
  id: number;
  name: string;
  meta: any;
}

export default {
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
    this.pagesStore.getAllPagesApi(+this.$route.params.projectId);
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
      this.pagesStore.getAllPagesApi(+this.$route.params.projectId);
      this.dialogVisible = false;
    },
    // async updateOrders() {
    //   await this.pagesStore.updateOrders(
    //     +this.$route.params.projectId,
    //     this.getAllPages.map((page) => ({ id: page.id, order: page.order }))
    //   );
    // },
    async editPage(page: Page) {
      await this.pagesStore.editPage(page.id, {
        name: page.name,
        meta: page.meta,
      });
      this.pagesStore.getAllPagesApi(+this.$route.params.projectId);
    },
    async deletePage(id: number) {
      await this.pagesStore.deletePage(id);
      this.pagesStore.getAllPagesApi(+this.$route.params.projectId);
    },
  },
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
.noPages {
  padding: 60px 84px 108px;
  text-align: center;
}
.noPages h3 {
  line-height: 28px;
  font-weight: 300;
  font-size: 24px;
  color: #554d56;
  margin-bottom: 12px;
}
</style>
