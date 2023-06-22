import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { UpdateProfileService } from 'src/app/service/update-profile.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  updateDetails !: FormGroup
  changePassword !: FormGroup
  myAddress: any = []
  profile: any = []
  isEditMode: boolean = false;
  showSpinner : boolean = false




  constructor(
    private api: UserAuthApiService, 
    private auth: AuthTokenService,
    private update : UpdateProfileService
  ) {





    this.updateDetails = new FormGroup({
      email: new FormControl(''),
      phone: new FormControl(''),
      name: new FormControl(''),
    });


    this.changePassword = new FormGroup({
      CurrentPassword: new FormControl(''),
      ConfirmPassword: new FormControl(''),
      NewPassword: new FormControl('', Validators.required),
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.getProfile()
  }

  
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const newPassword = control.get('NewPassword')?.value;
    const confirmPassword = control.get('ConfirmPassword')?.value;

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  getProfile() {
    this.showSpinner = true
    let user = this.auth.getSellerId()
    let id = user.id
    let role = user.role

    if (role === 'seller') {
      this.api.getSellerProfile(id).subscribe(response => {
        this.profile.push(response.seller)
        this.showSpinner = false
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

  editData(){
    this.updateDetails.patchValue({
      email: this.profile[0].email,
      phone: this.profile[0].phone,
      name: this.profile[0].name,
    });
  }

  updateProfile(){

    let user = this.auth.getSellerId()
    let data = this.updateDetails.value

    if(user.role === 'user'){
      let userId = user.id
      this.update.updateUserDetails(userId , data).subscribe(res=>{
        if(res){
          console.log(res);
          window.location.reload()
        }
      })
    }else if(user.role === 'seller'){
      let sellerId = user.id
      this.update.updateSellerDetails(sellerId , data).subscribe(res=>{
        if(res){
          console.log(res);
          window.location.reload()
        }
      })
    }
    else {
      alert("Unable to update")
    }

  }





  updatePassword() {
    let user = this.auth.getSellerId();
    let data = this.changePassword.value;
  
    if (user.role === 'user') {
      let userId = user.id;
  
      this.update.changePassword(userId , null, data).subscribe(res => {
        console.log(res);
      });
    } else if (user.role === 'seller') {
      let sellerId = user.id;
  
      this.update.changePassword(null, sellerId, data).subscribe(res => {
        console.log(res);
      });
    }
  }
 
}
