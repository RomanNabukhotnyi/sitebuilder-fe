import { computed, reactive } from 'vue';
import type { Component } from 'vue';

import type { Field } from '@/types/fields/Field';
import type { ValidatorResult } from '@/types/validators/ValidatorResult';

import { useField } from './field';


type InitValue = {
  [key: string]: {
    value?: string;
    type?: 'text' | 'password' | 'email' | 'number';
    placeholder?: string;
    fieldClass?: string;
    componentClass?: string;
    component?: Component;
    validators?: { [key: string]: (value: string) => ValidatorResult };
  }
}

export type FormFields = {
  [key: string]: Field;
}

export const useForm = (init: InitValue) => {
  const formFields: FormFields = reactive({});

  for (const [key, value] of Object.entries(init)) {
    formFields[key] = useField({ name: key, ...value});
  }

  const valid = computed(() => {
    const validationList = Object.entries(formFields).reduce((acc, [key, value]) => {
      return [...acc, value.valid];
    }, [] as Array<any>);

    return validationList.every(Boolean)
  })

  const reset = () => {
    Object.keys(formFields).forEach((key) => formFields[key].value = '');
  }

  return {
    valid,
    formFields,
    reset
  }
};
