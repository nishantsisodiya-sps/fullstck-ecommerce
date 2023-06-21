import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { SellerDashboardService } from 'src/app/service/seller-dashboard.service';


export interface stock {
  thumbnail: string;
  title: string;
  sold: number;
  stock: number;
  _id : string
}


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  showSpinner : boolean = false

  stocks!: MatTableDataSource<stock>;

  displayedColumns: string[] = ['_id' ,'thumbnail', 'title', 'sold', 'stock' ];


  @ViewChild(MatPaginator) paginator : any | MatPaginator;


  constructor(
    private stock : SellerDashboardService,
    private auth : AuthTokenService
    ) { }

  ngOnInit(): void {
    this.getStocks()
  }


  getStocks(){
    this.showSpinner = true
    let id = this.auth.getSellerId().id
 

    this.stock.getStock(id).subscribe(res=>{
      this.stocks = new MatTableDataSource<stock>(res);
      this.stocks.paginator = this.paginator;
      this.showSpinner = false
    })
  }

}
