<template>
  <form @submit.prevent>
    <h4>Edit project</h4>
    <my-input type="text" placeholder="Name" v-model="editedProject.name" />
    <my-button class="button" @click="editProject">Edit</my-button>
  </form>
</template>

<script lang="ts">
import MyButton from './MyButton.vue';
import MyInput from './MyInput.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    MyButton,
    MyInput,
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editedProject: {
        name: '',
      },
    };
  },
  mounted() {
    this.editedProject = this.project as { name: string };
  },
  methods: {
    editProject() {
      this.$emit('edit', this.editedProject);
      this.editedProject.name = '';
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
