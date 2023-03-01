import type { ApiPage } from '@/types/pages/ApiPage';

import { useValidators } from '@/use/use-validators';
import { useForm } from '@/use/use-form';

export const useEditFormPage = (page: ApiPage, pages: ApiPage[]) => {
  const { required, exist } = useValidators();
  const form = useForm({
    name: {
      value: page.name,
      placeholder: 'Name',
      validators: {
        required,
        exist: exist(
          pages.map((p) => p.name).filter((name) => name !== page.name)
        ),
      },
    },
  });

  const getData = () => {
    const payload = {
      name: form.fields.name.value,
    };

    return payload;
  };

  return {
    ...form,
    getData,
  };
};
