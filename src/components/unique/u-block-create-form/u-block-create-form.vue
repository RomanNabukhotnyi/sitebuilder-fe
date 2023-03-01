<template>
  <div class="u-block-create-form">
    <h4>Create block</h4>
    <CSelect
      v-model="selectedType"
      class="select"
      :selected="'Type: ' + selectedType"
      :options="options"
    />
    <div v-if="selectedType === BLOCK_TYPES.TEXT">
      <CFieldList :fields="formText.getFields()" />
    </div>
    <div v-else-if="selectedType === BLOCK_TYPES.IMAGE">
      <CFieldList :fields="formImage.getFields()" />
    </div>
    <CButton
      :is-loading="loadingCreateBlock"
      :is-disabled="!formValid || loadingCreateBlock"
      label="Create"
      class="button"
      @click="createBlock"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

import type { ApiBlock } from '@/types/blocks/ApiBlock';

import CSelect from '@/components/common/c-select';
import CButton from '@/components/common/c-button';
import CTextarea from '@/components/common/c-textarea';
import CFieldList from '@/components/common/c-field-list';

import { useForm } from '@/use/form';
import { useValidators } from '@/use/validators';
import { useEventListener } from '@/use/use-event-listener';

import { BLOCK_TYPES } from '@/constants/block-types';

const props = defineProps<{
  slotId: number;
  loadingCreateBlock: boolean;
}>();

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
const { windowEventListener } = useEventListener();
const formText = useForm({
  text: {
    placeholder: 'Text',
    component: CTextarea,
    validators: {
      required,
    },
  },
  subtext: {
    placeholder: 'Subtext',
  },
  title: {
    placeholder: 'Title',
  },
  fontWeight: {
    placeholder: 'Font weight',
    validators: {
      optional,
      cssWeight,
    },
  },
  fontSize: {
    placeholder: 'Font size',
    validators: {
      optional,
      cssFontSize,
    },
  },
  color: {
    placeholder: 'Color',
    validators: {
      optional,
      cssColor,
    },
  },
});
const formImage = useForm({
  url: {
    placeholder: 'Url',
    validators: {
      required,
      url,
    },
  },
  subtext: {
    placeholder: 'Subtext',
  },
  title: {
    placeholder: 'Title',
  },
  alt: {
    placeholder: 'Alt',
  },
  width: {
    placeholder: 'Width',
    validators: {
      optional,
      cssWidthOrHeight,
    },
  },
  height: {
    placeholder: 'Height',
    validators: {
      optional,
      cssWidthOrHeight,
    },
  },
});
const selectedType = ref(BLOCK_TYPES.TEXT);
const options = [
  { name: 'text', value: BLOCK_TYPES.TEXT },
  { name: 'image', value: BLOCK_TYPES.IMAGE },
];
const formValid = computed(() =>
  selectedType.value === BLOCK_TYPES.TEXT ? formText.valid : formImage.valid
);

function removeEmpty(obj: object) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null));
}
const createBlock = () => {
  const form = selectedType.value === BLOCK_TYPES.TEXT ? formText : formImage;
  const content =
    selectedType.value === BLOCK_TYPES.TEXT
      ? {
          text: form.text.value,
          subtext: form.subtext.value === '' ? undefined : form.subtext.value,
        }
      : {
          url: form.url.value,
          subtext: form.subtext.value === '' ? undefined : form.subtext.value,
        };
  const attributes =
    selectedType.value === BLOCK_TYPES.TEXT
      ? {
          title: form.title.value === '' ? undefined : form.title.value,
        }
      : {
          title: form.title.value === '' ? undefined : form.title.value,
          alt: form.alt.value === '' ? undefined : form.alt.value,
        };
  const styles =
    selectedType.value === BLOCK_TYPES.TEXT
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
    type: selectedType.value,
    content,
    attributes: !Object.keys(removeEmpty(attributes)).length
      ? undefined
      : attributes,
    styles: !Object.keys(removeEmpty(styles)).length ? undefined : styles,
  } as unknown as ApiBlock);
};

watch(selectedType, () => {
  if (selectedType.value === BLOCK_TYPES.TEXT) {
    formText.reset();
  } else {
    formImage.reset();
  }
});

windowEventListener('keyup', (event) => {
  if (event.code === 'Enter' && formValid.value) {
    createBlock();
  }
});
</script>

<style lang="scss" src="./u-block-create-form.scss" />
