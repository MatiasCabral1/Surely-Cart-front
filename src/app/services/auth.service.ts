import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CartUtilsService } from "./cart-utils.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private documentNumber = new BehaviorSubject<string>("");

  constructor() {
    // Verificar si isLoggedIn está en el localStorage al iniciar el servicio
    this.init();
    
  }

  private init(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const documentNumber = localStorage.getItem('documentNumber') || "";
    if (isLoggedIn) {
      this.loggedIn.next(true);
      this.documentNumber.next(documentNumber);
    }
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get documentNumberUser() {
    return this.documentNumber.asObservable();
  }

  login(documentNumber: string) {
    this.documentNumber.next(documentNumber);
    this.loggedIn.next(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('documentNumber', documentNumber);
    this.init();
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.clear()
    this.init();
  }
}
