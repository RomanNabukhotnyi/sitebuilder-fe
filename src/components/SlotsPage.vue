<template>
  <div>
    <div class="panel">
      <div class="panelContainer margin">
        <div class="block"></div>
        <div class="sort" title="Sort by Created" tabindex="0">
          <span class="ellipsis">Created</span
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
            data-bs-target="#createSlot"
          >
            Create Slot
          </button>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="createSlot"
      tabindex="-1"
      aria-labelledby="createSlotLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="createSlotLabel">Create Slot</h1>
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
                <input
                  type="text"
                  class="form-control"
                  id="type"
                  v-model="slotTemp.type"
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
              @click="createSlot"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="row row-cols-1 row-cols-md-6">
        <div class="col" v-for="slot in getAllSlots" :key="slot.id">
          <div class="card border-primary" @click="openSlot(slot.id)">
            <div class="card-header hstack">
              <h5>{{ slot.type }}</h5>
              <div class="ms-auto">
                <button
                  type="button"
                  class="btn btn-sm btn-danger"
                  @click.stop="deleteSlot(slot.id)"
                >
                  Delete
                </button>
              </div>
            </div>
            <div class="card-body">
              <h6>Order: {{ slot.order }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useSlotsStore } from '../stores/slots';

interface Data {
  slotTemp: {
    id?: number;
    type?: string;
  };
}

export default {
  setup() {
    const slotsStore = useSlotsStore();
    return {
      slotsStore,
    };
  },
  data(): Data {
    return {
      slotTemp: {
        type: '',
      },
    };
  },
  mounted() {
    this.slotsStore.getAllSlotsApi(+this.$route.params.pageId);
  },
  computed: {
    getAllSlots() {
      return this.slotsStore.getAllSlots;
    },
  },
  methods: {
    openSlot(slotId: number) {
      this.$router.push(
        `/main/projects/${+this.$route.params.projectId}/pages/${+this.$route
          .params.pageId}/slots/${slotId}/blocks`
      );
    },
    reset() {
      this.slotTemp = {};
    },
    getEditSlot(slotId: number) {
      Object.assign(this.slotTemp, this.slotsStore.getById(slotId));
    },
    async createSlot() {
      await this.slotsStore.createSlot({
        pageId: +this.$route.params.pageId,
        type: this.slotTemp.type!,
      });
      this.reset();
      this.slotsStore.getAllSlotsApi(+this.$route.params.pageId);
    },
    async deleteSlot(slotId: number) {
      await this.slotsStore.deleteSlot(slotId);
      this.slotsStore.getAllSlotsApi(+this.$route.params.pageId);
    },
  },
};
</script>
