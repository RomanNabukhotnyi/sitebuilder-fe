<template>
  <div class="form">
    <h4>Edit page</h4>
    <MyInput
      class="input"
      type="text"
      placeholder="Name"
      v-model="editedPage.name"
    />
    <MyButton class="button" @click="editProject">Edit</MyButton>
  </div>
</template>

<script lang="ts">
import MyButton from '../../../common/MyButton.vue';
import MyInput from '../../../common/MyInput.vue';
import { defineComponent } from 'vue';

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
