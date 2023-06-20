import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { SellerDashboardService } from 'src/app/service/seller-dashboard.service';


export interface order {
  thumbnail: string;
  title: string;
  Quantity: number;
  Payment: number;
  orderId : string
  status : string
}


@Component({
  selector: 'app-order-by-users',
  templateUrl: './order-by-users.component.html',
  styleUrls: ['./order-by-users.component.css']
})


export class OrderByUsersComponent implements OnInit {
  selectedOption : any;

  dropdown : any = ['Placed', 'Packed', 'Shipped', 'Delivered']

  orders!: MatTableDataSource<order>

  displayedColumns: string[] = ['orderId' ,'thumbnail', 'title', 'Quantity', 'Payment' , 'status' ];


  @ViewChild(MatPaginator) paginator : any | MatPaginator;

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
      // this.productStatusForSeller = res
      this.orders = new MatTableDataSource<order>(res);
      this.orders.paginator = this.paginator;
    })
  }


  

}
