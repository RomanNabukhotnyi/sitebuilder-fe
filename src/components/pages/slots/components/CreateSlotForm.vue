<template>
  <div class="form">
    <h4>Create slot</h4>
    <MySelect
      class="select"
      :selected="'Type: ' + selected"
      :options="options"
      @select="selectOption"
    />
    <MyButton class="button" @click="createSlot">Create</MyButton>
  </div>
</template>

<script lang="ts">
import MyButton from '@/components/common/MyButton.vue';
import MySelect from '@/components/common/MySelect.vue';
import { defineComponent } from 'vue';
import type { Option } from '@/interfaces/Option';

export default defineComponent({
  name: 'CreateSlotForm',
  components: {
    MyButton,
    MySelect,
  },
  data() {
    return {
      slot: {
        type: 'DYNAMIC',
      },
      selected: 'dynamic',
      options: [
        { name: 'static', value: 'STATIC' },
        { name: 'dynamic', value: 'DYNAMIC' },
      ],
    };
  },
  created() {
    window.addEventListener('keyup', (event) => {
      if (event.code === 'Enter') {
        this.createSlot();
      }
    });
  },
  methods: {
    createSlot() {
      this.$emit('create', this.slot);
    },
    selectOption(option: Option) {
      this.slot.type = option.value;
      this.selected = option.name;
    },
  },
});
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
.select {
  margin: 15px 0;
}
.button {
  align-self: flex-end;
  width: 50%;
}
</style>
