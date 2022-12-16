<template>
  <div>
    <div>
      <section class="screenView">
        <div class="page">
          <div class="slots">
            <div class="slot" v-for="slot in getAllSlots" :key="slot.id">
              <button
                class="emptySlot"
                v-if="slot.blocks.length === 0"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#createBlock"
                @click="setSlotId(slot.id)"
              >
                +
              </button>
              <div class="blocks" v-else>
                <div class="block" v-for="block in slot.blocks" :key="block.id">
                  <img
                    src="https://media.istockphoto.com/id/152496976/photo/concrete-block.jpg?s=612x612&w=0&k=20&c=SnP0UWmzk4Kn21BfnHcoFudCwt7S3-qCQ_mLsIe1d9M="
                    alt=""
                  />
                </div>
              </div>
              <div class="slotMenu" id="slotMenu">
                <div
                  class="_39hNm _3Lnlb"
                  data-hook="actions-bar"
                  data-skin="legacy"
                  style="max-height: 164px"
                >
                  <div class="_23lTs">
                    <div data-collapsible="true" class="Dmx5k">
                      <div
                        class="menuAction moveAction"
                        data-hook="action-move-up"
                        @click="moveUpSlot(slot.id)"
                      >
                        <span
                          ><svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="24"
                            height="24"
                            class="_3ft7O"
                          >
                            <path
                              d="M12.9970936,6.70710678 L12.9970936,19 L11.9970936,19 L11.9970936,6.70710678 L7.85355339,10.8556944 C7.65829124,11.0509566 7.34170876,11.0509566 7.14644661,10.8556944 C6.95118446,10.6604323 6.95118446,10.3438498 7.14644661,10.1485877 L12.4970936,4.79289322 L17.8536152,10.1485877 C18.0488773,10.3438498 18.0488773,10.6604323 17.8536152,10.8556944 C17.658353,11.0509566 17.3417706,11.0509566 17.1465084,10.8556944 L12.9970936,6.70710678 Z"
                            ></path></svg
                        ></span>
                      </div>
                      <div
                        class="menuAction moveAction"
                        data-hook="action-move-down"
                        @click="moveDownSlot(slot.id)"
                      >
                        <span
                          ><svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="24"
                            height="24"
                            class="_3ft7O"
                          >
                            <path
                              d="M12.9970936,17.2928932 L17.1465084,13.1443056 C17.3417706,12.9490434 17.658353,12.9490434 17.8536152,13.1443056 C18.0488773,13.3395677 18.0488773,13.6561502 17.8536152,13.8514123 L12.4970936,19.2071068 L7.14644661,13.8514123 C6.95118446,13.6561502 6.95118446,13.3395677 7.14644661,13.1443056 C7.34170876,12.9490434 7.65829124,12.9490434 7.85355339,13.1443056 L11.9970936,17.2928932 L11.9970936,5 L12.9970936,5 L12.9970936,17.2928932 Z"
                            ></path></svg
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="_1_33j"
                    data-bs-toggle="modal"
                    data-bs-target="#createBlock"
                    @click="setSlotId(slot.id)"
                  >
                    <div class="menuAction">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          class="_3ft7O"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div class="_1_33j" @click="deleteSlot(slot.id)">
                    <div
                      class="menuAction"
                      data-collapsible="false"
                      data-hook="action-delete"
                    >
                      <span>
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          width="24"
                          height="24"
                          class="_3ft7O"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="slots slot createSlot">
            <my-button class="button__create" @click="showDialog">
              Create Slot
            </my-button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { useSlotsStore } from '../../../stores/slots';
import { useBlocksStore } from '../../../stores/blocks';
import MyButton from '@/components/common/MyButton.vue';

type Content = {
  text?: string;
  url?: string;
  subtext?: string | undefined;
};

interface Data {
  dialogVisible: boolean;
  slotTemp: {
    id?: number;
    type?: string;
  };
  blockTemp: {
    id?: number;
    type?: 'TEXT' | 'IMAGE';
    content?: Content;
  };
}

export default {
  components: {
    MyButton,
  },
  setup() {
    const slotsStore = useSlotsStore();
    const blocksStore = useBlocksStore();
    return {
      slotsStore,
      blocksStore,
    };
  },
  data(): Data {
    return {
      dialogVisible: false,
      slotTemp: {
        type: '',
      },
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
    this.slotsStore.getAllSlotsApi(+this.$route.params.pageId);
  },
  computed: {
    getAllSlots() {
      return this.slotsStore.getAllSlots;
    },
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    setSlotId(slotId: number) {
      this.slotTemp.id = slotId;
    },
    openSlot(slotId: number) {
      this.$router.push(
        `/main/projects/${+this.$route.params.projectId}/pages/${+this.$route
          .params.pageId}/slots/${slotId}/blocks`
      );
    },
    reset() {
      this.slotTemp = {};
      this.blockTemp = { content: { text: '', url: '', subtext: '' } };
    },
    getEditSlot(slotId: number) {
      Object.assign(this.slotTemp, this.slotsStore.getById(slotId));
    },
    async createBlock() {
      await this.blocksStore.createBlock({
        slotId: this.slotTemp.id!,
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
      this.slotsStore.getAllSlotsApi(+this.$route.params.pageId);
      this.reset();
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
      this.slotsStore.getAllSlotsApi(+this.$route.params.pageId);
    },
    async deleteBlock(blockId: number) {
      await this.blocksStore.deleteBlock(blockId);
      this.slotsStore.getAllSlotsApi(+this.$route.params.pageId);
    },
    async moveUpSlot(slotId: number) {
      const slots = this.slotsStore.getAllSlots;
      const index = slots.findIndex((slot) => slot.id === slotId);
      if (index === 0) {
        return;
      }
      [slots[index - 1], slots[index]] = [slots[index], slots[index - 1]];
      this.slotsStore.setSlots(slots);
      this.updateOrders();
    },
    async moveDownSlot(slotId: number) {
      const slots = this.slotsStore.getAllSlots;
      const index = slots.findIndex((slot) => slot.id === slotId);
      if (index === slots.length) {
        return;
      }
      [slots[index + 1], slots[index]] = [slots[index], slots[index + 1]];
      this.slotsStore.setSlots(slots);
      this.updateOrders();
    },
    async updateOrders() {
      await this.slotsStore.updateOrders(
        +this.$route.params.pageId,
        this.getAllSlots.map((slot, index) => ({
          id: slot.id,
          order: index + 1,
        }))
      );
    },
  },
};
</script>

<style scoped>
@import 'slots.css';
.createSlot {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}
</style>
