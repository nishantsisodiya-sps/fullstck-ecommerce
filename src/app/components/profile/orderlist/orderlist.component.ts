import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css'],
})
export class OrderlistComponent implements OnInit {
  showSpinner: boolean = false;
  userData: any = [];
  myorder: any = [];
  cartItems: any = [];
  cartLength: any;
  orderLength: any;
  forseller: boolean = false;
  paid: boolean = false;
  imageFound: boolean = true;
  cancelled: boolean = false;

  constructor(
    private auth: AuthTokenService,
    private order: OrderService,
    private product: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.getOrdersinfo();

    let seller = this.auth.getSellerId().role;
    if (seller === 'seller') {
      this.forseller = true;
    } else {
      this.forseller = false;
    }
  }

  getUserInfo() {
    let data = this.auth.getSellerId();
    this.userData.push(data);
  }

  async getOrdersinfo() {
    this.showSpinner = true;
    let id = this.auth.getSellerId().id;
    const token = localStorage.getItem('token');

    this.order
      .getOrders(id)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            // Handle case when no orders are found
            this.showSpinner = false;
            console.log(error);
            this.imageFound = false;
          }
          return of([]); // Return an empty array as a fallback value
        })
      )
      .subscribe((res) => {
        this.myorder = res;
        this.orderLength = this.myorder.length;
        //Getting cart item length
        this.product.getCartItems(id).subscribe((response) => {
          console.log(response);
          if (!response) {
            this.showSpinner = false;
            alert('No order found');
          }
          this.cartItems = response;
          this.cartLength = this.cartItems.length;
          this.showSpinner = false;
        });
      });
  }

  sendId(id: any, productId: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: { id: id, productId: productId },
    };
    this.router.navigate(['profile/MyOrder'], navigationExtras);
  }

  cancleOrder(item: any) {
    this.showSpinner = true;
    let data = {
      orderId: item._id,
      productId: item.product.product._id,
    };
    this.order.cancelOrder(data).subscribe((res) => {
      if (res) {
        alert('Order Cancelled');
        this.getOrdersinfo();
        this.showSpinner = false;
      }
    });
  }
}
