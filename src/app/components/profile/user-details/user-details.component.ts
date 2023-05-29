import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddressService } from 'src/app/service/address.service';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  profile: any = []
  isEditMode: boolean = false;
  myAddress: any = []

  constructor(private api: UserAuthApiService, private auth: AuthTokenService,
    private address: AddressService
  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.getAddress()
  }


  getProfile() {

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


      })
    }

  }
  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }


  getAddress() {
    this.address.getAddresses().subscribe(res => {
      const data = res as any
      this.address = data.addresses
      
     
    }
    )
  }
}
