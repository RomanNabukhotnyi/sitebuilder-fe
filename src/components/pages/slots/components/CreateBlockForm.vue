<template>
  <div class="form">
    <h4>Create block</h4>
    <MySelect
      class="select"
      :selected="'Type: ' + selected"
      :options="options"
      @select="selectOption"
    />
    <div v-if="selected === 'text'">
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
      :disabled="!formValid || loadingCreateBlock"
      @click="createBlock"
    >
      <p v-if="!loadingCreateBlock">Create</p>
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
import { ref, computed } from 'vue';
import MyButton from '../../../common/MyButton.vue';
import MySelect from '../../../common/MySelect.vue';
import MyInput from '@/components/common/MyInput.vue';
import MyTextarea from '@/components/common/MyTextarea.vue';
import type { Option } from '@/interfaces/Option';
import { useValidators } from '@/use/validators';
import { useEventListener } from '@/use/eventListener';
import { useForm } from '@/use/form';
const props = defineProps<{
  slotId: number;
  loadingCreateBlock: boolean;
}>();
const emit = defineEmits<{
  (e: 'createBlock', slotId: number, value: any): void;
}>();
const { required, url } = useValidators();
const formText = useForm({
  text: {
    value: '',
    validators: {
      required,
    },
  },
  subtext: {
    value: '',
  },
});
const formImage = useForm({
  url: {
    value: '',
    validators: {
      required,
      url,
    },
  },
  subtext: {
    value: '',
  },
});
const type = ref('TEXT');
const selected = ref('text');
const options = [
  { name: 'text', value: 'TEXT' },
  { name: 'image', value: 'IMAGE' },
];
const formValid = computed(() =>
  type.value === 'TEXT' ? formText.valid : formImage.valid
);
useEventListener(window, 'keyup', (event) => {
  if (event.code === 'Enter' && formValid.value) {
    createBlock();
  }
});
const createBlock = () => {
  const form = type.value === 'TEXT' ? formText : formImage;
  const content =
    type.value === 'TEXT'
      ? {
          text: form.text.value,
          subtext: form.subtext.value === '' ? undefined : form.subtext.value,
        }
      : {
          url: form.url.value,
          subtext: form.subtext.value === '' ? undefined : form.subtext.value,
        };
  emit('createBlock', props.slotId, { type: type.value, content });
};
const selectOption = (option: Option) => {
  type.value = option.value;
  selected.value = option.name;
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
