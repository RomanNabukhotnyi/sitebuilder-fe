<template>
  <div class="u-page-list">
    <div
      v-show="!loadingGetPages && pages.length !== 0"
      class="pagesContainer"
    >
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
          <div
            :class="{
              page: true,
              deletePage: loadingDeletePage && element.id === deleteId,
            }"
          >
            <div
              @click="
                !(loadingDeletePage && element.id === deleteId) &&
                  openPage(element.id)
              "
            >
              <img
                class="pageImage"
                width="240"
                height="520"
                src="https://img.zeplin.io/https%3A%2F%2Fcdn.zeplin.io%2F638878ea1a052582d3461e31%2Fscreens%2Fd3c4ec2b-e88d-4f68-a1ff-ac47e9b32cc7.png?w=240&amp;cropTop=0&amp;cropLeft=0&amp;cropWidth=240&amp;cropHeight=520"
              >
            </div>
            <div class="page__body">
              <div class="page__name">
                <p>{{ element.name }}</p>
              </div>
              <div class="actions">
                <CButton
                    label="Edit"
                  class="button__edit"
                  @click.stop="
                    !(loadingDeletePage && element.id === deleteId) &&
                      showEditDialog(element)
                  "
                />
                <CButton
                        label="Delete"
                      class="button__delete"
                      @click.stop="
                        !(loadingDeletePage && element.id === deleteId) &&
                          deletePage(element.id)
                      "
                />
              </div>
            </div>
          </div>
        </template>
      </Draggable>
    </div>
    <div
      v-show="!loadingGetPages && pages.length === 0"
      class="noPages"
    >
      <h3>No pages</h3>
    </div>
    <div
      v-show="loadingGetPages"
      class="pagesContainer"
    >
      <div
        v-for="item in 3"
        :key="item"
        class="page-placeholder placeholder-animate"
        :style="{ animationDelay: `1.${item}s` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Draggable from 'vuedraggable';

import type { ApiPage } from '@/types/pages/ApiPage';

import CButton from '@/components/common/c-button';

const props = defineProps<{
  pages: ApiPage[];
  loadingGetPages: boolean;
  loadingDeletePage: boolean;
}>();

const emit = defineEmits<{
  (e: 'updateOrders', orders: ApiPage[]): void;
  (e: 'showEditDialog', page: ApiPage): void;
  (e: 'delete', id: number): void;
}>();

const deleteId = ref<number | null>(null);
const router = useRouter();
const route = useRoute();
const draggablePages = computed({
  get() {
    return props.pages;
  },
  set(value: ApiPage[]) {
    emit('updateOrders', value);
  },
});

const openPage = (pageId: number): void => {
  router.push(`/projects/${+route.params.projectId}/pages/${pageId}`);
};
const showEditDialog = (page: ApiPage) => {
  emit('showEditDialog', page);
};
const deletePage = (id: number): void => {
  deleteId.value = id;
  emit('delete', id);
};
</script>

<style lang="scss" src="./u-page-list.scss" />
