<template>
  <div class="form">
    <h4>Edit block</h4>
    <div v-if="block.type === 'TEXT'" class="field">
      <MyTextarea
        class="textarea"
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
    <MyButton
      class="button"
      :disabled="!validation || loadingEditBlock"
      @click="editBlock"
    >
      <p v-if="!loadingEditBlock">Edit</p>
      <div v-else class="loadingio-spinner-ellipsis-yg3d79y87xd">
        <div class="ldio-bzxhjz25vr">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </MyButton>
  </div>
</template>

<script lang="ts">
import MyButton from '../../../common/MyButton.vue';
import MyInput from '@/components/common/MyInput.vue';
import MyTextarea from '@/components/common/MyTextarea.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreateBlockForm',
  components: {
    MyButton,
    MyInput,
    MyTextarea,
  },
  props: {
    slotId: {
      type: Number,
      required: true,
    },
    block: {
      type: Object,
      required: true,
    },
    loadingEditBlock: {
      type: Boolean,
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
  created() {
    window.addEventListener('keyup', (event) => {
      if (event.code === 'Enter') {
        this.editBlock();
      }
    });
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
          this.slotId,
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
  width: 50%;
}
.button:disabled {
  background-color: #a9b5c2;
}
.button:disabled:hover {
  opacity: 1;
  cursor: default;
}
/* loading */
@keyframes ldio-bzxhjz25vr {
  0% {
    transform: translate(1.2px, 8px) scale(0);
  }
  25% {
    transform: translate(1.2px, 8px) scale(0);
  }
  50% {
    transform: translate(1.2px, 8px) scale(1);
  }
  75% {
    transform: translate(8px, 8px) scale(1);
  }
  100% {
    transform: translate(14.8px, 8px) scale(1);
  }
}
@keyframes ldio-bzxhjz25vr-r {
  0% {
    transform: translate(14.8px, 8px) scale(1);
  }
  100% {
    transform: translate(14.8px, 8px) scale(0);
  }
}
.ldio-bzxhjz25vr div {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  transform: translate(8px, 8px) scale(1);
  background: white;
  animation: ldio-bzxhjz25vr 1s infinite cubic-bezier(0, 0.5, 0.5, 1);
}
.ldio-bzxhjz25vr div:nth-child(1) {
  transform: translate(14.8px, 8px) scale(1);
  animation: ldio-bzxhjz25vr-r 0.25s infinite cubic-bezier(0, 0.5, 0.5, 1);
}
.ldio-bzxhjz25vr div:nth-child(2) {
  animation-delay: -0.25s;
}
.ldio-bzxhjz25vr div:nth-child(3) {
  animation-delay: -0.5s;
}
.ldio-bzxhjz25vr div:nth-child(4) {
  animation-delay: -0.75s;
}
.ldio-bzxhjz25vr div:nth-child(5) {
  animation-delay: -1s;
}
.loadingio-spinner-ellipsis-yg3d79y87xd {
  width: 20px;
  height: 20px;
  display: inline-block;
}
.ldio-bzxhjz25vr {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}
.ldio-bzxhjz25vr div {
  box-sizing: content-box;
}
</style>
