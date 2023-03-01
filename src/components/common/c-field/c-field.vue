<template>
  <div class="c-field">
    <slot />
    <div v-if="errors && errors.length !== 0">
      <p
        class="field__error"
      >
        {{ errors[0].message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ValidatorResult } from '@/types/ValidatorResult';

interface IProps {
  errors?: Omit<ValidatorResult, 'isValid'>[] | null;
}

withDefaults(defineProps<IProps>(), {
  errors: null,
});
</script>

<style lang="scss" src="./c-field.scss" />
