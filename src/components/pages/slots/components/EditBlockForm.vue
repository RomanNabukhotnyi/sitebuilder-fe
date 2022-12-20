<template>
  <div class="form">
    <h4>Edit block</h4>
    <div v-if="block.type === 'TEXT'" class="field">
      <MyInput
        class="input"
        placeholder="Text"
        v-model="content.text"
        @input="textValidation"
      />
      <p v-if="textError" class="error">{{ textError }}</p>
    </div>
    <div v-else class="field">
      <MyInput
        class="input"
        placeholder="Url"
        v-model="content.url"
        @input="urlValidation"
      />
      <p v-if="urlError" class="error">{{ urlError }}</p>
    </div>
    <div class="field">
      <MyInput class="input" placeholder="Subtext" v-model="content.subtext" />
    </div>
    <MyButton class="button" :disabled="!validation" @click="editBlock">
      Edit
    </MyButton>
  </div>
</template>

<script lang="ts">
import MyButton from '../../../common/MyButton.vue';
import MyInput from '@/components/common/MyInput.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreateBlockForm',
  components: {
    MyButton,
    MyInput,
  },
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      content: Object.assign({}, this.block.content),
      urlError: '',
      textError: '',
    };
  },
  computed: {
    validation(): boolean {
      return (
        (this.block.type === 'TEXT' && this.textValidation()) ||
        (this.block.type === 'IMAGE' && this.urlValidation())
      );
    },
  },
  methods: {
    urlValidation(): boolean {
      if (this.block.content.url === '') {
        this.urlError = 'Field is required';
        return false;
      }
      if (
        this.block.content.url &&
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
    editBlock() {
      if (this.validation) {
        this.content.subtext =
          this.content.subtext === '' ? undefined : this.content.subtext;

        this.$emit(
          'editBlock',
          Object.assign(this.block, { content: this.content })
        );
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
.select,
.field {
  margin: 10px 0 0;
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
