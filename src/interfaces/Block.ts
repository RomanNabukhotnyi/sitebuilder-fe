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

type Attributes = (TextAttributes & ImageAttributes) | null | undefined;
type Styles = (TextStyles & ImageStyles) | null | undefined;

export interface Block {
  id: number;
  type: string;
  content: Image & Text;
  attributes: Attributes;
  styles: Styles;
  order: number;
  createdAt: string;
}
