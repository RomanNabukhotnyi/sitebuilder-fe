import type { ApiBlock } from '@/types/blocks/ApiBlock';
import type { TextContent } from '@/types/blocks/TextContent';
import type { TextStyles } from '@/types/blocks/TextStyles';

import CTextarea from '@/components/common/c-textarea';

import { useForm } from '@/use/use-form';
import { useValidators } from '@/use/use-validators';
import { useUtils } from '@/use/use-utils';

export const useEditFormBlockText = (block: ApiBlock) => {
  const {
    required,
    cssWeight,
    cssFontSize,
    cssColor,
  } = useValidators();
  const { prepareData } = useUtils();

  const formText = useForm({
    text: {
      value: (block.content as TextContent)?.text,
      placeholder: 'Text',
      component: CTextarea,
      validators: {
        required,
      },
    },
    subtext: {
      value: block.content?.subtext,
      placeholder: 'Subtext',
    },
    title: {
      value: block.attributes?.title,
      placeholder: 'Title',
    },
    fontWeight: {
      value: (block.styles as TextStyles)?.fontWeight,
      placeholder: 'Font weight',
      validators: {
        cssWeight,
      },
    },
    fontSize: {
      value: (block.styles as TextStyles)?.fontSize,
      placeholder: 'Font size',
      validators: {
        cssFontSize,
      },
    },
    color: {
      value: (block.styles as TextStyles)?.color,
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
