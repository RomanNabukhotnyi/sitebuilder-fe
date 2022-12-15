<template>
  <div>
    <div class="panel">
      <div class="panelContainer margin">
        <div class="block"></div>
        <div class="sort" title="Sort by Created" tabindex="0">
          <span>Created</span
          ><svg width="9" height="6" viewBox="0 0 12 8">
            <path
              fill="var(--teflon)"
              d="M6.003 8c.356 0 .71-.148.982-.442l4.608-4.982c.543-.588.543-1.543-.002-2.132-.546-.593-1.425-.59-1.97-.002L6 4.356 2.383.442C1.84-.145.955-.145.413.444c-.55.593-.548 1.544-.004 2.132l4.605 4.982c.27.293.627.44.984.44L6.002 8z"
            ></path>
          </svg>
        </div>
      </div>
      <label class="search"
        ><svg width="16" height="16" viewBox="0 0 16 16">
          <path
            fill="var(--gandalf)"
            fill-rule="evenodd"
            d="M2.01 11.715c-2.68-2.68-2.68-7.025 0-9.705 2.68-2.68 7.025-2.68 9.705 0 2.35 2.35 2.64 5.978.87 8.643.034.028.068.06.1.09l2.912 2.913c.536.536.54 1.4 0 1.94-.536.537-1.402.54-1.94 0l-2.913-2.91c-.032-.033-.063-.067-.09-.102-2.666 1.77-6.295 1.48-8.644-.87zm1.94-1.94c1.61 1.607 4.216 1.607 5.824 0 1.608-1.61 1.608-4.216 0-5.824-1.608-1.607-4.215-1.607-5.823 0-1.607 1.61-1.607 4.216 0 5.824z"
          ></path></svg
        ><input type="search" placeholder="Filter by name" style="width: 94px"
      /></label>
      <div class="panelContainer">
        <div class="buttonCreate">
          <button
            type="button"
            class="button primary"
            data-bs-toggle="modal"
            data-bs-target="#createBlock"
          >
            Create Block
          </button>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="createBlock"
      tabindex="-1"
      aria-labelledby="createBlockLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="createBlockLabel">Create Block</h1>
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
                <label for="type" class="col-form-label">Type:</label>
                <select name="type" id="type" v-model="blockTemp.type">
                  <option value="TEXT" selected>Text</option>
                  <option value="IMAGE">Image</option>
                </select>
              </div>
              <div v-if="blockTemp.type">
                <div class="mb-3" v-if="blockTemp.type === 'TEXT'">
                  <label for="text" class="col-form-label">Text:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="text"
                    v-model="blockTemp.content!.text"
                  />
                </div>
                <div class="mb-3" v-else>
                  <label for="url" class="col-form-label">Url:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="url"
                    v-model="blockTemp.content!.url"
                  />
                </div>
                <div class="mb-3">
                  <label for="subtext" class="col-form-label">Subtext:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="subtext"
                    v-model="blockTemp.content!.subtext"
                  />
                </div>
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
              @click="createBlock"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="row row-cols-1 row-cols-md-6">
        <div class="col" v-for="block in getAllBlocks" :key="block.id">
          <div class="card border-primary">
            <div class="card-header hstack">
              <h5>{{ block.type }}</h5>
              <div class="ms-auto">
                <button
                  type="button"
                  class="btn btn-sm btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#editBlock"
                  @click.stop="getEditBlock(block.id)"
                >
                  Edit
                </button>

                <div
                  class="modal fade"
                  id="editBlock"
                  tabindex="-1"
                  aria-labelledby="editBlockLabel"
                  aria-hidden="true"
                  @click.stop
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="editBlockLabel">
                          Edit Block
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div v-if="blockTemp.type">
                            <div class="mb-3" v-if="blockTemp.type === 'TEXT'">
                              <label for="text" class="col-form-label"
                                >Text:</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                id="text"
                                v-model="blockTemp.content!.text"
                              />
                            </div>
                            <div class="mb-3" v-else>
                              <label for="url" class="col-form-label"
                                >Url:</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                id="url"
                                v-model="blockTemp.content!.url"
                              />
                            </div>
                            <div class="mb-3">
                              <label for="subtext" class="col-form-label"
                                >Subtext:</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                id="subtext"
                                v-model="blockTemp.content!.subtext"
                              />
                            </div>
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
                          @click="editBlock"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-sm btn-danger"
                  @click.stop="deleteBlock(block.id)"
                >
                  Delete
                </button>
              </div>
            </div>
            <div class="card-body">
              <h6>Order: {{ block.order }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useBlocksStore } from '../../../stores/blocks';

type Content = {
  text?: string;
  url?: string;
  subtext?: string | undefined;
};

interface Data {
  blockTemp: {
    id?: number;
    type?: 'TEXT' | 'IMAGE';
    content?: Content;
  };
}

export default {
  setup() {
    const blocksStore = useBlocksStore();
    return {
      blocksStore,
    };
  },
  data(): Data {
    return {
      blockTemp: {
        content: {
          text: '',
          url: '',
          subtext: '',
        },
      },
    };
  },
  mounted() {
    this.blocksStore.getAllBlocksApi(+this.$route.params.slotId);
  },
  computed: {
    getAllBlocks() {
      return this.blocksStore.getAllBlocks;
    },
  },
  methods: {
    async createBlock() {
      await this.blocksStore.createBlock({
        slotId: +this.$route.params.slotId,
        type: this.blockTemp.type!,
        content: {
          [this.blockTemp.type === 'TEXT' ? 'text' : 'url']:
            this.blockTemp.type === 'TEXT'
              ? this.blockTemp.content!.text
              : this.blockTemp.content!.url,
          subtext:
            this.blockTemp.content!.subtext === ''
              ? undefined
              : this.blockTemp.content!.subtext,
        },
      });
      this.reset();
      this.blocksStore.getAllBlocksApi(+this.$route.params.slotId);
    },
    reset() {
      this.blockTemp = { content: { text: '', url: '', subtext: '' } };
    },
    getEditBlock(blockId: number) {
      Object.assign(this.blockTemp, this.blocksStore.getById(blockId));
    },
    async editBlock() {
      await this.blocksStore.editBlock(this.blockTemp.id!, {
        type: this.blockTemp.type!,
        content: {
          [this.blockTemp.type === 'TEXT' ? 'text' : 'url']:
            this.blockTemp.type === 'TEXT'
              ? this.blockTemp.content!.text
              : this.blockTemp.content!.url,
          subtext:
            this.blockTemp.content!.subtext === ''
              ? undefined
              : this.blockTemp.content!.subtext,
        },
      });
      this.reset();
      this.blocksStore.getAllBlocksApi(+this.$route.params.slotId);
    },
    async deleteBlock(blockId: number) {
      await this.blocksStore.deleteBlock(blockId);
      this.blocksStore.getAllBlocksApi(+this.$route.params.slotId);
    },
  },
};
</script>
