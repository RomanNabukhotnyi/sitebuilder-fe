<template>
  <div class="form">
    <h4>Create block</h4>
    <MySelect
      class="select"
      :selected="'Type: ' + selected"
      :options="options"
      @select="selectOption"
    />
    <MyInput
      v-if="selected === 'text'"
      class="input"
      placeholder="Text"
      v-model="block.content.text"
    />
    <MyInput
      v-else
      class="input"
      placeholder="Url"
      v-model="block.content.url"
    />
    <MyInput
      class="input"
      placeholder="Subtext"
      v-model="block.content.subtext"
    />
    <MyButton class="button" @click="createBlock">Create</MyButton>
  </div>
</template>

<script lang="ts">
import MyButton from '../../../common/MyButton.vue';
import MySelect from '../../../common/MySelect.vue';
import MyInput from '@/components/common/MyInput.vue';
import { defineComponent } from 'vue';
import type { Option } from '@/interfaces/Option';

export default defineComponent({
  name: 'CreateBlockForm',
  components: {
    MyButton,
    MySelect,
    MyInput,
  },
  props: {
    slotId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      block: {
        type: 'TEXT',
        content: {
          text: '',
          url: '',
          subtext: '',
        },
      },
      selected: 'text',
      options: [
        { name: 'text', value: 'TEXT' },
        { name: 'image', value: 'IMAGE' },
      ],
    };
  },
  methods: {
    createBlock() {
      const {
        type,
        content: { text, url, subtext },
      } = this.block;
      const content =
        type === 'TEXT'
          ? { text, subtext: subtext === '' ? undefined : subtext }
          : { url, subtext: subtext === '' ? undefined : subtext };
      this.$emit('create', this.$props.slotId, { type, content });
    },
    selectOption(option: Option) {
      this.block.type = option.value;
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
.select,
.input {
  margin: 10px 0 0;
}
.button {
  margin: 15px 0 0;
  align-self: flex-end;
}
</style>
