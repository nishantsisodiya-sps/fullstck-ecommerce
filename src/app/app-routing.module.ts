import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';

const routes: Routes = [
  {path : '' , pathMatch : 'full' , redirectTo : 'home'},
  {path : 'home' , component : HomeComponent},
  {path : 'userAuth' , component : UserAuthComponent},
  {path : 'sellerAuth' , component : SellerAuthComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
