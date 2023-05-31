
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthTokenService } from 'src/app/service/auth-token.service';
import { ProductService } from 'src/app/service/product.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product: any = []
  productQuantity: number = 1;
  quantity: number = 1
  arr: [] = []
  wishlisted: boolean = false
  showSpinner: boolean = false

  constructor(

    private activate: ActivatedRoute,
    private api: UserAuthApiService,
    private auth: AuthTokenService,
    private productApi: ProductService,
    private wishlist: WishlistService,
 
  ) { }


  ngOnInit(): void {
    this.data()
  }

  data(){
    this.showSpinner = true
    this.activate.paramMap.subscribe(param => {
      let id = param.get('id')

      this.api.getSingleProduct(id).subscribe(res => {
        this.product.push(res)

        if (res.isWishlist == true) {
          this.wishlisted = true
        } else {
          this.wishlisted = false
        }

        let image = this.product[0].images
        this.arr = image
        this.showSpinner = false

      })
    })
  }



  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1
    }
  }

  changeImage(element: any, i: any) {
    this.showSpinner = true
    this.product[0].thumbnail = element.arr[i]
    this.showSpinner = false
  }

  AddToCart() {
    if (this.product) {
      this.product[0].quantity = this.productQuantity

      let controll = this.auth.getSellerId()

      if (controll.role === 'user') {
        //Getting user id 
        let user = controll.id
        let cart: any = {
          user: user,
          seller: null,
          quantity: this.productQuantity,
          product: this.product[0],
        }
        this.productApi.addToCart(cart).subscribe((res) => {
          console.log(res);

        })
      } else if (controll.role === 'seller') {
        //Getting user id 
        let seller = controll.id
        let cart: any = {
          user: null,
          seller: seller,
          quantity: this.productQuantity,
          product: this.product[0],
        }
        this.productApi.addToCart(cart).subscribe((res) => {
         
          if(res){
            console.log(res);
         

          }

        })
      }
    }
  }


  addToWishlist(productId: string): void {
    this.wishlist.addToWishlist(productId).subscribe(
      (response) => {
        if (response) {
          console.log(response);
          this.product[0].isWishlist = response.isWishlist;
          this.wishlisted = this.product[0].isWishlist;
          this.data()
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
