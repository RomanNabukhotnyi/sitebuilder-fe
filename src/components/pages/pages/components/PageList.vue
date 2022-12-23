<template>
  <div>
    <MyDialog v-model:show="dialogVisible">
      <EditPageForm :page="page" @edit="editPage" :pages="pages" />
    </MyDialog>
    <div class="pagesContainer" v-show="!loading && pages.length !== 0">
      <Draggable
        v-model="draggablePages"
        tag="transition-group"
        group="pages"
        animation="200"
        ghost-class="ghost"
        :component-data="{
          name: 'pageList',
        }"
      >
        <template #item="{ element }">
          <div class="page">
            <div @click="openPage(element.id)">
              <img
                class="pageImage"
                width="240"
                height="520"
                src="https://img.zeplin.io/https%3A%2F%2Fcdn.zeplin.io%2F638878ea1a052582d3461e31%2Fscreens%2Fd3c4ec2b-e88d-4f68-a1ff-ac47e9b32cc7.png?w=240&amp;cropTop=0&amp;cropLeft=0&amp;cropWidth=240&amp;cropHeight=520"
              />
            </div>
            <div class="page__body">
              <div class="page__name">
                <input
                  type="text"
                  v-model="element.name"
                  @change="editPage(element)"
                />
              </div>
              <div class="actions">
                <MyButton
                  class="button__edit"
                  @click.stop="showDialog(element)"
                >
                  Edit
                </MyButton>
                <MyButton
                  class="button__delete"
                  @click.stop="deletePage(element.id)"
                >
                  Delete
                </MyButton>
              </div>
            </div>
          </div>
        </template>
      </Draggable>
    </div>
    <div v-show="!loading && pages.length === 0" class="noPages">
      <h3>No pages</h3>
    </div>
    <div v-show="loading" class="pagesContainer">
      <div
        class="page-placeholder placeholder-animate"
        v-for="item in 3"
        :style="{ animationDelay: `1.${item}s` }"
        :key="item"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyButton from '@/components/common/MyButton.vue';
import MyDialog from '@/components/common/MyDialog.vue';
import EditPageForm from './EditPageForm.vue';
import Draggable from 'vuedraggable';

import type { Page } from '@/interfaces/Page';

export default defineComponent({
  name: 'PageList',
  components: {
    MyButton,
    MyDialog,
    EditPageForm,
    Draggable,
  },
  props: {
    pages: {
      type: Array<Page>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['delete', 'edit', 'updateOrders'],
  data() {
    return {
      dialogVisible: false,
      page: {},
    };
  },
  computed: {
    draggablePages: {
      get() {
        return this.pages;
      },
      set(value: any) {
        this.$emit('updateOrders', value);
      },
    },
  },
  methods: {
    sortedPages(): Page[] {
      return this.$props.pages.sort((a, b) => (a.order > b.order ? 1 : -1));
    },
    openPage(pageId: number): void {
      this.$router.push(`/pages/${pageId}`);
    },
    showDialog(page: Page): void {
      this.dialogVisible = true;
      this.page = page;
    },
    deletePage(id: number): void {
      this.$emit('delete', id);
    },
    editPage(page: Page): void {
      this.$emit('edit', page);
      this.dialogVisible = false;
    },
  },
});
</script>

<style scoped>
.ghost {
  opacity: 0.5;
}
.pagesContainer {
  grid-gap: 24px;
  padding: 12px 36px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 240px);
  justify-content: center;
}
.page {
  cursor: move;
  position: relative;
  background-color: white;
  outline: 1px solid rgba(188, 181, 185, 0.3);
  border-radius: 2px;
}
.page__body {
  padding: 6px 6px;
}
.pageImage {
  outline: 1px solid rgba(188, 181, 185, 0.3);
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
.page__name {
  width: 100%;
  margin: 0 0 5px 0;
}
.page__name input {
  width: 100%;
  border: solid rgba(255, 255, 255, 0.01);
  border-width: 0 0 2px;
}
.page__name:hover input:read-write {
  border-image-source: url(@/../public/img/borderImageHover.svg);
  border-image-slice: 0 0 2 0;
  border-image-repeat: repeat;
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
.actions {
  display: flex;
  justify-content: end;
}
.button__edit {
  background-color: #ffc038;
}
.button__delete {
  background-color: #ff4747;
}
/* placeholders */
.page-placeholder {
  background-color: #eeeeee;
  width: 240px;
  height: 590px;
  border-radius: 2px;
}
@keyframes loading {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
.placeholder-animate {
  animation-name: loading;
  animation-timing-function: steps(10, end);
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-duration: 1s;
}
/* animations */
.pageList-move {
  transition: transform 0.5s;
}
.pageList-enter-active,
.pageList-leave-active {
  transition: all 0.5s ease !important;
}
.pageList-enter-from,
.pageList-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
</style>
