<template>
  <div class="c-field-list">
    <CField
      v-for="(field, name, index) in fields"
      :key="field.key"
      :errors="field.errors"
      :is-show-errors="isShowErrors"
      :class="field.fieldClass ?? 'field'"
    >
      <component
        :is="field.component"
        v-model="field.value"
        v-focus="index === 0"
        :class="field.componentClass"
        :type="field.type"
        :placeholder="field.placeholder"
      />
    </CField>
  </div>
</template>

<script setup lang="ts">
import type { Field } from '@/types/fields/Field';

import CField from '../c-field';

interface IProps {
  fields: Record<string, Field>;
  isShowErrors?: boolean;
}

withDefaults(defineProps<IProps>(), {
  isShowErrors: false,
});
</script>

<style lang="scss" src="./c-field-list.scss" />