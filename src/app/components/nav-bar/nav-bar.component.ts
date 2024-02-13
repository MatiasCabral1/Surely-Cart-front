import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartUtilsService } from '../../services/cart-utils.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  cantProducsInCart: number;
  loggedIn: boolean = false;
  documentNumber: string = ""

  constructor(
    private cartUtilsService: CartUtilsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cantProducsInCart = 0;
  }
  ngOnInit(): void {
    this.getLoggedIn();
    this.getCartInfo();
  }

  getCartInfo(): void {
    this.cartUtilsService.getCart().subscribe((cart) => {
      if (cart) {
        this.cantProducsInCart = cart.numberOfProducts;
      } else {
        this.cantProducsInCart = 0;
      }
    });
  }

  getLoggedIn(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
    this.authService.documentNumberUser.subscribe((data) => {
      this.documentNumber = data;
    });
  }

  logout(): void {
    this.authService.logout();
    this.cartUtilsService.clearCart();
    this.router.navigate(['/login']);
  }
}
