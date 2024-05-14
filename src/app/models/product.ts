export interface Product {
  id: number;
  handle: string;
  title: string;
  description: string;
  sku: number;
  grams: number;
  stock: number;
  price: number;
  comparePrice: number;
  barcode?: number;
}
