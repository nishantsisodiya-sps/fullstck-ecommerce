import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetPasswordService } from 'src/app/service/forget-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm !: FormGroup

  constructor(private forgetPassword : ForgetPasswordService , private router : Router) { }

  ngOnInit(): void {

    this.resetPasswordForm = new FormGroup({
      NewPassword: new FormControl(''),
      ConfirmPassword: new FormControl(''),
     
    });


  }


  savePassword(){
   let data = this.resetPasswordForm.value

   this.forgetPassword.resetPassword(data).subscribe(res=>{
    console.log(res);
   })


  }

}
