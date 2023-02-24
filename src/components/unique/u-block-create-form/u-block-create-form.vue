<template>
    <div class="u-block-create-form">
        <h4>Create block</h4>
        <CSelect
            v-model="selected"
            :selected="'Type: ' + selected.toLowerCase()"
            :options="options"
            class="select"
            @select="selectOption"
        />
<!--        <UBlockCreateTextFields>-->
<!--        <UBlockCreateImageFields>-->
        <CField
            v-for="(item, index) in formOptionsList"
            :key="index"
            :errors="item.errors"
            class="field"
        >
            <component
                :is="item.component"
                v-if="selected === BLOCK_TYPES.TEXT"
                v-model="formText[item.field].value"
                :placeholder="item.placeholder"
                class="input"
            />
            <component
                :is="item.component"
                v-else-if="selected === BLOCK_TYPES.IMAGE"
                v-model="formImage[item.field].value"
                :placeholder="item.placeholder"
                class="input"
            />
        </CField>
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
import { ref, computed, watch, shallowRef } from 'vue';

import type { Option } from '@/types/Option';
import type { ApiBlock } from '@/types/blocks/ApiBlock';

import CInput from '@/components/common/c-input';
import CField from '@/components/common/c-field';
import CSelect from '@/components/common/c-select';
import CButton from '@/components/common/c-button';
import CTextarea from '@/components/common/c-textarea';

import { useForm } from '@/use/form';
import { useValidators } from '@/use/validators';
import { useEventListener } from '@/use/use-event-listener';

enum BLOCK_TYPES {
    IMAGE = 'IMAGE',
    TEXT = 'TEXT',
}

const TEXT_FORM_KEYS = [
    'text',
    'subtext',
    'title',
    'fontWeight',
    'fontSize',
    'color'
];

const IMAGE_FORM_KEYS = [
    'url',
    'subtext',
    'title',
    'alt',
    'width',
    'height'
];

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

const type = ref(BLOCK_TYPES.TEXT);

const selected = ref(BLOCK_TYPES.TEXT);

const options = [
    {
        name: 'text',
        value: BLOCK_TYPES.TEXT
    },
    {
        name: 'image',
        value: BLOCK_TYPES.IMAGE
    }
];

const formValid = computed(() =>
    type.value === BLOCK_TYPES.TEXT
        ? formText.valid
        : formImage.valid
);

const textFields = computed(() => {
    return TEXT_FORM_KEYS.map(key => {
        return {
            field: key,
            component: key === 'text' ? CTextarea : CInput,
            errors: formText[key].errors,
            placeholder: getPlaceholderFromKey(key)
        };
    });
});

const imageFields = computed(() => {
    return IMAGE_FORM_KEYS.map(key => {
        return {
            field: key,
            component: CInput,
            errors: formImage[key].errors,
            placeholder: getPlaceholderFromKey(key)
        };
    });
});

const formOptionsList = computed(() => {
    return selected.value === BLOCK_TYPES.TEXT
        ? textFields.value
        : imageFields.value;
});

function getPlaceholderFromKey(key: string) {
    return key.replace(/^[a-z]|[A-Z]/g, function (v, i) {
        return i === 0 ? v.toUpperCase() : ' ' + v.toLowerCase();
    });
}

function resetTextForm() {
    TEXT_FORM_KEYS.forEach(key => {
        formText[key].value = '';
    });
}

function resetImageForm() {
    IMAGE_FORM_KEYS.forEach(key => {
        formImage[key].value = '';
    });
}

windowEventListener('keyup', (event) => {
    if (event.code === 'Enter' && formValid.value) {
        createBlock();
    }
});

function removeEmpty(obj: object) {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null));
}

const createBlock = () => {
    const form = type.value === BLOCK_TYPES.TEXT ? formText : formImage;
    const content =
        type.value === BLOCK_TYPES.TEXT
            ? {
                text: form.text.value,
                subtext: form.subtext.value === '' ? undefined : form.subtext.value,
            }
            : {
                url: form.url.value,
                subtext: form.subtext.value === '' ? undefined : form.subtext.value,
            };
    const attributes =
        type.value === BLOCK_TYPES.TEXT
            ? {
                title: form.title.value === '' ? undefined : form.title.value,
            }
            : {
                title: form.title.value === '' ? undefined : form.title.value,
                alt: form.alt.value === '' ? undefined : form.alt.value,
            };
    const styles =
        type.value === BLOCK_TYPES.TEXT
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
    selected.value = option.value;
};

watch(selected, value => {
    if (value === BLOCK_TYPES.TEXT) {
        resetTextForm();
    } else {
        resetImageForm();
    }
});
</script>

<style lang="scss" src="./u-block-create-form.scss"/>
