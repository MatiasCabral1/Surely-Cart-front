import { Component, OnInit } from '@angular/core';
import { CartUtilsService } from './services/cart-utils.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Surely-Cart';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private cartUtilsService: CartUtilsService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.authService.isLoggedIn.subscribe((data: boolean) => {
      if (data) {
        this.cartUtilsService.errorHandler().subscribe((errorMessage) => {
          
          this.errorMessage = errorMessage;
        });

        this.cartUtilsService.successHandler().subscribe((successMessage) => {
          this.successMessage = successMessage;
        });
      }
    });
  }

  closeErrorMessage() {
    this.errorMessage = null;
  }

  closeSuccessMessage() {
    this.successMessage = null;
  }
}
