<template>
  <div class="form">
    <h4>Edit block</h4>
    <div v-if="block.type === 'TEXT'">
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
      :disabled="!formValid || loadingEditBlock"
      @click="editBlock"
    >
      <p v-if="!loadingEditBlock">
        Edit
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
import { computed } from 'vue';

import type { ApiBlock } from '@/types/blocks/ApiBlock';
import type { TextStyles } from '@/types/blocks/TextStyles';
import type { ImageContent } from '@/types/blocks/ImageContent';
import type { ImageAttributes } from '@/types/blocks/ImageAttributes';
import type { ImageStyles } from '@/types/blocks/ImageStyles';
import type { TextContent } from '@/types/blocks/TextContent';
import type { ApiUpdateBlock } from '@/types/blocks/ApiUpdateBlock';

import CButton from '@/components/common/c-button';
import CInput from '@/components/common/c-input';
import CTextarea from '@/components/common/c-textarea';

import { useValidators } from '@/use/validators';
import { useEventListener } from '@/use/use-event-listener';
import { useForm } from '@/use/form';

const props = defineProps<{
  slotId: number;
  block: ApiBlock;
  loadingEditBlock: boolean;
}>();

const emit = defineEmits<{
  (
    e: 'editBlock',
    slotId: number,
    blockId: number,
    block: ApiUpdateBlock
    ): void;
  }>();

const { windowEventListener } = useEventListener();
const {
  required,
  url,
  cssWeight,
  cssFontSize,
  cssColor,
  cssWidthOrHeight,
  optional,
} = useValidators();
console.log(props.block.content)
const formText = useForm({
  text: {
    value: props.block.type === 'TEXT' ? (props.block.content as TextContent).text : '',
    validators: {
      required,
    },
  },
  subtext: {
    value: props.block.content.subtext ?? '',
  },
  title: {
    value: props.block.attributes?.title ?? '',
  },
  fontWeight: {
    value: (props.block.styles as TextStyles)?.fontWeight ?? '',
    validators: {
      optional,
      cssWeight,
    },
  },
  fontSize: {
    value: (props.block.styles as TextStyles)?.fontSize ?? '',
    validators: {
      optional,
      cssFontSize,
    },
  },
  color: {
    value: (props.block.styles as TextStyles)?.color ?? '',
    validators: {
      optional,
      cssColor,
    },
  },
});
console.log(props.block)
const formImage = useForm({
  url: {
    value: props.block.type === 'IMAGE' ? (props.block.content as ImageContent).url : '',
    validators: {
      required,
      url,
    },
  },
  subtext: {
    value: props.block.content.subtext ?? '',
  },
  title: {
    value: props.block.attributes?.title ?? '',
  },
  alt: {
    value: (props.block.attributes as ImageAttributes)?.alt ?? '',
  },
  width: {
    value: (props.block.styles as ImageStyles)?.width ?? '',
    validators: {
      optional,
      cssWidthOrHeight,
    },
  },
  height: {
    value: (props.block.styles as ImageStyles)?.height ?? '',
    validators: {
      optional,
      cssWidthOrHeight,
    },
  },
});
const formValid = computed(() =>
  props.block.type === 'TEXT' ? formText.valid : formImage.valid
);

function removeEmpty(obj: object) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null));
}
const editBlock = () => {
  const form = props.block.type === 'TEXT' ? formText : formImage;
  const content: unknown =
    props.block.type === 'TEXT'
      ? {
          text: form.text.value,
          subtext: form.subtext.value === '' ? undefined : form.subtext.value,
        }
      : {
          url: form.url.value,
          subtext: form.subtext.value === '' ? undefined : form.subtext.value,
        };
  const attributes =
    props.block.type === 'TEXT'
      ? {
          title: form.title.value === '' ? undefined : form.title.value,
        }
      : {
          title: form.title.value === '' ? undefined : form.title.value,
          alt: form.alt.value === '' ? undefined : form.alt.value,
        };
  const styles: any =
    props.block.type === 'TEXT'
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
  emit('editBlock', props.slotId, props.block.id, {
    type: props.block.type,
    content: content as never,
    attributes: !Object.keys(removeEmpty(attributes)).length
      ? undefined
      : attributes,
    styles: !Object.keys(removeEmpty(styles)).length ? undefined : styles,
  });
};

windowEventListener('keyup', (event) => {
  if (event.code === 'Enter' && formValid.value) {
    editBlock();
  }
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
