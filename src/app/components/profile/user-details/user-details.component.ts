import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  myAddress: any = []
  profile: any = []
  isEditMode: boolean = false;
  showSpinner : boolean = false
  constructor(private api: UserAuthApiService, private auth: AuthTokenService,
  
  ) { }

  ngOnInit(): void {
    this.getProfile()

  }


  getProfile() {
    this.showSpinner = true
    let user = this.auth.getSellerId()
    let id = user.id
    let role = user.role

    if (role === 'seller') {
      this.api.getSellerProfile(id).subscribe(response => {
        this.profile.push(response)

      })
    }
    else if (role === 'user') {
      this.api.getUserProfile(id).subscribe(res => {
        this.profile.push(res)

        this.showSpinner = false
      })
    }

  }
  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }


 
}
