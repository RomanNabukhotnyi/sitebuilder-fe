<template>
    <button
        :type="type"
        :disabled="isDisabled"
        class="c-button"
    >
        <template v-if="!isLoading">
            {{ label }}
        </template>
        <CLoader v-else/>
    </button>
</template>

<script setup lang="ts">
import CLoader from '../c-loader';

interface IProps {
    type?: 'button' | 'submit' | 'reset';
    label?: string;
    isDisabled?: boolean;
    isLoading?: boolean;
}

withDefaults(defineProps<IProps>(), {
    type: 'button',
    label: '',
    isDisabled: false,
    isLoading: false
});
</script>

<style lang="scss" src="./c-button.scss"/>
