import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { HistoryComponent } from './components/history/history.component';

export const routes: Routes = [
    { path: 'productList', component: ProductListComponent },
    { path: '', redirectTo: '/productList', pathMatch: 'full' },
    { path: 'cart', component: CartComponent },
    { path: 'login', component: LoginComponent },
    { path: 'history', component: HistoryComponent },
];
