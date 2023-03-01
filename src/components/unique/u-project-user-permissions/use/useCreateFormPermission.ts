import { useValidators } from '@/use/use-validators';
import { useForm } from '@/use/use-form';

export const useCreateFormPermission = () => {
  const { required, email } = useValidators();
  const form = useForm({
    email: {
      placeholder: 'Email',
      fieldClass: '',
      componentClass: 'input',
      validators: {
        required,
        email,
      },
    },
  });

  const getData = () => {
    const payload = {
      email: form.fields.email.value,
    };

    return payload;
  };

  return {
    ...form,
    getData,
  };
};
