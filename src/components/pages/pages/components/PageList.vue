<template>
  <div class="pagesContainer">
    <my-dialog v-model:show="dialogVisible">
      <edit-page-form :page="page" @edit="editPage" />
    </my-dialog>
    <div v-for="page in pages" :key="page.id">
      <div class="page">
        <div @click="openPage(page.id)">
          <a class="pageImage">
            <img
              width="240"
              height="520"
              src="https://img.zeplin.io/https%3A%2F%2Fcdn.zeplin.io%2F638878ea1a052582d3461e31%2Fscreens%2Fd3c4ec2b-e88d-4f68-a1ff-ac47e9b32cc7.png?w=240&amp;cropTop=0&amp;cropLeft=0&amp;cropWidth=240&amp;cropHeight=520"
            />
          </a>
        </div>
        <div class="page__body">
          <div class="page__name">
            <input type="text" v-model="page.name" @change="editPage(page)" />
          </div>
          <div class="actions">
            <my-button class="button__edit" @click.stop="showDialog(page)">
              Edit
            </my-button>
            <my-button class="button__delete" @click.stop="deletePage(page.id)">
              Delete
            </my-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyButton from '@/components/common/MyButton.vue';
import MyDialog from '@/components/common/MyDialog.vue';
import EditPageForm from './EditPageForm.vue';

interface Page {
  id: number;
  name: string;
  meta: any;
  order: number;
}

export default defineComponent({
  components: {
    MyButton,
    MyDialog,
    EditPageForm,
  },
  props: {
    pages: {
      type: Array<Page>,
      required: true,
    },
  },
  setup() {
    return {};
  },
  data() {
    return {
      dialogVisible: false,
      page: {},
    };
  },
  methods: {
    sortedPages() {
      return this.$props.pages.sort((a, b) => (a.order > b.order ? 1 : -1));
    },
    openPage(pageId: number) {
      this.$router.push(
        `/main/projects/${+this.$route.params.projectId}/pages/${pageId}/slots`
      );
    },
    showDialog(page: Page) {
      this.dialogVisible = true;
      this.page = page;
    },
    deletePage(id: number) {
      this.$emit('delete', id);
    },
    editPage(page: Page) {
      this.$emit('edit', page);
      this.dialogVisible = false;
    },
    // onDragStart(event: DragEvent, page: any) {
    //   event.dataTransfer!.dropEffect = 'move';
    //   event.dataTransfer!.effectAllowed = 'move';
    //   event.dataTransfer!.setData('pageId', String(page.id));
    //   event.dataTransfer!.setData('orderBefore', String(page.order));
    // },
    // onDrop(event: DragEvent, order: number) {
    //   const pageId = +event.dataTransfer!.getData('pageId');
    //   const orderBefore = +event.dataTransfer!.getData('orderBefore');
    //   console.log(orderBefore);
    //   let arr: any[] = this.$props.pages.map((page) => {
    //     if (page.order === order) {
    //       page.order = orderBefore;
    //     }
    //     if (page.id === pageId) {
    //       page.order = order;
    //     }
    //     return page;
    //   });
    //   if (arr.find((page) => page.order === 0)) {
    //     arr = arr.map((page) => ({ ...page, order: page.order + 1 }));
    //   }
    //   this.pagesStore.setPages(arr);
    //   this.updateOrders();
    // },
  },
});
</script>

<style scoped>
.pagesContainer {
  grid-gap: 24px;
  padding: 12px 36px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 240px);
  justify-content: center;
}
.page {
  position: relative;
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
</style>