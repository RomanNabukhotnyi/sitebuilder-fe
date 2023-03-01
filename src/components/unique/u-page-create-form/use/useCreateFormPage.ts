import type { ApiPage } from '@/types/pages/ApiPage';

import { useValidators } from '@/use/use-validators';
import { useForm } from '@/use/use-form';

export const useCreateFormPage = (pages: ApiPage[]) => {
  const { required, exist } = useValidators();
  const form = useForm({
    name: {
      placeholder: 'Name',
      validators: {
        required,
        exist: exist(pages.map((p) => p.name)),
      },
    },
  });

  const getData = () => {
    const payload = {
      name: form.fields.name.value,
      meta: {},
    };

    return payload;
  };

  return {
    ...form,
    getData,
  };
};
