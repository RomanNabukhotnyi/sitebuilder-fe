import { ref, watch, shallowRef } from 'vue';
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
	const valid = ref(true);
	const type = initType ?? 'text';
	const placeholder = initPlaceholder ?? '';
	const component = shallowRef(initComponent ?? CInput);
	const value = ref(initValue ?? '');
	const fieldClass = initFieldClass;
	const componentClass = initComponentClass;
	const errors = ref<ValidatorError[]>([]);

	const setInvalidState = (name: string, message: string) => {
		errors.value.push({
			name,
			message,
		});
		valid.value = false;
	}

	const reassign = (value: string): void => {
		valid.value = true;
		errors.value = [];

		Object.keys(validators || {}).map((validatorName) => {
			if (validators) {
				const { name, isValid, message } = validators[validatorName](value);

				if (!isValid && (value || name === 'required')) {
					setInvalidState(name, message)
				}
			}
		});
	};

	watch(value, reassign, { immediate: true });

	return {
		key,
		value,
		valid,
		type,
		errors,
		fieldClass,
		componentClass,
		component,
		placeholder,
	};
};
