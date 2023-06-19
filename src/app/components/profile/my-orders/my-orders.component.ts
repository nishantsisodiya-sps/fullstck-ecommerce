import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  name : any
  orders : any = []
  orderProducts : any = []
  totalAmount : any
  showSpinner : boolean = false
  constructor(private order : OrderService , private activateRoute : ActivatedRoute) { }

  ngOnInit(): void {
   this.getInfo()
  }


  getInfo(){
    this.showSpinner = true
    this.activateRoute.paramMap.subscribe(params=>{
      let id = params.get('id')
      let productId = params.get('productId')

      
      this.order.getOrderInfo(id , productId).subscribe(res=>{
        this.orders.push(res)
        this.orderProducts = this.orders[0].products
        console.log(this.orderProducts);
        this.totalAmount = this.orders[0].amount
        this.name = this.orders[0].name
        this.showSpinner = false
      })
    })
  }

  

}
