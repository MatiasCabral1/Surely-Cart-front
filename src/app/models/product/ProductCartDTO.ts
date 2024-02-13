export class AddToCartRequestDTO {
    cartId: number;
    productId: number;
    quantity: number;
  
    constructor(cartId: number, productId: number, quantity: number) {
      this.cartId = cartId;
      this.productId = productId;
      this.quantity = quantity;
    }
  }