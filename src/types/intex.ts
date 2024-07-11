export type TProduct = {
  _id: string;
  title: string;
  description: string;
  releaseDate: Date;
  genre: string;
  director: string;
  cast: string;
  slug: string;
  viewCount: number;
  totalRating: number;
  isDeleted: boolean;
  image: string;
};
export type TCategory = {
  _id: string;
  category: string;

  image: string;
};
