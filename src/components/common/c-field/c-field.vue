<template>
  <div class="c-field">
    <slot />
    <div v-if="isErrorsExist">
      <p class="field__error">
        {{ errors[0].message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ValidatorResult } from '@/types/ValidatorResult';

import { computed } from 'vue';

interface IProps {
  errors?: Omit<ValidatorResult, 'isValid'>[] | null;
}

const props = withDefaults(defineProps<IProps>(), {
  errors: null,
});

const isErrorsExist = computed(() => {
    return Boolean(props.errors?.length);
})
</script>

<style lang="scss" src="./c-field.scss" />
