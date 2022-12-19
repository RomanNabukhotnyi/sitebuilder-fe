<template>
  <div class="form">
    <h4>Edit project</h4>
    <MyInput
      class="input"
      type="text"
      placeholder="Name"
      v-model="editedProject.name"
    />
    <MyButton class="button" @click="editProject">Edit</MyButton>
  </div>
</template>

<script lang="ts">
import MyButton from '../../../common/MyButton.vue';
import MyInput from '../../../common/MyInput.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EditProjectForm',
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
    this.editedProject = Object.create(this.$props.project);
  },
  methods: {
    editProject() {
      this.$emit('edit', this.editedProject);
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
