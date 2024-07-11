export type TProduct = {
  _id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  rating: number;
  image: string;
  brand: string;
  stock: number;
  isDeleted?: boolean;
};
export type TCategory = {
  _id: string;
  category: string;

  image: string;
};
