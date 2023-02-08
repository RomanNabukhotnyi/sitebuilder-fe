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
      .filter((k) => {
        return k !== 'valid';
      })
      .reduce((acc, k) => {
        console.log('formvalid:', form.valid);
        return acc && form[k].valid;
      }, true)
  );

  return form;
};
