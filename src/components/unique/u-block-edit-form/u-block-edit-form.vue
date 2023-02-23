<template>
  <div class="u-block-edit-form">
    <h4>Edit block</h4>
    <div v-if="block.type === 'TEXT'">
      <CField
        :errors="formText.text.errors"
        class="field"
      >
        <CTextarea
          v-model="formText.text.value"
          v-focus
          class="textarea"
          placeholder="Text"
        />
      </CField>
      <CField
        :errors="formText.subtext.errors"
        class="field"
      >
        <CInput
          v-model="formText.subtext.value"
          class="input"
          placeholder="Subtext"
        />
      </CField>
      <CField
        :errors="formText.title.errors"
        class="field"
      >
        <CInput
          v-model="formText.title.value"
          class="input"
          placeholder="Title"
        />
      </CField>
      <CField
        :errors="formText.fontWeight.errors"
        class="field"
      >
        <CInput
          v-model="formText.fontWeight.value"
          class="input"
          placeholder="Font Weight"
        />
      </CField>
      <CField
        :errors="formText.fontSize.errors"
        class="field"
      >
        <CInput
          v-model="formText.fontSize.value"
          class="input"
          placeholder="Font Size"
        />
      </CField>
      <CField
        :errors="formText.color.errors"
        class="field"
      >
        <CInput
          v-model="formText.color.value"
          class="input"
          placeholder="Color"
        />
      </CField>
    </div>
    <div v-else>
      <CField
        :errors="formImage.url.errors"
        class="field"
      >
        <CInput
          v-model="formImage.url.value"
          v-focus
          class="input"
          placeholder="Url"
        />
      </CField>
      <CField
        :errors="formImage.subtext.errors"
        class="field"
      >
        <CInput
          v-model="formImage.subtext.value"
          class="input"
          placeholder="Subtext"
        />
      </CField>
      <CField
        :errors="formImage.title.errors"
        class="field"
      >
        <CInput
          v-model="formImage.title.value"
          class="input"
          placeholder="Title"
        />
      </CField>
      <CField
        :errors="formImage.alt.errors"
        class="field"
      >
        <CInput
          v-model="formImage.alt.value"
          class="input"
          placeholder="Alt"
        />
      </CField>
      <CField
        :errors="formImage.width.errors"
        class="field"
      >
        <CInput
          v-model="formImage.width.value"
          class="input"
          placeholder="Width"
        />
      </CField>
      <CField
        :errors="formImage.height.errors"
        class="field"
      >
        <CInput
          v-model="formImage.height.value"
          class="input"
          placeholder="Height"
        />
      </CField>
    </div>
    <CButton
      :is-loading="loadingEditBlock"
      :is-disabled="!formValid || loadingEditBlock"
      label="Edit"
      class="button"
      @click="editBlock"
    />
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

import CField from '@/components/common/c-field';
import CInput from '@/components/common/c-input';
import CButton from '@/components/common/c-button';
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
console.log(props.block.content);
const formText = useForm({
  text: {
    value:
      props.block.type === 'TEXT'
        ? (props.block.content as TextContent).text
        : '',
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
console.log(props.block);
const formImage = useForm({
  url: {
    value:
      props.block.type === 'IMAGE'
        ? (props.block.content as ImageContent).url
        : '',
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

<style lang="scss" src="./u-block-edit-form.scss" />
