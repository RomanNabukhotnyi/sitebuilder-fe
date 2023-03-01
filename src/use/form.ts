import { reactive, computed } from 'vue';
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

type FormFields = {
  [key: string]: Field;
}

export const useForm = (init: InitValue) => {
  const formFields: FormFields = {};

  for (const [key, value] of Object.entries(init)) {
    formFields[key] = useField({ name: key, ...value});
  }

  const valid = computed(() =>
    Object.keys(formFields)
      .filter((k) => {
        return k !== 'valid';
      })
      .reduce((acc, k) => {
        return acc && formFields[k].valid.value;
      }, true)
  );

  const getFields = () => reactive(Object.entries(formFields).map(([, value]) => value));

  const reset = () => {
    Object.keys(formFields).forEach((key) => formFields[key].value.value = '');
  }

  const form = Object.assign({
    valid,
    getFields,
    reset,
  }, formFields);

  return reactive(form);
};
