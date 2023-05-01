import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { ProductService } from 'src/app/service/product.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products : any = [];
  totalCart : any

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
    })
  }

}
