const widthAndHeightKeywords = ['auto', 'max-content', 'min-content'];
const weightKeywords = ['normal', 'bold', 'lighter', 'bolder'];
const fontSizeKeywords = [
  'xx-small',
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
  'xxx-large',
  'larger',
  'smaller',
];
const colorKeywords = [
  'black',
  'silver',
  'gray',
  'white',
  'maroon',
  'red',
  'purple',
  'fuchsia',
  'green',
  'lime',
  'olive',
  'yellow',
  'navy',
  'blue',
  'teal',
  'aqua',
  'orange',
];

export const useValidators = () => {
  const required = (value: any) => !!value;
  const optional = (value: any) => !value;
  const minLength = (num: number) => (value: string) => value.length >= num;
  const email = (value: string) =>
    value.match(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const exist = (values: string[]) => (value: string) =>
    !values.includes(value);
  const url = (value: string) =>
    value.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/
    );
  const cssSize = (value: string) =>
    value.match(
      /\b(?<!\.)(?!0+(?:\.0+)?%)(?:\d|[1-9]\d|100)(?:(?<!100)\.\d+)?%/g
    ) ||
    value.match(/\d+[.\d+]*px/g) ||
    value.match(/\d+[.\d+]*(px|rem|em|ex)/g);
  const cssWidthOrHeight = (value: string) =>
    cssSize(value) || widthAndHeightKeywords.find((k) => k === value);
  const cssWeight = (value: string) =>
    (Number(value) < 1000 && Number(value) > 1) ||
    weightKeywords.find((k) => k === value);
  const cssFontSize = (value: string) =>
    cssSize(value) || fontSizeKeywords.find((k) => k === value);
  const cssColor = (value: string) =>
    value.match(/^#[a-z0-9]{6}$/g) || colorKeywords.find((k) => k === value);
  return {
    required,
    optional,
    minLength,
    email,
    exist,
    url,
    cssWidthOrHeight,
    cssWeight,
    cssFontSize,
    cssColor,
  };
};
