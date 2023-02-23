import { ref, watch } from 'vue';

import type { ValidatorResult } from '@/types/ValidatorResult';

export const useField = (field: {
  value: string;
  validators?: { [key: string]: (value: string) => ValidatorResult };
}) => {
  const valid = ref(true);
  const value = ref(field.value);
  const errors = ref<Omit<ValidatorResult, 'isValid'>[]>([]);
  const isOptional = !!Object.keys(field.validators ?? {}).find(
    (k) => k === 'optional'
  );

  const reassign = (value: string): void => {
    valid.value = true;
    errors.value = [];
    Object.keys(field.validators || {}).map((validatorName) => {
      if (field.validators) {
        const { name, isValid, message } = field.validators[validatorName](value);
        if (!isValid && name !== 'optional') {
          errors.value.push({
            name,
            message,
          });
          valid.value = false || isOptional;
        }
      }
      });
  };

  watch(value, reassign);
  reassign(field.value);

  return { value, valid, errors };
};
