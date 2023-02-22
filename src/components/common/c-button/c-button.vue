<template>
    <button
        :disabled="isDisabled"
        class="c-button"
    >
        <template v-if="!isLoading">
            {{ label }}
        </template>
        <CLoader v-else />
    </button>
</template>

<script lang="ts" setup>
interface IProps {
    label?: '';
    isDisabled?: boolean;
    isLoading?: boolean;
}

import CLoader from '@/components/common/c-loader';

const props = withDefaults(defineProps<IProps>(), {
    label: '',
    isDisabled: false,
    isLoading: false
});
</script>

<style lang="scss" src="./c-button.scss"/>
