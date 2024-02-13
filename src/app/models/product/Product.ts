import { E_ProductCategory } from "./E_ProductCategory";

export class Product {
  id: number;
  timestamp: Date;
  name: string;
  productCategory: E_ProductCategory;
  stock: number;
  price: number;

  constructor(
    id: number,
    name: string,
    productCategory: E_ProductCategory,
    stock: number,
    price: number
  ) {
    this.id = id;
    this.name = name;
    this.productCategory = productCategory;
    this.stock = stock;
    this.price = price;
    this.timestamp = new Date();
  }

  formatPrice(): string {
    return '$' + this.price.toLocaleString('es-ES');
  }
}


