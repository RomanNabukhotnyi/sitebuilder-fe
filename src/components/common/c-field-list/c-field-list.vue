<template>
    <div class="c-field-list">
        <CField
            v-for="field in fields"
            :key="field.key"
            :is-show-errors="isShowErrors"
            :errors="field.errors"
            :class="field.fieldClass ?? 'field'"
        >
            <component
                :is="field.component"
                v-model="field.value"
                :class="field.componentClass"
                :type="field.type"
                :placeholder="field.placeholder"
            />
        </CField>
    </div>
</template>

<script setup lang="ts">
import CField from '../../../components/common/c-field';

import type { FormFields } from '@/use/form';

interface IProps {
    fields: FormFields
    isShowErrors?: boolean
}

withDefaults(defineProps<IProps>(), {
    isShowErrors: false
});
</script>

<style lang="scss" src="./c-field-list.scss"/>
