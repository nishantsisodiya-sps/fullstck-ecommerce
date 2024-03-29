import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { json } from 'd3';

import { AuthTokenService } from 'src/app/service/auth-token.service';
import { LengthServiceService } from 'src/app/service/length-service.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  showSpinner: boolean = false;
  products: any = [];
  totalCart: any;
  PriceAfterDiscount: any;
  totalPrice: number = 0;
  totalDiscount: number = 0;
  queryProduct: any = [];
  quantity: any;

  constructor(
    private productApi: ProductService,
    private auth: AuthTokenService,
    private router: Router,
    private lengthService: LengthServiceService
  ) {}

  ngOnInit(): void {
    this.getcartItems();
  }

  getcartItems() {
    this.showSpinner = true;
    let seller = this.auth.getSellerId().id;
    this.productApi.getCartItems(seller).subscribe((res) => {
      this.products = res;
      this.totalCart = this.products.length;
      localStorage.setItem('cartLength', JSON.stringify(this.totalCart));

      this.products.forEach((element: any) => {
        this.queryProduct.push(element.product);
      });

      let totalPrice = 0;
      let totalDiscount = 0;
      for (let item of this.products) {
        let quantity = item.quantity;
        let Realprice = item.product.price * quantity;
        let discount = item.product.discountPercentage;
        let discountp = Math.round((Realprice * discount) / 100);
        let priceAfterDiscount = Realprice - discountp;
        totalPrice += priceAfterDiscount;
        totalDiscount += discountp;
      }
      this.totalPrice = totalPrice + 100;
      this.totalDiscount = totalDiscount;
      this.showSpinner = false;
    });
  }

  deleteFromCart(itemId: any) {
    this.showSpinner = true;

    this.productApi.deleteFromCart(itemId).subscribe((res) => {
      if (res) {
        this.products = this.products.filter((item: any) => item.id !== itemId);

        // Update the cart length in the header after a successful deletion
        this.lengthService.updateCartLength();

        this.showSpinner = false;
      } else {
        console.log('Error occurred while deleting item from cart.');
      }
    });
  }

  checkout(totalPrice: number) {
    console.log(this.queryProduct);
    const queryParams = {
      totalPrice: totalPrice,
      queryProduct: JSON.stringify(this.queryProduct),
      quantity: this.quantity,
    };
    console.log(queryParams);
    this.router.navigate(['/checkout'], { queryParams: queryParams });
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.updateCart(item);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart(item);
    }
  }

  updateCart(item: any) {
    this.productApi.updateCartItem(item.id, item.quantity).subscribe((res) => {
      if (res) {
        this.getcartItems();
      } else {
        console.log('Error occurred while updating cart item.');
      }
    });
  }
}
