import { useValidators } from '@/use/use-validators';
import type { ApiProject } from '@/types/projects/ApiProject';

import { useForm } from '@/use/use-form';

export const useEditFormProject = (
  project: ApiProject,
  projects: ApiProject[]
) => {
  const { required, exist } = useValidators();
  const form = useForm({
    name: {
      value: project.name,
      placeholder: 'Name',
      validators: {
        required,
        exist: exist(
          projects.map((p) => p.name).filter((name) => name !== project.name)
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
