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


  getOrders() {
    this.showSpinner = true;
    this.admin.getAllOrders().subscribe((res: any) => {
      const data: any[] = res.orders;
      const filteredOrders: any[] = [];
  
      data.forEach((element: any) => {
        if (element.productDetails && element.productDetails.product !== null) {
          filteredOrders.push(element);
        }
      });
  
      this.orders = filteredOrders
    });
  }
  
  
}