import CTextarea from '@/components/common/c-textarea';

import { useForm } from '@/use/use-form';
import { useValidators } from '@/use/use-validators';
import { useUtils } from '@/use/use-utils';

export const useCreateFormBlockText = () => {
  const { required, cssWeight, cssFontSize, cssColor } = useValidators();
  const { prepareData } = useUtils();

  const formText = useForm({
    text: {
      placeholder: 'Text',
      component: CTextarea,
      validators: {
        required,
      },
    },
    subtext: {
      placeholder: 'Subtext',
    },
    title: {
      placeholder: 'Title',
    },
    fontWeight: {
      placeholder: 'Font weight',
      validators: {
        cssWeight,
      },
    },
    fontSize: {
      placeholder: 'Font size',
      validators: {
        cssFontSize,
      },
    },
    color: {
      placeholder: 'Color',
      validators: {
        cssColor,
      },
    },
  });

  const getData = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const content = prepareData({
      text: formText.fields.text.value,
      subtext: formText.fields.subtext.value,
    })!;
  
    const attributes = prepareData({
      title: formText.fields.title.value,
    });
  
    const styles = prepareData({
      fontWeight: formText.fields.fontWeight.value,
      fontSize: formText.fields.fontSize.value,
      color: formText.fields.color.value,
    });

    return {
      content,
      attributes,
      styles
    }
  }

  return {
    ...formText,
    getData,
  };
};
