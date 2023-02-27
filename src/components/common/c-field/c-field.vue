<template>
  <div class="c-field">
    <slot />
    <div v-if="isErrorsExist && touched">
      <p
        class="field__error"
      >
        {{ errors![0].message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { ValidatorError } from '@/types/validators/ValidatorError';

interface IProps {
  errors?: ValidatorError[] | null;
  touched?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  errors: null,
  touched: false,
});

const isErrorsExist = computed(() => {
     return !!props.errors?.length;
 })
</script>

<style lang="scss" src="./c-field.scss" />
