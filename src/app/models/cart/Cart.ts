import { CartItem } from './CartItem';
import { E_CartStatus } from './E_CartStatus';

export class Cart {
  id: number;
  status: E_CartStatus;
  timestamp: Date;
  price: number;
  cartItems: CartItem[];
  numberOfProducts: number;

  constructor(
    id: number,
    status: E_CartStatus,
    timestamp: Date,
    price: number,
    cartItems: CartItem[],
    numberOfProducts: number
  ) {
    this.id = id;
    this.status = status;
    this.price = price;
    this.timestamp = timestamp;
    this.cartItems = cartItems;
    this.numberOfProducts = numberOfProducts
  }
}
