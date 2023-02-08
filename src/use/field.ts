import { ref, reactive, watch } from 'vue';

export const useField = (field: {
  value: string;
  validators: { [key: string]: Function };
}) => {
  const valid = ref(true);
  const value = ref(field.value);
  const errors = reactive<{ [key: string]: boolean }>({});
  const isOptional = !!Object.keys(field.validators ?? {}).find(
    (k) => k === 'optional'
  );

  const reassign = (value: any): void => {
    valid.value = true;
    Object.keys(field.validators ?? {}).map((name) => {
      const isValid = field.validators[name](value);
      errors[name] = !isValid;
      if (!isValid) {
        valid.value = false || isOptional;
      }
    });
  };

  watch(value, reassign);
  reassign(field.value);

  return { value, valid, errors };
};
