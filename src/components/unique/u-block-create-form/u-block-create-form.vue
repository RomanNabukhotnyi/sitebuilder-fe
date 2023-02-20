<template>
  <div class="u-block-create-form">
    <h4>Create block</h4>
    <CSelect
      class="select"
      :selected="'Type: ' + selected"
      :options="options"
      @select="selectOption"
    />
    <div v-if="selected === 'text'">
      <div class="field">
        <CTextarea
          v-model="formText.text.value"
          v-focus
          class="textarea"
          placeholder="Text"
        />
        <p
          v-if="formText.text.errors.required"
          class="error"
        >
          Field is required
        </p>
      </div>
      <div class="field">
        <CInput
          v-model="formText.subtext.value"
          class="input"
          placeholder="Subtext"
        />
      </div>
      <div class="field">
        <CInput
          v-model="formText.title.value"
          class="input"
          placeholder="Title"
        />
      </div>
      <div class="field">
        <CInput
          v-model="formText.fontWeight.value"
          class="input"
          placeholder="Font Weight"
        />
        <div
          v-if="formText.fontWeight.value.length !== 0"
          class="error"
        >
          <p
            v-if="formText.fontWeight.errors.cssWeight"
            class="error"
          >
            Font weight is incorrect
          </p>
        </div>
      </div>
      <div class="field">
        <CInput
          v-model="formText.fontSize.value"
          class="input"
          placeholder="Font Size"
        />
        <div
          v-if="formText.fontSize.value.length !== 0"
          class="error"
        >
          <p
            v-if="formText.fontSize.errors.cssFontSize"
            class="error"
          >
            Font size is incorrect
          </p>
        </div>
      </div>
      <div class="field">
        <CInput
          v-model="formText.color.value"
          class="input"
          placeholder="Color"
        />
        <div
          v-if="formText.color.value.length !== 0"
          class="error"
        >
          <p
            v-if="formText.color.errors.cssColor"
            class="error"
          >
            Color is incorrect
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="field">
        <CInput
          v-model="formImage.url.value"
          v-focus
          class="input"
          placeholder="Url"
        />
        <p
          v-if="formImage.url.errors.required"
          class="error"
        >
          Field is required
        </p>
        <div v-if="!formImage.url.errors.required">
          <p
            v-if="formImage.url.errors.url"
            class="error"
          >
            That’s not a valid url
          </p>
        </div>
      </div>
      <div class="field">
        <CInput
          v-model="formImage.subtext.value"
          class="input"
          placeholder="Subtext"
        />
      </div>
      <div class="field">
        <CInput
          v-model="formImage.title.value"
          class="input"
          placeholder="Title"
        />
      </div>
      <div class="field">
        <CInput
          v-model="formImage.alt.value"
          class="input"
          placeholder="Alt"
        />
      </div>
      <div class="field">
        <CInput
          v-model="formImage.width.value"
          class="input"
          placeholder="Width"
        />
        <div
          v-if="formImage.width.value.length !== 0"
          class="error"
        >
          <p
            v-if="formImage.width.errors.cssWidthOrHeight"
            class="error"
          >
            Width is incorrect
          </p>
        </div>
      </div>
      <div class="field">
        <CInput
          v-model="formImage.height.value"
          class="input"
          placeholder="Height"
        />
        <div
          v-if="formImage.height.value.length !== 0"
          class="error"
        >
          <p
            v-if="formImage.height.errors.cssWidthOrHeight"
            class="error"
          >
            Height is incorrect
          </p>
        </div>
      </div>
    </div>
    <CButton
      class="button"
      :disabled="!formValid || loadingCreateBlock"
      @click="createBlock"
    >
      <p v-if="!loadingCreateBlock">
        Create
      </p>
      <div
        v-else
        class="loadingio-spinner-ellipsis-yg3d79y87xd"
      >
        <div class="ldio-bzxhjz25vr">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </CButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import type { Option } from '@/types/Option';
import type { ApiBlock } from '@/types/blocks/ApiBlock';

import CButton from '@/components/common/c-button';
import CInput from '@/components/common/c-input';
import CSelect from '@/components/common/c-select';
import CTextarea from '@/components/common/c-textarea';

import { useValidators } from '@/use/validators';
import { useEventListener } from '@/use/use-event-listener';
import { useForm } from '@/use/form';
const props = defineProps<{
  slotId: number;
  loadingCreateBlock: boolean;
}>();
const { windowEventListener } = useEventListener();
const emit = defineEmits<{
  (e: 'createBlock', slotId: number, value: ApiBlock): void;
}>();
const {
  required,
  url,
  cssWeight,
  cssFontSize,
  cssColor,
  cssWidthOrHeight,
  optional,
} = useValidators();
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
  title: {
    value: '',
  },
  fontWeight: {
    value: '',
    validators: {
      optional,
      cssWeight,
    },
  },
  fontSize: {
    value: '',
    validators: {
      optional,
      cssFontSize,
    },
  },
  color: {
    value: '',
    validators: {
      optional,
      cssColor,
    },
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
  title: {
    value: '',
  },
  alt: {
    value: '',
  },
  width: {
    value: '',
    validators: {
      optional,
      cssWidthOrHeight,
    },
  },
  height: {
    value: '',
    validators: {
      optional,
      cssWidthOrHeight,
    },
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
windowEventListener('keyup', (event) => {
  if (event.code === 'Enter' && formValid.value) {
    createBlock();
  }
});
function removeEmpty(obj: object) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null));
}
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
  const attributes =
    type.value === 'TEXT'
      ? {
          title: form.title.value === '' ? undefined : form.title.value,
        }
      : {
          title: form.title.value === '' ? undefined : form.title.value,
          alt: form.alt.value === '' ? undefined : form.alt.value,
        };
  const styles =
    type.value === 'TEXT'
      ? {
          fontWeight:
            form.fontWeight.value === '' ? undefined : form.fontWeight.value,
          fontSize:
            form.fontSize.value === '' ? undefined : form.fontSize.value,
          color: form.color.value === '' ? undefined : form.color.value,
        }
      : {
          width: form.width.value === '' ? undefined : form.width.value,
          height: form.height.value === '' ? undefined : form.height.value,
        };
  emit('createBlock', props.slotId, {
    type: type.value,
    content,
    attributes: !Object.keys(removeEmpty(attributes)).length
      ? undefined
      : attributes,
    styles: !Object.keys(removeEmpty(styles)).length ? undefined : styles,
  } as unknown as ApiBlock);
};
const selectOption = (option: Option) => {
  type.value = option.value;
  selected.value = option.name;
};
</script>

<style lang="scss">
.u-block-create-form {
  display: flex;
  flex-direction: column;

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

    &:disabled {
      background-color: #a9b5c2;

      &:hover {
        opacity: 1;
        cursor: default;
      }
    }
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

    div {
      box-sizing: content-box;
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      transform: translate(8px, 8px) scale(1);
      background: white;
      animation: ldio-bzxhjz25vr 1s infinite cubic-bezier(0, 0.5, 0.5, 1);

      &:nth-child(1) {
        transform: translate(14.8px, 8px) scale(1);
        animation: ldio-bzxhjz25vr-r 0.25s infinite cubic-bezier(0, 0.5, 0.5, 1);
      }
      &:nth-child(2) {
        animation-delay: -0.25s;
      }
      &:nth-child(3) {
        animation-delay: -0.5s;
      }
      &:nth-child(4) {
        animation-delay: -0.75s;
      }
      &:nth-child(5) {
        animation-delay: -1s;
      }
    }
  }
}
</style>
