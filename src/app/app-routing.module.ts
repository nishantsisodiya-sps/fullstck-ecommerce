
import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { DetailsComponent } from './components/details/details.component';
import { SellerProductsComponent } from './components/profile/seller-products/seller-products.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrdersComponent } from './components/profile/my-orders/my-orders.component';
import { SupportComponent } from './components/support/support.component';
import { OrderlistComponent } from './components/profile/orderlist/orderlist.component';
import { DashboardComponent } from './components/profile/dashboard/dashboard.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { WishlistComponent } from './components/profile/wishlist/wishlist.component';
import { UserDetailsComponent } from './components/profile/user-details/user-details.component';
import { AddressComponent } from './components/profile/address/address.component';
import { AuthGuard } from './Guards/auth.guard';
import { AuthTokenService } from './service/auth-token.service';
import { Observable } from 'rxjs';
import { SuperAdminHomeComponent } from './superAmin/super-admin-home/super-admin-home.component';
import { SuperAdminAuthComponent } from './superAmin/super-admin-auth/super-admin-auth.component';


@Injectable({ providedIn: 'root' })
export class HomeRouteResolver implements Resolve<any> {
  constructor(private token: AuthTokenService , private router : Router) { }

  getProfileHomeRoute(): any {
    const userRole = this.token.getSellerId().role;
    console.log(userRole);
    if (userRole === 'user') {
  
      this.router.navigate(['/profile/MyOrderList'])
      return 'MyOrderList';
    } else if (userRole === 'seller') {
   
      this.router.navigate(['/profile/dashboard'])
      return 'dashboard';
    }
  }

  resolve(route: ActivatedRouteSnapshot): Observable<string> | string {
    return this.getProfileHomeRoute();
  }

}

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'userAuth', component: UserAuthComponent },
  { path: 'sellerAuth', component: SellerAuthComponent },
  { path: 'addproduct', component: AddProductComponent , canActivate: [AuthGuard], data: { roles: 'seller' } },
  { path: 'MyProducts', component: MyProductsComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'cart', component: CartComponent ,canActivate: [AuthGuard] },
  {
    path: 'profile', component: ProfileComponent,  canActivate: [AuthGuard], children: [
      {
        path: '',
        pathMatch: 'full',
        resolve: {
          homeRoute: HomeRouteResolver 
        },
        redirectTo: '',
      },
      { path: 'sellerProducts', component: SellerProductsComponent , canActivate: [AuthGuard], data: { roles: 'seller' } },
      { path: 'MyOrderList', component: OrderlistComponent },
      { path: 'MyOrderList/:id', component: MyOrdersComponent },
      { path: 'support', component: SupportComponent },
      { path: 'userDetails', component: UserDetailsComponent },
      { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard], data: { roles: 'seller' }},
      { path: 'wishlist', component: WishlistComponent },
      { path: 'address', component: AddressComponent },
    ]
  },
  { path: 'checkout', component: CheckoutComponent }, 
  { path: 'category-products/:id', component: CategoryProductsComponent },
  { path: 'superAdmin', component: SuperAdminHomeComponent },
  { path: 'superAdminAuth', component: SuperAdminAuthComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule {}




