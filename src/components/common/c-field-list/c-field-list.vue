<template>
  <div class="c-field-list">
    <template v-if="!fields.length">
      fields list empty
    </template>
    <template v-else>
      <CField
        v-for="(field, index) in fields"
        :key="field.key"
        :errors="field.errors"
        :touched="touchList[index]"
        :class="field.fieldClass ?? 'field'"
      >
        <component
          :is="field.component"
          v-model="field.value"
          v-focus="index === 0"
          :class="field.componentClass"
          :type="field.type"
          :placeholder="field.placeholder"
          @touch="touch(index)"
        />
      </CField>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PreparedField } from '@/types/fields/PreparedField';

import CField from '../c-field';

interface IProps {
  fields?: PreparedField[];
}

const props = withDefaults(defineProps<IProps>(), {
  fields: () => [],
});

const touchList = ref(Array<boolean>(props.fields.length).fill(false));

const touch = (index: number) => {
  touchList.value[index] = true;
}
</script>

<style lang="scss" src="./c-field-list.scss" />