export interface ProductVariant {
  id: string;
  name: string;
  colorHex: string;
  image: string;
  thumbnail?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  learnMoreUrl: string;
  image: string;
  thumbnail?: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  variants?: ProductVariant[];
  step: 1 | 2 | 3 | 4;
  category: "cameras" | "plan" | "sensors" | "accessories";
  isRequired?: boolean;
  isFree?: boolean;
  billingLabel?: string;
}

export interface StepConfig {
  step: 1 | 2 | 3 | 4;
  title: string;
  icon?: string;
  nextLabel?: string;
}
