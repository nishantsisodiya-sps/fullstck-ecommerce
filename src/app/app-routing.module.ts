import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { DetailsComponent } from './components/details/details.component';
import { SellerProductsComponent } from './seller-products/seller-products.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {path : '' , pathMatch : 'full' , redirectTo : 'home'},
  {path : 'home' , component : HomeComponent},
  {path : 'userAuth' , component : UserAuthComponent},
  {path : 'sellerAuth' , component : SellerAuthComponent},
  {path : 'addproduct' , component : AddProductComponent},
  {path : 'MyProducts' , component : MyProductsComponent},
  {path : 'details/:id' , component : DetailsComponent},
  {path : 'sellerProducts' , component : SellerProductsComponent},
  {path : 'cart' , component : CartComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
