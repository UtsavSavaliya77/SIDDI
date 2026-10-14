export interface ProductFinish {
  id: string;
  name: string;
  hex: string;
  texture?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  series: string;
  category: ProductCategoryType;
  categorySlug: string;
  shortDescription: string;
  description: string;
  applications: string[];
  finishes: ProductFinish[];
  images: string[];
  specifications: ProductSpecification[];
  features: string[];
  dimensions?: string;
  isDemonstrationItem: boolean;
  featured?: boolean;
}

export type ProductCategoryType = 
  | 'Door Handles & Knobs'
  | 'Door Hardware & Accessories'
  | 'Bathroom Accessories'
  | 'Towel Rails & Holders'
  | 'Hooks, Robe Hooks & Utility'
  | 'Architectural Hardware';

export interface ProductCategory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  editorialNote: string;
  itemCountDemonstration: number;
}

export interface ApplicationArea {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  relatedCategorySlugs: string[];
  hardwareHighlights: string[];
}
