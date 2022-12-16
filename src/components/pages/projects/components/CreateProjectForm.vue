<template>
  <form @submit.prevent>
    <h4>Create project</h4>
    <my-input type="text" placeholder="Name" v-model="project.name" />
    <my-button class="button" @click="createProject">Create</my-button>
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
  data() {
    return {
      project: {
        name: '',
      },
    };
  },
  methods: {
    createProject() {
      const func = async () => {
        await this.$emit('create', this.project);
        this.project.name = '';
      };
      func();
    },
    // createProject() {
    //   this.$emit('create', this.project);
    //   this.$nextTick(() => {
    //     this.project.name = '';
    //   });
    // },
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
