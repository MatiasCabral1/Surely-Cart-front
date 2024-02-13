import { Component } from '@angular/core';
import { Product } from '../../models/product/Product';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartUtilsService } from '../../services/cart-utils.service';
import { AddToCartRequestDTO } from '../../models/product/ProductCartDTO';
import { CartProductResponseDTO } from '../../models/product/CartProductResponseDTO';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: Product[] = [];
  cartStatus = false;
  cartId = -1;

  constructor(
    private productService: ProductService,
    private cartUtilsService: CartUtilsService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.getCartStatus();
    this.getCartId();
    this.cartUtilsService.getCartForLoggedUser();
  }

  getCartId(): void {
    this.cartUtilsService.getCart().subscribe((cart) => {
      if (cart) {
        this.cartId = cart.id;
      } else {
        console.log('Los datos del carrito aún no están disponibles');
      }
    });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        this.cartUtilsService.handleError(error);
      }
    );
  }

  addToCart(product: Product): void {
    let request = new AddToCartRequestDTO(this.cartId, product.id, 1);

    this.cartService.addToCart(request).subscribe(
      (data: CartProductResponseDTO) => {
        this.cartUtilsService.handleSuccess('Producto agregado correctamente');
        this.cartUtilsService.getCartForLoggedUser();
      },
      (error) => {
        this.cartUtilsService.handleError(error);
      }
    );
  }

  createCart(): void {
    const documentNumber = localStorage.getItem('documentNumber') || '-1';
    this.cartService.createCart(documentNumber).subscribe(
      (data: number) => {
        this.cartStatus = true;
        this.cartUtilsService.getCartForLoggedUser();
      },
      (error) => {
        this.cartUtilsService.handleError(error);
      }
    );
  }

  getCartStatus() {
    this.cartUtilsService.getCart().subscribe((cart) => {
      if (cart) {
        this.cartStatus = cart ? true : false;
        this.getProducts();
      } else {
        console.log('Los datos del carrito aún no están disponibles');
      }
    });
  }

  formatPrice(price: number): string {
    return '$' + price.toLocaleString('es-ES');
  }
}
