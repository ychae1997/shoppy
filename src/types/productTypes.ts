export type ProductType = {
  title: string;
  price: number;
  category?: string;
  description?: string;
  options: string | string[];
  id?: string;
  image?: string;
  quantity?: number;
};
