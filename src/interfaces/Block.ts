type Image = {
  url: string;
  subtext?: string;
};

type Text = {
  text: string;
  subtext?: string;
};

type TextAttributes = {
  title?: string;
};

type ImageAttributes = {
  title?: string;
  alt?: string;
};

type TextStyles = {
  fontWeight?: string;
  fontSize?: string;
  color?: string;
};

type ImageStyles = {
  width?: string;
  height?: string;
};

export interface Block {
  id: number;
  type: string;
  content: Image & Text;
  attributes: TextAttributes & ImageAttributes;
  styles: TextStyles & ImageStyles;
  order: number;
  createdAt: string;
}
