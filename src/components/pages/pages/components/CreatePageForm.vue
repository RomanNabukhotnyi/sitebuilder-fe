<template>
  <div class="form">
    <h4>Create page</h4>
    <MyInput class="input" type="text" placeholder="Name" v-model="page.name" />
    <MyButton class="button" @click="createPage">Create</MyButton>
  </div>
</template>

<script lang="ts">
import MyButton from '@/components/common/MyButton.vue';
import MyInput from '@/components/common/MyInput.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreatePageForm',
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
    },
  },
});
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
.input {
  margin: 15px 0;
}
.button {
  align-self: flex-end;
}
</style>
