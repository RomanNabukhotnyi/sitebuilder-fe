<template>
  <div class="u-block-edit-form">
    <h4>Edit block</h4>
    <div v-if="block.type === BLOCK_TYPES.TEXT">
      <CFieldList :fields="formText.getFields()" />
    </div>
    <div v-else-if="block.type === BLOCK_TYPES.IMAGE">
      <CFieldList :fields="formImage.getFields()" />
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

import CButton from '@/components/common/c-button';
import CTextarea from '@/components/common/c-textarea';
import CFieldList from '@/components/common/c-field-list';

import { useValidators } from '@/use/validators';
import { useEventListener } from '@/use/use-event-listener';
import { useForm } from '@/use/form';

import { BLOCK_TYPES } from '@/constants/block-types';

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
const formText = useForm({
  text: {
    value:
      props.block.type === BLOCK_TYPES.TEXT
        ? (props.block.content as TextContent).text
        : '',
    placeholder: 'Text',
    component: CTextarea,
    validators: {
      required,
    },
  },
  subtext: {
    value: props.block.content.subtext,
    placeholder: 'Subtext',
  },
  title: {
    value: props.block.attributes?.title,
    placeholder: 'Title',
  },
  fontWeight: {
    value: (props.block.styles as TextStyles)?.fontWeight,
    placeholder: 'Font weight',
    validators: {
      optional,
      cssWeight,
    },
  },
  fontSize: {
    value: (props.block.styles as TextStyles)?.fontSize,
    placeholder: 'Font size',
    validators: {
      optional,
      cssFontSize,
    },
  },
  color: {
    value: (props.block.styles as TextStyles)?.color,
    placeholder: 'Color',
    validators: {
      optional,
      cssColor,
    },
  },
});
const formImage = useForm({
  url: {
    value:
      props.block.type === BLOCK_TYPES.IMAGE
        ? (props.block.content as ImageContent).url
        : '',
    placeholder: 'Url',
    validators: {
      required,
      url,
    },
  },
  subtext: {
    value: props.block.content.subtext,
    placeholder: 'Subtext',
  },
  title: {
    value: props.block.attributes?.title,
    placeholder: 'Title',
  },
  alt: {
    value: (props.block.attributes as ImageAttributes)?.alt,
    placeholder: 'Alt',
  },
  width: {
    value: (props.block.styles as ImageStyles)?.width,
    placeholder: 'Width',
    validators: {
      optional,
      cssWidthOrHeight,
    },
  },
  height: {
    value: (props.block.styles as ImageStyles)?.height,
    placeholder: 'Height',
    validators: {
      optional,
      cssWidthOrHeight,
    },
  },
});

const formValid = computed(() =>
  props.block.type === BLOCK_TYPES.TEXT ? formText.valid : formImage.valid
);

function removeEmpty(obj: object) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null));
}
const editBlock = () => {
  const form = props.block.type === BLOCK_TYPES.TEXT ? formText : formImage;
  const content: unknown =
    props.block.type === BLOCK_TYPES.TEXT
      ? {
          text: form.text.value,
          subtext: form.subtext.value === '' ? undefined : form.subtext.value,
        }
      : {
          url: form.url.value,
          subtext: form.subtext.value === '' ? undefined : form.subtext.value,
        };
  const attributes =
    props.block.type === BLOCK_TYPES.TEXT
      ? {
          title: form.title.value === '' ? undefined : form.title.value,
        }
      : {
          title: form.title.value === '' ? undefined : form.title.value,
          alt: form.alt.value === '' ? undefined : form.alt.value,
        };
  const styles: any =
    props.block.type === BLOCK_TYPES.TEXT
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
