<template>
    <div class="c-fields-form-list">
        <template v-if="!optionsList.length">
            fields list empty
        </template>
        <template v-else>

        </template>
    </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

interface IOptionsListItem {
    key: string,
    model: any,
    component: Component,
    errors: Array<any> | null,
    placeholder: string
}

type TOptionsList = Array<IOptionsListItem>

interface IProps {
    optionsList?: TOptionsList;
}

import CField from '@/components/common/c-field';

withDefaults(defineProps<IProps>(), {
    optionsList: () => [],
});
</script>

<style lang="scss" src="./c-fields-form-list.scss" />
