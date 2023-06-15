import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SuperAdminService } from 'src/app/service/super-admin.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-sellers-listing',
  templateUrl: './sellers-listing.component.html',
  styleUrls: ['./sellers-listing.component.css']
})
export class SellersListingComponent implements OnInit, AfterViewInit {
  sellers!: MatTableDataSource<Seller>;
  displayedColumns: string[] = ['name', 'email', 'phone', 'createdAt', 'action'];

  @ViewChild(MatPaginator) paginator: any | MatPaginator;

  constructor(private auth: UserAuthApiService , private superAdmin : SuperAdminService) { }

  ngOnInit(): void {
    this.getAllSellers();
  }

  ngAfterViewInit(): void {
    this.sellers.paginator = this.paginator;
  }

  getAllSellers(): void {
    this.auth.getAllSellers().subscribe(
      (res: Seller[]) => {
        this.sellers = new MatTableDataSource<Seller>(res);
        this.sellers.paginator = this.paginator;
      },
      (error: any) => {
        console.log('Get users error', error);
      }
    );
  }

  deleteSeller(id: any) {
    console.log(id);
  }

  blockSeller(id: any) {
    this.superAdmin.blockSeller(id).subscribe(res=>{
      console.log(res);
    })
  }
}

export interface Seller {
  name: string;
  email: string;
  phone: number;
  _id: string;
  createdAt: Date;
}
