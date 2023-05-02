import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { ProductService } from 'src/app/service/product.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';
import { PipePipe } from 'src/app/service/pipe.pipe';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products : any = [];
  totalCart : any
  PriceAfterDiscount : any
  totalPrice: number = 0;
  totalDiscount: number = 0;
  constructor(private api : UserAuthApiService , private productApi : ProductService,
    private auth : AuthTokenService) { }

  ngOnInit(): void {
    this.getcartItems()
  }

  getcartItems(){
    let seller = this.auth.getSellerId().id
   
    this.productApi.getCartItems(seller).subscribe(res=>{
      this.products = res
      this.totalCart =  this.products.length


      let totalPrice = 0;
      let totalDiscount = 0;
      for (let item of this.products) {
        let quantity = item.quantity 
        let Realprice = item.product.price * quantity
        let priceInRupee = Realprice * 80 * quantity
        let discount = item.product.discountPercentage
        let discountp = Math.round(priceInRupee * discount / 100)
        let priceAfterDiscount = priceInRupee - discountp
        item.PriceAfterDiscount = priceAfterDiscount
        totalPrice += priceAfterDiscount
        totalDiscount += discountp
      }
      this.totalPrice = totalPrice + 100;
      this.totalDiscount = totalDiscount;
    })
    }

    deleteFromCart(itemId : any){
    console.log(itemId);
      this.productApi.deleteFromCart(itemId).subscribe(res=>{
        if(res){
          this.products = this.products.filter((item:any) => item.id !== itemId);
        }else{
          console.log("error occured");
        }
      })
    }
  }

  
