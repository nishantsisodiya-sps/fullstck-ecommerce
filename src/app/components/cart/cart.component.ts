import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { ProductService } from 'src/app/service/product.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any = [];
  totalCart: any
  PriceAfterDiscount: any
  totalPrice: number = 0;
  totalDiscount: number = 0;
  queryProduct: any = []
  quantity : any
  constructor(private api: UserAuthApiService, private productApi: ProductService,
    private auth: AuthTokenService, private router: Router) { }

  ngOnInit(): void {
    this.getcartItems()
  }

  getcartItems() {
    let seller = this.auth.getSellerId().id
    this.productApi.getCartItems(seller).subscribe(res => {
      this.products = res
      this.totalCart = this.products.length
     
      this.products.forEach((element : any) => {
          this.queryProduct.push(element.product)
       
        });

      let totalPrice = 0;
      let totalDiscount = 0;
      for (let item of this.products) {
        let quantity = item.quantity
        let Realprice = item.product.price * quantity
        let discount = item.product.discountPercentage
        let discountp = Math.round(Realprice * discount / 100)
        let priceAfterDiscount = Realprice - discountp
        totalPrice += priceAfterDiscount
        totalDiscount += discountp
      }
      this.totalPrice = totalPrice * 80 + 100;
      this.totalDiscount = totalDiscount;
    })
  }

  deleteFromCart(itemId: any) {
    this.productApi.deleteFromCart(itemId).subscribe(res => {
      if (res) {
        this.products = this.products.filter((item: any) => item.id !== itemId);
        this.getcartItems()
      } else {
        console.log("error occured");
      }
    })
  }

  checkout(totalPrice: number) {
    const queryParams = {
      totalPrice: totalPrice,
      queryProduct: JSON.stringify(this.queryProduct),
      quantity: this.quantity
    };
    this.router.navigate(['/checkout'], { queryParams: queryParams })
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
    this.productApi.updateCartItem(item.id, item.quantity).subscribe(res => {
      if (res) {
        this.getcartItems();
      } else {
        console.log("Error occurred while updating cart item.");
      }
    });
  }

}



