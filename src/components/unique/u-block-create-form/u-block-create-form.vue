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

<style lang="scss" src="./u-block-create-form.scss"/>
