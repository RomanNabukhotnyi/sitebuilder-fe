import { reactive, computed } from 'vue';
import { useField } from './field';

export const useForm = (init: {}) => {
  const form = reactive<any>({});

  for (const [key, value] of Object.entries<{
    value: string;
    validators: { [key: string]: Function };
  }>(init)) {
    form[key] = useField(value);
  }

  form.valid = computed(() =>
    Object.keys(form)
      .filter((k) => k !== 'valid')
      .reduce((acc, k) => {
        return acc && form[k].valid;
      }, true)
  );

  return form;
};
