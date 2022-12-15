<template>
  <form @submit.prevent>
    <h4>Create project</h4>
    <my-input type="text" placeholder="Name" v-model="project.name" />
    <my-button class="button" @click="createProject">Create</my-button>
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
  data() {
    return {
      project: {
        name: '',
      },
    };
  },
  methods: {
    createProject() {
      this.$emit('create', this.project);
      this.project.name = '';
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
