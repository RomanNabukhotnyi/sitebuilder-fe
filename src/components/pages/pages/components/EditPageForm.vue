<template>
  <div class="form">
    <h4>Edit page</h4>
    <div class="field">
      <MyInput
        class="input"
        type="text"
        placeholder="Name"
        @input="nameValidation"
        v-model="editedPage.name"
      />
      <p v-if="nameError" class="error">{{ nameError }}</p>
    </div>
    <MyButton class="button" :disabled="validation" @click="editProject">
      Edit
    </MyButton>
  </div>
</template>

<script lang="ts">
import MyButton from '../../../common/MyButton.vue';
import MyInput from '../../../common/MyInput.vue';
import { defineComponent } from 'vue';
import type { Page } from '@/interfaces/Page';

export default defineComponent({
  name: 'EditPageForm',
  components: {
    MyButton,
    MyInput,
  },
  props: {
    page: {
      type: Object,
      required: true,
    },
    pages: {
      type: Array<Page>,
      required: true,
    },
  },
  data() {
    return {
      editedPage: {
        name: '',
      },
      nameError: '',
    };
  },
  computed: {
    validation(): boolean {
      return !!this.nameError;
    },
  },
  mounted() {
    this.editedPage = Object.create(this.$props.page);
  },
  methods: {
    nameValidation(): boolean {
      if (this.editedPage.name === '') {
        this.nameError = 'Field is required';
        return false;
      }
      if (
        this.$props.pages.find(
          (page) =>
            page.name === this.editedPage.name &&
            page.name !== this.$props.page.name
        )
      ) {
        this.nameError = 'A page with that name exists';
        return false;
      }
      this.nameError = '';
      return true;
    },
    editProject() {
      if (this.nameValidation()) {
        this.$emit('edit', this.editedPage);
      }
    },
  },
});
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
.field {
  margin: 15px 0;
}
.error {
  font-size: 10px;
  color: rgb(255, 107, 107);
}
.button {
  align-self: flex-end;
}
.button:disabled {
  background-color: #a9b5c2;
}
.button:disabled:hover {
  opacity: 1;
  cursor: default;
}
</style>
