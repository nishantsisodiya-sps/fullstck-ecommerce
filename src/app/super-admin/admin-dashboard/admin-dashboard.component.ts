import { Component, OnInit } from '@angular/core';
import { single } from 'src/app/interface/singlt';
import { SuperAdminService } from 'src/app/service/super-admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  single?: any[];
  view: [number , number] = [500, 400];
  
  showLegend: boolean = true;
  showLabels: boolean = true;
  
  colorScheme : any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  topOrders : any = []
  totalRevenue : any
  totalOrder : any
  
  constructor(private superAdmin : SuperAdminService) { }

  ngOnInit(): void {
    Object.assign(this, { single });
    this.getDetails()
  }


  getDetails(){
    this.superAdmin.getRevuenue().subscribe(res=>{
      this.topOrders = res.topProducts
      this.totalRevenue = res.totalRevenue
      this.totalOrder = res.totalOrderCount
    })
  }

}
