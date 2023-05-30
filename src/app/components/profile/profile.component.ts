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

  forseller : boolean =  false
  paid : boolean = false
  constructor(private auth : AuthTokenService , private order : OrderService,
    private product : ProductService) { }

  ngOnInit(): void {
    this.getUserInfo()


    let seller = this.auth.getSellerId().role
    if(seller === 'seller'){
      this.forseller = true
    }else{
      this.forseller = false
    }

  }


  getUserInfo(){
    let data  = this.auth.getSellerId()
    this.userData.push(data)
  }




}
