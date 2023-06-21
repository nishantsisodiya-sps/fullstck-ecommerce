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
  showSpinner : boolean = false

  productId : any
  show : boolean = false
  orderId : any
  selectedOption : any;
  shippingAddress : any;
  shippingCompany : any;

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
    this.showSpinner = true
    let id = this.auth.getSellerId().id

    this.sellerStatus.getproductInfo(id).subscribe(res=>{
      console.log(res);
      // this.productStatusForSeller = res
      this.orders = new MatTableDataSource<order>(res);
      this.orders.paginator = this.paginator;
      this.showSpinner = false
    })
  }

  getId(order : any){
    this.orderId = order.product.oderId
    this.productId = order.product._id
  }

  onDropdownChange(){
    if(this.selectedOption !== 'Placed'){
      this.show = true
    }
  }


  updateStatus(){
    this.showSpinner = true
    let data = {
      orderId : this.orderId,
      productId : this.productId,
      status : this.selectedOption,
      shippingCompany : this.shippingCompany,
      shippingCompanyAddress : this.shippingAddress
    }
    console.log(data);

    this.sellerStatus.updateStatus(data).subscribe(res=>{
      if(res){
        this.showSpinner = false
        alert('Order Updated')
      }
    })
  }



}
