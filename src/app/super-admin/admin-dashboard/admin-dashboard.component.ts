import { Component, OnInit } from '@angular/core';
import { single } from 'src/app/interface/singlt';
import { SellerDashboardService } from 'src/app/service/seller-dashboard.service';
import { SuperAdminService } from 'src/app/service/super-admin.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  topOrders : any = []
  totalRevenue : any
  totalOrder : any
  allSellers : any = []
  SellerProducts : any = []
  constructor(private superAdmin : SuperAdminService , private userAuth : UserAuthApiService) { }

  ngOnInit(): void {
    this.getDetails()
    this.getSellers()
   
    
  }


  getDetails(){
    this.superAdmin.getRevuenue().subscribe(res=>{
      this.topOrders = res.topProducts
      this.totalRevenue = res.totalRevenue
      this.totalOrder = res.totalOrderCount
    })
  }


  getSellers(){
    this.userAuth.getAllSellers().subscribe(res=>{
      this.allSellers = res
      this.allSellers[0].open = true;
    })
  }

  getSellerProducts(id:any){
    this.userAuth.getSellerProducts(id).subscribe(res=>{
      this.SellerProducts =  res
    })
  }

}
