import { CartItem } from '../cart/CartItem';
import { E_CartStatus } from '../cart/E_CartStatus';

export class CartProductResponseDTO {
  cartId: number;
  status: E_CartStatus;
  cartItems: CartItem[];
  price: number;

  constructor(
    cartId: number,
    status: E_CartStatus,
    cartItems: CartItem[],
    price: number
  ) {
    this.cartId = cartId;
    this.status = status;
    this.cartItems = cartItems;
    this.price = price;
  }
}
