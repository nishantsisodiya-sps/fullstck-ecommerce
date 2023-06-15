import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';
import { SuperAdminService } from 'src/app/service/super-admin.service';


export interface User {
  name: string;
  email: string;
  phone: number;
  _id: string;
  createdAt : Date
}



@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.css']
})


export class UsersListingComponent implements OnInit , AfterViewInit {

  users!: MatTableDataSource<User>;

  displayedColumns: string[] = ['name', 'email', 'phone', 'createdAt' , 'action'];


  @ViewChild(MatPaginator) paginator : any | MatPaginator;

  constructor(private auth : UserAuthApiService , private superAdmin : SuperAdminService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }


  ngAfterViewInit() {
    this.users.paginator = this.paginator;
  }

  getAllUsers(): void {
    this.auth.getAllUsers().subscribe(
      (res: User[]) => {
        this.users = new MatTableDataSource<User>(res);
        this.users.paginator = this.paginator;
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
    this.superAdmin.blockUser(id).subscribe(res=>{
      console.log(res);
    })
  }
}
