<template>
  <div class="form">
    <h4>Create block</h4>
    <MySelect
      class="select"
      :selected="'Type: ' + selected"
      :options="options"
      @select="selectOption"
    />
    <div v-if="selected === 'text'" class="field">
      <!-- <MyInput
        class="input"
        placeholder="Text"
        v-model="block.content.text"
        @input="textValidation"
      /> -->
      <MyTextarea
        class="textarea"
        placeholder="Text"
        v-model="block.content.text"
        @input="textValidation"
      />
      <p v-if="textError" class="error">{{ textError }}</p>
    </div>
    <div v-else class="field">
      <MyInput
        class="input"
        placeholder="Url"
        v-model="block.content.url"
        @input="urlValidation"
      />
      <p v-if="urlError" class="error">{{ urlError }}</p>
    </div>
    <div class="field">
      <MyInput
        class="input"
        placeholder="Subtext"
        v-model="block.content.subtext"
      />
    </div>
    <MyButton class="button" :disabled="validation" @click="createBlock">
      Create
    </MyButton>
  </div>
</template>

<script lang="ts">
import MyButton from '../../../common/MyButton.vue';
import MySelect from '../../../common/MySelect.vue';
import MyInput from '@/components/common/MyInput.vue';
import MyTextarea from '@/components/common/MyTextarea.vue';
import { defineComponent } from 'vue';
import type { Option } from '@/interfaces/Option';

export default defineComponent({
  name: 'CreateBlockForm',
  components: {
    MyButton,
    MySelect,
    MyInput,
    MyTextarea,
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
      urlError: '',
      textError: '',
      selected: 'text',
      options: [
        { name: 'text', value: 'TEXT' },
        { name: 'image', value: 'IMAGE' },
      ],
    };
  },
  computed: {
    validation(): boolean {
      return !!this.urlError && !!this.textError;
    },
  },
  methods: {
    urlValidation(): boolean {
      if (this.block.content.url === '') {
        this.urlError = 'Field is required';
        return false;
      }
      if (
        !this.block.content.url.match(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/
        )
      ) {
        this.urlError = 'That’s not a valid url';
        return false;
      }
      this.urlError = '';
      return true;
    },
    textValidation(): boolean {
      if (this.block.content.text === '') {
        this.textError = 'Field is required';
        return false;
      }
      this.textError = '';
      return true;
    },
    createBlock() {
      if (this.urlValidation() || this.textValidation()) {
        const {
          type,
          content: { text, url, subtext },
        } = this.block;
        const content =
          type === 'TEXT'
            ? { text, subtext: subtext === '' ? undefined : subtext }
            : { url, subtext: subtext === '' ? undefined : subtext };
        this.$emit('create', this.$props.slotId, { type, content });
      }
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
.field {
  margin: 10px 0 0;
}
.textarea,
.input {
  width: 100%;
}
.error {
  font-size: 10px;
  color: rgb(255, 107, 107);
}
.button {
  margin: 15px 0 0;
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
