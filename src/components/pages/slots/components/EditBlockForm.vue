<template>
  <div class="form">
    <h4>Edit block</h4>
    <div v-if="block.type === 'TEXT'">
      <div class="field">
        <MyTextarea
          v-focus
          class="textarea"
          placeholder="Text"
          v-model="formText.text.value"
        />
        <div v-if="!formText.text.errors.required"></div>
      </div>
      <div class="field">
        <MyInput
          class="input"
          placeholder="Subtext"
          v-model="formText.subtext.value"
        />
      </div>
    </div>
    <div v-else>
      <div class="field">
        <MyInput
          v-focus
          class="input"
          placeholder="Url"
          v-model="formImage.url.value"
        />
        <div v-if="!formImage.url.errors.required">
          <p v-if="formImage.url.errors.url" class="error">
            That’s not a valid url
          </p>
        </div>
      </div>
      <div class="field">
        <MyInput
          class="input"
          placeholder="Subtext"
          v-model="formImage.subtext.value"
        />
      </div>
    </div>
    <MyButton
      class="button"
      :disabled="!formValid || loadingEditBlock"
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

<script setup lang="ts">
import MyButton from '../../../common/MyButton.vue';
import MyInput from '@/components/common/MyInput.vue';
import MyTextarea from '@/components/common/MyTextarea.vue';
import { computed } from 'vue';
import type { Block } from '@/interfaces/Block';
import { useValidators } from '@/use/validators';
import { useForm } from '@/use/form';
const props = defineProps<{
  slotId: number;
  block: Block;
  loadingEditBlock: boolean;
}>();
const emit = defineEmits<{
  (
    e: 'editBlock',
    slotId: number,
    block: Pick<Block, 'id' | 'type' | 'content'>
  ): void;
}>();
const { required, url } = useValidators();
const formText = useForm({
  text: {
    value: props.block.type === 'TEXT' ? props.block.content.text : '',
    validators: {
      required,
    },
  },
  subtext: {
    value: props.block.content.subtext ?? '',
  },
});
const formImage = useForm({
  url: {
    value: props.block.type === 'IMAGE' ? props.block.content.url : '',
    validators: {
      required,
      url,
    },
  },
  subtext: {
    value: props.block.content.subtext ?? '',
  },
});
const formValid = computed(() =>
  props.block.type === 'TEXT' ? formText.valid : formImage.valid
);
window.addEventListener('keyup', (event) => {
  if (event.code === 'Enter' && formValid.value) {
    editBlock();
  }
});
const editBlock = () => {
  const form = props.block.type === 'TEXT' ? formText : formImage;
  const content: any =
    props.block.type === 'TEXT'
      ? {
          text: form.text.value,
          subtext: form.subtext.value === '' ? undefined : form.subtext.value,
        }
      : {
          url: form.url.value,
          subtext: form.subtext.value === '' ? undefined : form.subtext.value,
        };
  emit('editBlock', props.slotId, {
    id: props.block.id,
    type: props.block.type,
    content,
  });
};
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
