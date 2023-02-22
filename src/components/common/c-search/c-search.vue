<template>
    <div class="c-search">
        <CIconSearch class="search__icon" />
        <CInput
            v-model="localValue"
            class="search__input"
            placeholder="Filter by name"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import CInput from '@/components/common/c-input';
import CIconSearch from '@/components/common/c-icon-search/c-icon-search.vue';

interface IProps {
    modelValue: string;
    placeholder?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    modelValue: '',
    placeholder: ''
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const localValue = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>

<style lang="scss" src="./c-search.scss"/>
