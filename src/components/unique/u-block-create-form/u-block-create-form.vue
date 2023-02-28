<template>
    <form
        class="u-block-create-form"
        @submit.prevent="createBlock"
    >
        <h4>Create block</h4>
        <CSelect
            v-model="selectedType"
            class="select"
            :selected="'Type: ' + selectedType"
            :options="options"
        />
        <div v-if="selectedType === BLOCK_TYPES.TEXT">
            <CFieldList
                v-model:fields="formFieldsText"
                :is-show-errors="isSubmitted"
            />
        </div>
        <div v-else-if="selectedType === BLOCK_TYPES.IMAGE">
            <CFieldList
                v-model:fields="formFieldsImage"
                :is-show-errors="isSubmitted"
            />
        </div>
        <CButton
            :is-loading="loadingCreateBlock"
            :is-disabled="loadingCreateBlock"
            label="Create"
            type="submit"
            class="button"
        />
    </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

import type { ApiBlock } from '@/types/blocks/ApiBlock';

import CSelect from '@/components/common/c-select';
import CButton from '@/components/common/c-button';
import CFieldList from '@/components/common/c-field-list';

import { BLOCK_TYPES } from '@/constants/block-types';
import useFormText from '@/components/unique/u-block-create-form/use/useFormText';
import useFormImage from '@/components/unique/u-block-create-form/use/useFormImage';

const props = defineProps<{
    slotId: number;
    loadingCreateBlock: boolean;
}>();

const emit = defineEmits<{
    (e: 'createBlock', slotId: number, value: ApiBlock): void;
}>();

const {
    isFormFieldsTextValid,
    formFieldsText,
    resetFormFieldsText
} = useFormText();
const {
    isFormFieldsImageValid,
    formFieldsImage,
    resetFormFieldsImage
} = useFormImage();

const isSubmitted = ref(false);
const selectedType = ref(BLOCK_TYPES.TEXT);

const options = [
    { name: 'text', value: BLOCK_TYPES.TEXT },
    { name: 'image', value: BLOCK_TYPES.IMAGE },
];

const formValid = computed(() => {
        return selectedType.value === BLOCK_TYPES.TEXT
            ? isFormFieldsTextValid.value
            : isFormFieldsImageValid.value;
    }
);

function removeEmpty(obj: object) {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null));
}

const getTextBlockData = () => {
    const content = {
        text: formFieldsText.text.value,
        subtext: formFieldsText.subtext.value.value,
    };

    const attributes = {
        title: formFieldsText.title.value.value,
    };

    const styles = {
        fontWeight: formFieldsText.fontWeight.value.value,
        fontSize: formFieldsText.fontSize.value.value,
        color: formFieldsText.color.value.value,
    };

    return {
        content,
        attributes,
        styles
    };
};

const getImageBlockData = () => {
    const content = {
        url: formFieldsImage.url.value,
        subtext: formFieldsImage.subtext.value.value,
    };

    const attributes = {
        title: formFieldsImage.title.value.value,
        alt: formFieldsImage.alt.value.value,
    };

    const styles = {
        width: formFieldsImage.width.value.value,
        height: formFieldsImage.height.value.value,
    };

    return {
        content,
        attributes,
        styles
    };
};

const createBlock = () => {
    isSubmitted.value = true;

    console.log('formValid.value: ', formValid.value);
    if (!formValid.value) return;

    const {
        content,
        attributes,
        styles
    } = selectedType.value === BLOCK_TYPES.TEXT ? getTextBlockData() : getImageBlockData();

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
        resetFormFieldsText();
    } else {
        resetFormFieldsImage()
    }
});
</script>

<style lang="scss" src="./u-block-create-form.scss"/>
