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
  showSpinner :boolean = false

  sellerProducts: any = []
  productStatus: any = []
  single: any = [];
  details : any = []

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
    this.showSpinner = true
    const sellerId = this.auth.getSellerId();
    const id = sellerId.id;

    // Combine the API calls using forkJoin
    forkJoin({
      products: this.api.getSellerProducts(id),
      status: this.sellerStatus.getSellerProductStatus(id)
    }).subscribe((res: any) => {
      this.details.push(res.products[0]) 
      this.sellerProducts = res.products;
      this.productStatus = res.status;
     

      this.single = this.sellerProducts.map((item: any) => ({
        name: item.title,
        value: 0
      }));

      this.updateSingleArray();
      this.showSpinner = false
    });
  }

  updateSingleArray() {
    for (const status of this.productStatus) {
      const productIndex = this.single.findIndex((item: any) => item.name === status.product.title);
      if (productIndex !== -1) {

        let discountedPrice = Math.round( status.product.price - (status.product.price * status.product.discountPercentage) / 100)
        const revenue = Math.round(discountedPrice * (status.quantitySold || 0 ) * 80);
        this.single[productIndex].value = revenue;
      }
    }
   

  }


  calculateTotalRevenue(): number {
    let totalRevenue = 0;
    for (const status of this.productStatus) {

      let discount = status.product.price * status.product.discountPercentage / 100
      let price =  status.product.price - discount
      const revenue = Math.round(price * 80 * (status.quantitySold || 0));
      totalRevenue +=  revenue;

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


  calculatePriceAfterDiscount(item: any): number {
    // Calculate price after discount
    let discountedPrice = item.price - (item.price * item.discountPercentage) / 100;

    return Math.round(discountedPrice);
  }
  
  getProductSold(item: any): number {

    // Find the corresponding product status based on item ID

    const productStatus = this.productStatus.find((status: any) => status._id === item._id);
    if (productStatus) {
      return productStatus.quantitySold;
    }
    return 0;
  }
  
  calculateRevenue(item: any): number {
    const productSold = this.getProductSold(item);
    const priceAfterDiscount = this.calculatePriceAfterDiscount(item);
    const revenue = priceAfterDiscount * productSold;
    return revenue;
  }

  

  }
