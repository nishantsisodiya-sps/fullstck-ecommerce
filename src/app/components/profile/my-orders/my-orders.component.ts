import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  name: any;
  orders: any = [];
  orderProducts: any = [];
  totalAmount: any;
  showSpinner: boolean = false;
  orderStatus: any;

  constructor(
    private order: OrderService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.showSpinner = true;
    this.activateRoute.queryParams.subscribe((params) => {
      let id = params['id'];
      let productId = params['productId'];
      this.order.getOrderInfo(id, productId).subscribe((res) => {
        this.orders.push(res);
        this.orderProducts = this.orders[0].products;
        this.totalAmount = this.orders[0].amount;
        this.name = this.orders[0].name;
        this.showSpinner = false;
        this.orderStatus = res.status; // Assuming `status` is the property representing the order status

        // Update the progress bar based on the order status
        this.updateProgressBar();
      });
    });
  }

  updateProgressBar() {
    const progressBarElements = document.querySelectorAll(
      '.card-stepper ul li'
    );

    progressBarElements.forEach((element, index) => {
      if (index === 0 && this.orderStatus === 'placed') {
        element.classList.add('active');
      } else if (index === 1 && this.orderStatus === 'packed') {
        element.classList.add('active');
      } else if (index === 2 && this.orderStatus === 'shipped') {
        element.classList.add('active');
      } else if (index === 3 && this.orderStatus === 'delivered') {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }
}
