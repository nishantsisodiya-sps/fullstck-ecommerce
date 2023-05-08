import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData : any = []
  myorder : any = []
  cartItems : any = []
  cartLength : any
  orderLength : any
  constructor(private auth : AuthTokenService , private order : OrderService,
    private product : ProductService) { }

  ngOnInit(): void {
    this.getUserInfo()
    this.getOrders()
  }


  getUserInfo(){
    let data  = this.auth.getSellerId()
    this.userData.push(data)
  }


  getOrders(){
    let id  = this.auth.getSellerId().id

    this.order.getOrders(id).subscribe(res=>{
      this.myorder = res
      this.orderLength = this.myorder.length


      //Getting cart item length
      this.product.getCartItems(id).subscribe(res=>{
        this.cartItems = res
        console.log(this.cartItems);
        this.cartLength = this.cartItems.length
      })
    
    })

  }


}
