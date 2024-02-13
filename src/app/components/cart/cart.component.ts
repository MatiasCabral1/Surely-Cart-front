import { ChangeDetectorRef, Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product/Product';
import { CartUtilsService } from '../../services/cart-utils.service';
import { Cart } from '../../models/cart/Cart';
import { CartItem } from '../../models/cart/CartItem';
import { CartProductResponseDTO } from '../../models/product/CartProductResponseDTO';
import { AddToCartRequestDTO } from '../../models/product/ProductCartDTO';
import { delay } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart: any = {};

  constructor(
    private cartService: CartService,
    private cartUtilsService: CartUtilsService
  ) {}

  ngOnInit(): void {
    this.getProductsInCart();
  }

  getProductsInCart(): void {
    this.cartUtilsService.getCartForLoggedUser();
    this.cartUtilsService.getCart().subscribe((cart) => {
      if (cart) {
        this.cart = cart;
        this.cart.cartItems.forEach((item: any) => {
          item.quantity = 1;
        });
      }
    });
  }

  payCart(): void {
    this.cartService.pay(this.cart.id).subscribe(
      (data: string) => {
        this.cart = {};
      },
      (error) => {
        if (error.status == 200) {
          this.cartUtilsService.handleSuccess(
            'Se efectuó el pago correctamente.'
          );
          this.cart = {};
        } else {
          console.log(error);
        }
      }
    );
  }

  deleteCart(): void {
    this.cartService.deleteCart(this.cart.id).subscribe(
      () => {},
      (error) => {
        if (error.status == 200) {
          this.cart = {};
          this.cartUtilsService.clearCart();
          this.cartUtilsService.handleSuccess(
            'La compra fue cancelada exitosamente.'
          );
        } else {
          this.cartUtilsService.handleError(error);
        }
      }
    );
  }

  addToCart(cartId: number, productId: number, quantity: number): void {
    let request = new AddToCartRequestDTO(cartId, productId, quantity);
    this.cartService.addToCart(request).subscribe(
      (data: CartProductResponseDTO) => {
        this.cartUtilsService.handleSuccess('Producto agregado correctamente');
        this.getProductsInCart();
      },
      (error) => {
        this.cartUtilsService.handleError(error);
      }
    );
  }

  removeFromCart(cartId: number, productId: number): void {
    this.cartService.removeFromCart(cartId, productId).subscribe(
      (data: CartProductResponseDTO) => {
        this.cartUtilsService.handleSuccess('Producto eliminado correctamente');
        this.getProductsInCart();
      },
      (error) => {
        this.cartUtilsService.handleError(error);
      }
    );
    this.getProductsInCart();
  }

  formatPrice(price: number): string {
    return '$' + price.toLocaleString('es-ES');
  }
}
