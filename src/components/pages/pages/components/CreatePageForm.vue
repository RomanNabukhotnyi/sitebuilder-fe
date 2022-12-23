<template>
  <div class="form">
    <h4>Create page</h4>
    <div class="field">
      <MyInput
        class="input"
        type="text"
        placeholder="Name"
        @input="nameValidation"
        v-model="page.name"
      />
      <p v-if="nameError" class="error">{{ nameError }}</p>
    </div>
    <MyButton class="button" @click="createPage" :disabled="validation">
      Create
    </MyButton>
  </div>
</template>

<script lang="ts">
import MyButton from '@/components/common/MyButton.vue';
import MyInput from '@/components/common/MyInput.vue';
import { defineComponent } from 'vue';
import type { Page } from '@/interfaces/Page';

export default defineComponent({
  name: 'CreatePageForm',
  components: {
    MyButton,
    MyInput,
  },
  props: {
    pages: {
      type: Array<Page>,
      required: true,
    },
  },
  data() {
    return {
      page: {
        name: '',
        meta: {},
      },
      nameError: '',
    };
  },
  created() {
    window.addEventListener('keyup', (event) => {
      if (event.code === 'Enter') {
        this.createPage();
      }
    });
  },
  computed: {
    validation(): boolean {
      return !!this.nameError;
    },
  },
  methods: {
    nameValidation(): boolean {
      if (this.page.name === '') {
        this.nameError = 'Field is required';
        return false;
      }
      if (this.$props.pages.find((page) => page.name === this.page.name)) {
        this.nameError = 'A page with that name exists';
        return false;
      }
      this.nameError = '';
      return true;
    },
    createPage() {
      if (this.nameValidation()) {
        this.$emit('create', this.page);
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
  width: 50%;
}
.button:disabled {
  background-color: #a9b5c2;
}
.button:disabled:hover {
  opacity: 1;
  cursor: default;
}
</style>
