import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SuperAdminService } from 'src/app/service/super-admin.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-sellers-listing',
  templateUrl: './sellers-listing.component.html',
  styleUrls: ['./sellers-listing.component.css']
})
export class SellersListingComponent implements OnInit, AfterViewInit {

  showSpinner : any

  allSellers : any = []

  constructor(private auth: UserAuthApiService , private superAdmin : SuperAdminService) { }

  ngOnInit(): void {
    this.getAllSellers();
  }

  ngAfterViewInit(): void {
  
  }

  getAllSellers(): void {
    this.showSpinner = true
    this.auth.getAllSellers().subscribe(
      (res) => {
       this.allSellers = res
        this.showSpinner = false
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
    this.showSpinner = true
    this.superAdmin.blockSeller(id).subscribe(res=>{
      if(res){
        this.getAllSellers()
      }
      this.showSpinner = false
    })
  }
}


