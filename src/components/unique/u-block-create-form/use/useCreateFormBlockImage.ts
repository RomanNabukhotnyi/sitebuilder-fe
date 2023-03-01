import { useForm } from '@/use/use-form';
import { useValidators } from '@/use/use-validators';
import { useUtils } from '@/use/use-utils';

export const useCreateFormBlockImage = () => {
  const { required, url, cssWidthOrHeight } = useValidators();
  const { prepareData } = useUtils();

  const formImage = useForm({
    url: {
      placeholder: 'Url',
      validators: {
        required,
        url,
      },
    },
    subtext: {
      placeholder: 'Subtext',
    },
    title: {
      placeholder: 'Title',
    },
    alt: {
      placeholder: 'Alt',
    },
    width: {
      placeholder: 'Width',
      validators: {
        cssWidthOrHeight,
      },
    },
    height: {
      placeholder: 'Height',
      validators: {
        cssWidthOrHeight,
      },
    },
  });

  const getData = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const content = prepareData({
      url: formImage.fields.url.value,
      subtext: formImage.fields.subtext.value,
    })!;

    const attributes = prepareData({
      title: formImage.fields.title.value,
      alt: formImage.fields.alt.value,
    });

    const styles = prepareData({
      width: formImage.fields.width.value,
      height: formImage.fields.height.value,
    });

    return {
      content,
      attributes,
      styles,
    };
  };

  return {
    ...formImage,
    getData,
  };
};
