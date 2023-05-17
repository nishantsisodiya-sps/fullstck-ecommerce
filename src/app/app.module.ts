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
import { SellerProductsComponent } from './components/profile/seller-products/seller-products.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MyOrdersComponent } from './components/profile/my-orders/my-orders.component';
import { UserDetailsComponent } from './components/profile/user-details/user-details.component';
import { SupportComponent } from './components/support/support.component';
import { OrderlistComponent } from './components/profile/orderlist/orderlist.component';
import { DashboardComponent } from './components/profile/dashboard/dashboard.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { SpecialCharacterDirective } from './service/special-character.directive'
import {MatCardModule} from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DefaultArcObject } from 'd3-shape';

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
    CartComponent,
    CheckoutComponent,
    MyOrdersComponent,
    UserDetailsComponent,
    SupportComponent,
    OrderlistComponent,
    DashboardComponent,
    CategoryProductsComponent,
    SpecialCharacterDirective,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
