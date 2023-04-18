import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  sellerLoginForm !: FormGroup
  sellerSignupForm !: FormGroup
  signupdata: [] = []
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {

    this.sellerLoginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]

    })

    this.sellerSignupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      Cpassword: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {
  }


  submitseller() {
    let data = this.sellerSignupForm.value;

    this.http.post<{ success: boolean, message: string, token: string }>
      ('http://localhost:2800/seller/signup', data)
      .subscribe(response => {
        if (response.success) {
          localStorage.removeItem('Usertoken')
          localStorage.setItem('Sellertoken', response.token);
          this.router.navigate(['/']).then(()=>{
            window.location.reload();
          })
        } else {
          alert(response.message);
        }
      })
  }



  loginseller(event: Event) {
    event.preventDefault();
    let data = this.sellerLoginForm.value;
    this.http.post<{ success: boolean, message: string, token: string }>
      ('http://localhost:2800/seller/login', { email: data.email, password: data.password })
      .subscribe(response => {
        if (response.success) {
          localStorage.setItem('Sellertoken', response.token);
          this.router.navigate(['/']).then(()=>{
            window.location.reload()
          })
        } else {
          alert(response.message);
        }
      });
  }

}
