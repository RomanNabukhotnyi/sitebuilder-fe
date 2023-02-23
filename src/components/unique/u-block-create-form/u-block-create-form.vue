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
      :is-loading="loadingCreateBlock"
      :is-disabled="!formValid || loadingCreateBlock"
      label="Create"
      class="button"
      @click="createBlock"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import type { Option } from '@/types/Option';
import type { ApiBlock } from '@/types/blocks/ApiBlock';

import CField from '@/components/common/c-field';
import CInput from '@/components/common/c-input';
import CSelect from '@/components/common/c-select';
import CButton from '@/components/common/c-button';
import CTextarea from '@/components/common/c-textarea';

import { useForm } from '@/use/form';
import { useValidators } from '@/use/validators';
import { useEventListener } from '@/use/use-event-listener';

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

<style lang="scss" src="./u-block-create-form.scss" />
