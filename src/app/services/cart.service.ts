import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { Product } from '../models/product/Product';
import { AddToCartRequestDTO } from '../models/product/ProductCartDTO';
import { CartProductResponseDTO } from '../models/product/CartProductResponseDTO';
import { Cart } from '../models/cart/Cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8081/api/cart';
  constructor(private http: HttpClient) {}

  getCart(cartId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/findById/${cartId}`);
  }
  
  getTopPayments(documentNumber: string): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.apiUrl}/mostExpensiveProducts`, documentNumber);
  }

  getCartIdByDocumentNumber(documentNumber: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/findByDocumentNumber/${documentNumber}`);
  }

  createCart(documentNumber: string): Observable<number> {
    return this.http.post<number>(
      `${this.apiUrl}/createCart`,
      documentNumber
    );
  }
  
  pay(cartId: number): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/payCart`,
      cartId
    );
  }
  
  addToCart(item: AddToCartRequestDTO): Observable<CartProductResponseDTO> {
    return this.http.post<CartProductResponseDTO>(`${this.apiUrl}/addToCart`, item);
  }

  removeFromCart(cartId: number, productId: number): Observable<CartProductResponseDTO> {
    return this.http.delete<CartProductResponseDTO>(`${this.apiUrl}/removeFromCart/${cartId}/${productId}`);
  }

  deleteCart(cartId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteCart/${cartId}`)
  }

  
}
