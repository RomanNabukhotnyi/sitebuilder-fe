<template>
  <div>
    <div class="panel">
      <div class="panelContainer margin">
        <div class="block"></div>
        <div class="sort" title="Sort by Created" tabindex="0">
          <span class="ellipsis">Created</span
          ><svg class="chevron" width="9" height="6" viewBox="0 0 12 8">
            <path
              fill="#554d56"
              d="M6.003 8c.356 0 .71-.148.982-.442l4.608-4.982c.543-.588.543-1.543-.002-2.132-.546-.593-1.425-.59-1.97-.002L6 4.356 2.383.442C1.84-.145.955-.145.413.444c-.55.593-.548 1.544-.004 2.132l4.605 4.982c.27.293.627.44.984.44L6.002 8z"
            ></path>
          </svg>
        </div>
      </div>
      <label class="search"
        ><svg width="16" height="16" viewBox="0 0 16 16">
          <path
            fill="#979197"
            fill-rule="evenodd"
            d="M2.01 11.715c-2.68-2.68-2.68-7.025 0-9.705 2.68-2.68 7.025-2.68 9.705 0 2.35 2.35 2.64 5.978.87 8.643.034.028.068.06.1.09l2.912 2.913c.536.536.54 1.4 0 1.94-.536.537-1.402.54-1.94 0l-2.913-2.91c-.032-.033-.063-.067-.09-.102-2.666 1.77-6.295 1.48-8.644-.87zm1.94-1.94c1.61 1.607 4.216 1.607 5.824 0 1.608-1.61 1.608-4.216 0-5.824-1.608-1.607-4.215-1.607-5.823 0-1.607 1.61-1.607 4.216 0 5.824z"
          ></path></svg
        ><input
          type="search"
          placeholder="Filter by name"
          style="width: 94px"
          v-model="search"
          @input="filter"
      /></label>
      <div class="panelContainer">
        <div class="buttonCreate">
          <button
            type="button"
            class="button primary"
            data-bs-toggle="modal"
            data-bs-target="#createPage"
          >
            Create Page
          </button>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="createPage"
      tabindex="-1"
      aria-labelledby="createPageLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="createPageLabel">Create Page</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="createName" class="col-form-label">Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="createName"
                  v-model="pageTemp.name"
                />
              </div>
              <div class="mb-3">
                <label for="url" class="col-form-label">Url:</label>
                <input
                  type="text"
                  class="form-control"
                  id="url"
                  v-model="pageTemp.meta!.url"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click.stop="reset"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="createPage"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="editPage"
      tabindex="-1"
      aria-labelledby="editPageLabel"
      aria-hidden="true"
      @click.stop
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editPageLabel">Edit Page</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="editName" class="col-form-label">Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="editName"
                  v-model="pageTemp.name"
                />
              </div>
              <div class="mb-3">
                <label for="url" class="col-form-label">Url:</label>
                <input
                  type="text"
                  class="form-control"
                  id="url"
                  v-model="pageTemp.meta!.url"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click.stop="reset"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="editPage()"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section dashboardSection" style="margin-bottom: 36px">
    <div style="padding-left: 36px; padding-right: 36px">
      <div class="dashboardScreenGrid">
        <div
          class="dashboardScreenWrapper"
          @dragover.prevent
          @dragenter.prevent
          v-for="{ order } in getAllPages.sort((a, b) =>
            a.order > b.order ? 1 : -1
          )"
          :key="order"
          @drop="onDrop($event, order)"
        >
          <div
            v-for="page in getAllPages.filter((page) => page.order === order)"
            :key="page.id"
            @dragstart="onDragStart($event, page)"
            draggable="true"
          >
            <div class="screenThumbnailSectionDividerWrapper">
              <div
                class="screenThumbnailPaddingArea left"
                style="height: 520px"
              ></div>
              <div class="screenThumbnail dashboardScreen">
                <div @click="openPage(page.id)">
                  <a class="pageImage" data-link-type="inApp"
                    ><img
                      width="240"
                      height="520"
                      class="screenImage"
                      src="https://img.zeplin.io/https%3A%2F%2Fcdn.zeplin.io%2F638878ea1a052582d3461e31%2Fscreens%2Fd3c4ec2b-e88d-4f68-a1ff-ac47e9b32cc7.png?w=240&amp;cropTop=0&amp;cropLeft=0&amp;cropWidth=240&amp;cropHeight=520"
                      srcset="
                        https://img.zeplin.io/https%3A%2F%2Fcdn.zeplin.io%2F638878ea1a052582d3461e31%2Fscreens%2Fd3c4ec2b-e88d-4f68-a1ff-ac47e9b32cc7.png?w=480&amp;cropTop=0&amp;cropLeft=0&amp;cropWidth=480&amp;cropHeight=1040 2x
                      "
                  /></a>
                </div>
                <div class="screenInfo">
                  <div class="highlightTextInput screenName">
                    <div class="textInput">
                      <input
                        minlength="1"
                        maxlength="100"
                        type="text"
                        class="ellipsis"
                        v-model="page.name"
                        @change="editNamePage(page)"
                      />
                    </div>
                  </div>
                  <div class="screenLastUpdated ellipsis">
                    {{
                      Math.ceil(
                        Math.abs(
                          new Date(Date.now()).getTime() -
                            new Date(page.createdAt).getTime()
                        ) /
                          (1000 * 3600 * 24)
                      )
                    }}d
                  </div>
                </div>
                <div class="float-end">
                  <button
                    type="button"
                    class="btn btn-sm btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#editPage"
                    @click.stop="getEditPage(page.id)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-danger"
                    @click.stop="deletePage(page.id)"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div
                class="screenThumbnailPaddingArea right"
                style="height: 520px"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { usePagesStore } from '../../../stores/pages';

