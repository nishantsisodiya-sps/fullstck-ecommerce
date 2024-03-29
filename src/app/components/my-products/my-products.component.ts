import { Component, OnInit } from '@angular/core';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';


@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
})
export class MyProductsComponent implements OnInit {
  showSpinner: boolean = false;
  products: any = [];

  constructor(private api: UserAuthApiService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.showSpinner = true;
    this.api.getProducts().subscribe((response) => {
      this.products = response.products;
      this.showSpinner = false;
    });
  }
}
