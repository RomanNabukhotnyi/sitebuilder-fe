import type { ApiBlock } from '@/types/blocks/ApiBlock';
import type { ImageContent } from '@/types/blocks/ImageContent';
import type { ImageStyles } from '@/types/blocks/ImageStyles';
import type { ImageAttributes } from '@/types/blocks/ImageAttributes';

import { useForm } from '@/use/use-form';
import { useValidators } from '@/use/use-validators';
import { useUtils } from '@/use/use-utils';

export const useEditFormBlockImage = (block: ApiBlock) => {
  const {
    required,
    url,
    cssWidthOrHeight
  } = useValidators();
  const { prepareData } = useUtils();

  const formImage = useForm({
    url: {
      value:(block.content as ImageContent).url,
      placeholder: 'Url',
      validators: {
        required,
        url,
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
    alt: {
      value: (block.attributes as ImageAttributes)?.alt,
      placeholder: 'Alt',
    },
    width: {
      value: (block.styles as ImageStyles)?.width,
      placeholder: 'Width',
      validators: {
        cssWidthOrHeight,
      },
    },
    height: {
      value: (block.styles as ImageStyles)?.height,
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
      styles
    }
  }

  return {
    ...formImage,
    getData,
  };
};
