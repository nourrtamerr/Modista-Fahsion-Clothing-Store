export type products = product[]

export interface product {
  code?: number;          // lowercase to match DB
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  productAdditionalImages?:string[];
  categoryid: number;    
  subcategoryid: number; 
  stock: number;
  size: number;    
  color: number;   
}

export enum Size {
  XS = 0,
  S = 1,
  M = 2,
  L = 3,
  XL = 4,
  XXL = 5
}

export enum Color {
  Black = 0,
  Blue = 1,
  Green = 2,
  Red = 3,
  Grey = 4,
  Yellow = 5,
  White = 6
}



export interface category {
  id: number;
  name: string;
}

export interface subcategory {
  id: number;
  name: string;
}