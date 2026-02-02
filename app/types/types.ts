// app/types.ts
export type Game = {
  id: number;
  title: string;
  platform: string;
  genre: string;
  releaseDate: string;
  cover: string;
  isFavorite: boolean;
  description: string;
};