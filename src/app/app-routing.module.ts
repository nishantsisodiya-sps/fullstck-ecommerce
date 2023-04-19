import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { AddProductComponent } from './components/add-product/add-product.component';

const routes: Routes = [
  {path : '' , pathMatch : 'full' , redirectTo : 'home'},
  {path : 'home' , component : HomeComponent},
  {path : 'userAuth' , component : UserAuthComponent},
  {path : 'sellerAuth' , component : SellerAuthComponent},
  {path : 'addproduct' , component : AddProductComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
