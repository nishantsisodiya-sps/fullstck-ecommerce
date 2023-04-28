import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { PipePipe } from './service/pipe.pipe';
import { DetailsComponent } from './components/details/details.component';
import { SellerProductsComponent } from './seller-products/seller-products.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserAuthComponent,
    SellerAuthComponent,
    AddProductComponent,
    MyProductsComponent,
    PipePipe,
    DetailsComponent,
    SellerProductsComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
