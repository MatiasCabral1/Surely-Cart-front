import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { Cart } from '../models/cart/Cart';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartUtilsService {
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  private errorHandlerSubject = new Subject<string>();
  private successHandlerSubject = new Subject<string>();
  private documentNumber = "";

  constructor(private cartService: CartService, private authService: AuthService) {}

  getCartForLoggedUser(): void {
    this.authService.documentNumberUser.subscribe((documentNumber) => {
      this.documentNumber = documentNumber;
     });
    this.cartService.getCartIdByDocumentNumber(this.documentNumber).subscribe(
      (cart: Cart) => {
        this.cartService.getCart(cart.id).subscribe(
          (cart: Cart) => {
            this.cartSubject.next(cart);
          },
          (error) => {
            this.handleError(error);
          }
        );
      }
    );
  }

  getCart(): BehaviorSubject<Cart | null> {
    return this.cartSubject;
  }

  clearCart(): void {
    this.cartSubject.next(null);
  }

  public handleSuccess( message: string ): void {
    this.successHandlerSubject.next(message);
  }

  public handleError(error: any): void {
    let errorMessage = error.error;
    console.error(errorMessage);
    this.errorHandlerSubject.next(errorMessage);
  }

  errorHandler(): Observable<string> {
    return this.errorHandlerSubject.asObservable();
  }

  successHandler(): Observable<string> {
    return this.successHandlerSubject.asObservable();
  }
}
