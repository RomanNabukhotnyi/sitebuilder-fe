<template>
  <div class="u-page-list">
    <div
      v-show="!loadingGetPages && pages.length"
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
              deletePage: isDeletedPage(element.id),
            }"
          >
            <div
              class="pageImage"
              @click="openPage(element.id)"
            />
            <div class="page__body">
              <div class="page__name">
                <p>{{ element.name }}</p>
              </div>
              <div class="actions">
                <CButton
                  label="Edit"
                  class="button__edit"
                  @click.stop="showEditDialog(element)"
                />
                <CButton
                  label="Delete"
                  class="button__delete"
                  @click.stop="deletePage(element.id)"
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
import { ROUTE_NAMES } from '@/constants/route-names-constants';

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

const router = useRouter();
const route = useRoute();
const deleteId = ref<number | null>(null);
const draggablePages = computed({
  get() {
    return props.pages;
  },
  set(value: ApiPage[]) {
    emit('updateOrders', value);
  },
});
const isDeletedPage = (pageId: number) =>
  props.loadingDeletePage && pageId === deleteId.value;

const openPage = (pageId: number): void => {
  if (isDeletedPage(pageId)) return;

  router.push({
    name: ROUTE_NAMES.SLOTS,
    params: {
      projectId: route.params.projectId,
      pageId,
    },
  });
};
const showEditDialog = (page: ApiPage) => {
  if (isDeletedPage(page.id)) return;

  emit('showEditDialog', page);
};
const deletePage = (id: number): void => {
  if (isDeletedPage(id)) return;

  deleteId.value = id;
  emit('delete', id);
};
</script>

<style lang="scss" src="./u-page-list.scss" />
