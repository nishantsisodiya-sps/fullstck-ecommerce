import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  showSpinner : boolean = false
  userData : any = []
  myorder : any = []
  cartItems : any = []
  cartLength : any
  orderLength : any
  forseller : boolean =  false
  paid : boolean = false

  constructor(private auth : AuthTokenService , private order : OrderService,
    private product : ProductService , private router : Router) { }

  ngOnInit(): void {

    this.getUserInfo()
    this.getOrders()

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


  getOrders(){
    this.showSpinner = true
    let id  = this.auth.getSellerId().id

    this.order.getOrders(id).subscribe(res=>{
      this.myorder = res
      this.orderLength = this.myorder.length

      


      //Getting cart item length
      this.product.getCartItems(id).subscribe(res=>{
        if(!res){
          this.showSpinner = false
          alert('No order found')
        }
        this.cartItems = res
          this.cartLength = this.cartItems.length
          this.showSpinner = false
      })
      
    })

  }


  sendId(id:any , productId:any){
    const navigationExtras: NavigationExtras = {
      queryParams: { id: id, productId: productId }
    };
    this.router.navigate(['profile/MyOrder'] , navigationExtras)

  }




}
