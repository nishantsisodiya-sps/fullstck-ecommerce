import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';
import { SuperAdminService } from 'src/app/service/super-admin.service';



@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.css']
})


export class UsersListingComponent implements OnInit  {
  showSpinner : any
  allUsers:any = []

  constructor(private auth : UserAuthApiService , private superAdmin : SuperAdminService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }


  getAllUsers(): void {
    this.showSpinner = true
    this.auth.getAllUsers().subscribe(
      (res) => {
        this.allUsers = res

        this.showSpinner = false
      },
      (error: any) => {
        console.log('Get users error', error);
      }
    );
  }


  deleteUser(id:any){
    console.log(id);
  }

  blockUser(id:any){
    this.showSpinner = true
    this.superAdmin.blockUser(id).subscribe(res=>{
      if(res){
        this.getAllUsers()
      }
      this.showSpinner = false
    })
  }
}
