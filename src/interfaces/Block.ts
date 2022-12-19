type Image = {
  url: string;
  subtext?: string;
};

type Text = {
  text: string;
  subtext?: string;
};

export interface Block {
  id: number;
  type: string;
  content: Image & Text;
  order: number;
  createdAt: string;
}
