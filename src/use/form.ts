import { reactive, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';

import type { ValidatorResult } from '@/types/ValidatorResult';

import { useField } from './field';


interface InitValue {
  [key: string]: {
    value: string;
    validators?: { [key: string]: (value: string) => ValidatorResult };
  }
}

type Form = {
  [key: string]: {
    value: Ref<string>;
    valid: Ref<boolean>;
    errors: Ref<Omit<ValidatorResult, 'isValid'>[]>;
  }
} & {
  valid?: ComputedRef<boolean>;
}

export const useForm = (init: InitValue) => {
  const form: Form = {};

  for (const [key, value] of Object.entries(init)) {
    form[key] = useField(value);
  }

  form.valid = computed(() =>
    Object.keys(form)
      .filter((k) => {
        return k !== 'valid';
      })
      .reduce((acc, k) => {
        return acc && form[k].valid.value;
      }, true)
  );

  return reactive(form);
};
