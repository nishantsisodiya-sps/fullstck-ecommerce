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
import { HttpClientModule } from '@angular/common/http';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MyOrdersComponent } from './components/profile/my-orders/my-orders.component';
import { UserDetailsComponent } from './components/profile/user-details/user-details.component';
import { SupportComponent } from './components/support/support.component';
import { OrderlistComponent } from './components/profile/orderlist/orderlist.component';
import { DashboardComponent } from './components/profile/dashboard/dashboard.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { SpecialCharacterDirective } from './service/special-character.directive'
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableModule , MatTableDataSource } from '@angular/material/table';
import { WishlistComponent } from './components/profile/wishlist/wishlist.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddressComponent } from './components/profile/address/address.component';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { SuperAdminAuthComponent } from './super-admin/super-admin-auth/super-admin-auth.component';
import { SuperAdminHomeComponent } from './super-admin/super-admin-home/super-admin-home.component';
import { UsersListingComponent } from './super-admin/users-listing/users-listing.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SellersListingComponent } from './super-admin/sellers-listing/sellers-listing.component';
import { OrderByUsersComponent } from './components/profile/dashboard/order-by-users/order-by-users.component';
import { StockComponent } from './components/profile/dashboard/stock/stock.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { OrdersComponent } from './super-admin/orders/orders.component';
import { ProductsComponent } from './super-admin/products/products.component';
import { CategoryComponent } from './super-admin/category/category.component';



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
    WishlistComponent,
    EditProfileComponent,
    AddressComponent,
    SuperAdminAuthComponent,
    SuperAdminHomeComponent,
    UsersListingComponent,
    SuperAdminComponent,
    SuperAdminComponent,
    SellersListingComponent,
    OrderByUsersComponent,
    StockComponent,
    ResetPasswordComponent,
    OrdersComponent,
    ProductsComponent,
    CategoryComponent,

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
    NgxChartsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