interface Data {
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

export default {
  setup() {
    const pagesStore = usePagesStore();
    return {
      pagesStore,
    };
  },
  data(): Data {
    return {
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
    async filter() {
      await this.pagesStore.getAllPagesApi(+this.$route.params.projectId);
      this.pagesStore.setPages(
        this.getAllPages.filter((page) =>
          page.name.toLowerCase().includes(this.search.toLowerCase())
        )
      );
    },
    onDragStart(event: DragEvent, page: any) {
      event.dataTransfer!.dropEffect = 'move';
      event.dataTransfer!.effectAllowed = 'move';
      event.dataTransfer!.setData('pageId', String(page.id));
      event.dataTransfer!.setData('orderBefore', String(page.order));
    },
    onDrop(event: DragEvent, order: number) {
      console.log(order);
      const pageId = +event.dataTransfer!.getData('pageId');
      const orderBefore = +event.dataTransfer!.getData('orderBefore');
      console.log(orderBefore);
      let arr: any[] = this.getAllPages.map((page) => {
        if (page.order === order) {
          page.order = orderBefore;
        }
        if (page.id === pageId) {
          page.order = order;
        }
        return page;
      });
      if (arr.find((page) => page.order === 0)) {
        arr = arr.map((page) => ({ ...page, order: page.order + 1 }));
      }
      this.pagesStore.setPages(arr);
      this.updateOrders();
    },
    openPage(pageId: number) {
      this.$router.push(
        `/main/projects/${+this.$route.params.projectId}/pages/${pageId}/slots`
      );
    },
    getEditPage(pageId: number) {
      Object.assign(this.pageTemp, this.pagesStore.getById(pageId));
    },
    async editNamePage(page: any) {
      await this.pagesStore.editPage(page.id, {
        name: page.name,
        meta: page.meta,
      });
      this.pagesStore.getAllPagesApi(+this.$route.params.projectId);
    },
    reset() {
      this.pageTemp = { meta: { url: undefined } };
    },
    async createPage() {
      await this.pagesStore.createPage({
        projectId: +this.$route.params.projectId,
        name: this.pageTemp.name!,
        meta: this.pageTemp.meta,
      });
      this.reset();
      this.pagesStore.getAllPagesApi(+this.$route.params.projectId);
    },
    async updateOrders() {
      await this.pagesStore.updateOrders(
        +this.$route.params.projectId,
        this.getAllPages.map((page) => ({ id: page.id, order: page.order }))
      );
    },
    async editPage() {
      await this.pagesStore.editPage(this.pageTemp.id!, {
        name: this.pageTemp.name!,
        meta: this.pageTemp.meta,
      });
      this.reset();
      this.pagesStore.getAllPagesApi(+this.$route.params.projectId);
    },
    async deletePage(pageId: number) {
      await this.pagesStore.deletePage(pageId);
      this.pagesStore.getAllPagesApi(+this.$route.params.projectId);
    },
  },
};
</script>

<style scoped>
@import 'pages.css';
</style>
