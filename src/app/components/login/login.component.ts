import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user/User';
import { CartUtilsService } from '../../services/cart-utils.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  documentNumber: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private cartUtils: CartUtilsService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(
      data => {
         if (data){
          this.router.navigate(['/productList']);
         }
      }
    )
  }

  onSubmit(): void {
    this.userService.login(this.documentNumber).subscribe(
      (data: User) => {
        this.authService.login(data.documentNumber);
        this.cartUtils.handleSuccess('Sesion iniciada.');
        this.router.navigate(['/productList']);
      },
      (error) => {
        this.cartUtils.handleError(error);
      }
    );
  }
}
