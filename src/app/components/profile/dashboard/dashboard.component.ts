import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { SellerDashboardService } from 'src/app/service/seller-dashboard.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sellerProducts: any = []
  productStatus: any = []
  single: any = [];


  multi?: any[];
  view: [number, number] = [800, 250];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  scale : any;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Revenue';
  showYAxisLabel = true;
  yAxisLabel = 'Products';
  colorScheme: any = {
    domain: ['#a8385d', '#aae3f5', '#7aa3e5', '#a27ea8']
  };

  constructor(private sellerStatus: SellerDashboardService, private auth: AuthTokenService, private api: UserAuthApiService) {

  }

  ngOnInit(): void {
    this.fetchData()
  }


  fetchData() {
    const sellerId = this.auth.getSellerId();
    const id = sellerId.id;

    // Combine the API calls using forkJoin
    forkJoin({
      products: this.api.getSellerProducts(id),
      status: this.sellerStatus.getSellerProductStatus(id)
    }).subscribe((res: any) => {
      this.sellerProducts = res.products;
      this.productStatus = res.status;

      this.single = this.sellerProducts.map((item: any) => ({
        name: item.title,
        value: 0
      }));

      this.updateSingleArray();
    });
  }

  updateSingleArray() {
    for (const status of this.productStatus) {
      const productIndex = this.single.findIndex((item: any) => item.name === status.product.title);
      if (productIndex !== -1) {
        const revenue = status.product.price * 80 * (status.quantitySold || 0);
        this.single[productIndex].value = revenue;
      }
    }
   

  }


  calculateTotalRevenue(): number {
    let totalRevenue = 0;
    for (const status of this.productStatus) {
      const revenue = status.product.price * 80 * (status.quantitySold || 0);
      totalRevenue += revenue;
    }
    return totalRevenue;
  }
  
  calculateTotalQuantitySold(): number {
    let totalQuantitySold = 0;
    for (const status of this.productStatus) {
      totalQuantitySold += status.quantitySold || 0;
    }
    return totalQuantitySold;
  }

  }
