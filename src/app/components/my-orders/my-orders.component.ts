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
  constructor(private order : OrderService , private activateRoute : ActivatedRoute) { }

  ngOnInit(): void {
   this.getInfo()
  }


  getInfo(){
    this.activateRoute.paramMap.subscribe(params=>{
      let id = params.get('id')
      
      this.order.getOrderInfo(id).subscribe(res=>{
        this.orders.push(res)
        this.orderProducts = this.orders[0].products
        this.totalAmount = this.orders[0].amount
        this.name = this.orders[0].name
        console.log(this.totalAmount);

      })
    })
  }

  

}
