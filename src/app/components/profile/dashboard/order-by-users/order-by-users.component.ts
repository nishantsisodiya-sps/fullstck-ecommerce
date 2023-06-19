import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { SellerDashboardService } from 'src/app/service/seller-dashboard.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-order-by-users',
  templateUrl: './order-by-users.component.html',
  styleUrls: ['./order-by-users.component.css']
})
export class OrderByUsersComponent implements OnInit {

  productStatusForSeller : any = []

  constructor(
    private sellerStatus: SellerDashboardService,
    private auth: AuthTokenService,

  ) { }

  ngOnInit(): void {
    this.getStatus()
  }


  getStatus(){

    let id = this.auth.getSellerId().id

    this.sellerStatus.getproductInfo(id).subscribe(res=>{
      console.log(res);
      this.productStatusForSeller = res
    })
  }

}
