import { Product } from '../product/Product';

export class CartItem {
  timestamp: Date;
  purchasePrice: number;
  numberOfProducts: number;
  product: Product;
  quantity: number;

  constructor(
    timestamp: Date,
    purchasePrice: number,
    numberOfProducts: number,
    product: Product
  ) {
    this.timestamp = timestamp;
    this.purchasePrice = purchasePrice;
    this.numberOfProducts = numberOfProducts;
    this.product = product;
    this.quantity = 0;
  }
}
