import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'userAuth', component: UserAuthComponent },
  { path: 'sellerAuth', component: SellerAuthComponent },
  { path: 'addproduct', component: AddProductComponent },
  { path: 'MyProducts', component: MyProductsComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'profile', component: ProfileComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'sellerProducts', component: SellerProductsComponent },
      { path: 'MyOrderList', component: OrderlistComponent },
      { path: 'MyOrderList/:id', component: MyOrdersComponent },
      { path: 'support', component: SupportComponent },
      { path: 'dashboard', component: DashboardComponent }
    ]
  },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'category-products/:id', component: CategoryProductsComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
