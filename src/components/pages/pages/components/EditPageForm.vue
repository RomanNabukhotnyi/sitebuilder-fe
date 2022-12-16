<template>
  <form @submit.prevent>
    <h4>Edit page</h4>
    <my-input type="text" placeholder="Name" v-model="editedPage.name" />
    <my-button class="button" @click="editProject">Edit</my-button>
  </form>
</template>

<script lang="ts">
import MyButton from '../../../common/MyButton.vue';
import MyInput from '../../../common/MyInput.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    MyButton,
    MyInput,
  },
  props: {
    page: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editedPage: {
        name: '',
      },
    };
  },
  mounted() {
    this.editedPage = Object.create(this.$props.page);
  },
  methods: {
    editProject() {
      this.$emit('edit', this.editedPage);
      this.editedPage.name = '';
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
