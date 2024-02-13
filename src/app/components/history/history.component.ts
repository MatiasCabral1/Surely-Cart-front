import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product/Product';
import { CartUtilsService } from '../../services/cart-utils.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  products: any[] = [];

  constructor(private cartService: CartService,
    private cartUtils : CartUtilsService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    let documentNumber = "-1";
    this.authService.documentNumberUser.subscribe(
      (data: string) => {
        documentNumber = data;
      }
    )
    this.cartService.getTopPayments(documentNumber).subscribe(
      (data: Product[]) => {
        console.log(data)
        this.products = data;
      },
      (error) => {
        console.log("error asda:", error)
        this.cartUtils.handleError(error)
      }
    );
  }

  formatPrice(price: number): string {
    return '$' + price.toLocaleString('es-ES');
  }
}
