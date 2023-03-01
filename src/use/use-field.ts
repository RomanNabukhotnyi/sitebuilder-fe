import { ref, watch, shallowRef, reactive } from 'vue';
import type { Component } from 'vue';

import CInput from '@/components/common/c-input';

import type { ValidatorResult } from '@/types/validators/ValidatorResult';
import type { ValidatorError } from '@/types/validators/ValidatorError';

export const useField = (init: {
  name: string;
  value?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  fieldClass?: string;
  componentClass?: string;
  component?: Component;
  placeholder?: string;
  validators?: { [key: string]: (value: string) => ValidatorResult };
}) => {
  const {
    value: initValue,
    placeholder: initPlaceholder,
    validators,
    name,
    type: initType,
    fieldClass: initFieldClass,
    componentClass: initComponentClass,
    component: initComponent,
  } = init;
  const key = `${Date.now()}-${name}`;
  const isValid = ref(true);
  const type = initType ?? 'text';
  const placeholder = initPlaceholder ?? '';
  const component = shallowRef(initComponent ?? CInput);
  const value = ref(initValue ?? '');
  const fieldClass = initFieldClass;
  const componentClass = initComponentClass;
  const errors = ref<ValidatorError[]>([]);

  const reassign = (value: string): void => {
    isValid.value = true;
    errors.value = [];
    
    Object.keys(validators || {}).map((validatorName) => {
      if (validators) {
        const { name, isValid: isValidatorValid, message } = validators[validatorName](value);
        if (!isValidatorValid && (value || name === 'required')) {
          errors.value.push({
            name,
            message,
          });
          isValid.value = false;
        }
      }
    });
  };

  watch(value, reassign, { immediate: true });

  return reactive({
    key,
    value,
    isValid,
    type,
    errors,
    fieldClass,
    componentClass,
    component,
    placeholder,
  });
};
