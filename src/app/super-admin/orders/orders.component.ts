import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from 'src/app/service/super-admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  showSpinner : any
  orders : any = []

  constructor(private admin : SuperAdminService) {}

  ngOnInit(): void {
    this.getOrders()
  }


  getOrders(){
    this.showSpinner = true
    this.admin.getAllOrders().subscribe(res=>{
      this.orders = res.orders
      console.log(this.orders);
      this.showSpinner = false
    })
  }

}
