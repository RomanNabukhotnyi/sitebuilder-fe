<template>
  <form @submit.prevent>
    <h4>Create page</h4>
    <my-input type="text" placeholder="Name" v-model="page.name" />
    <my-button class="button" @click="createPage">Create</my-button>
  </form>
</template>

<script lang="ts">
import MyButton from '@/components/common/MyButton.vue';
import MyInput from '@/components/common/MyInput.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    MyButton,
    MyInput,
  },
  data() {
    return {
      page: {
        name: '',
        meta: {},
      },
    };
  },
  methods: {
    createPage() {
      this.$emit('create', this.page);
      this.page.name = '';
    },
  },
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
.button {
  margin-top: 15px;
  align-self: flex-end;
}
</style>
