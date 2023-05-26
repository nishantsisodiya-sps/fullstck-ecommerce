import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  sellerLoginForm !: FormGroup
  sellerSignupForm !: FormGroup
  signupdata: [] = []
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router , private api : UserAuthApiService) {

    this.sellerLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    })

    this.sellerSignupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    })

  }

  ngOnInit(): void {

  }


  submitseller() {
    let data = this.sellerSignupForm.value;

    this.http.post<{ success: boolean, token: string }>
      ('https://ecombackend.softprodigyphp.in/sellers/register', data)
      .subscribe(response => {
        if (response.success) {
          localStorage.removeItem('token')
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']).then(()=>{
            window.location.reload();
          })
        } else {
          alert("Something went wrong");
        }
      })
  }



  loginseller(event: Event) {
    event.preventDefault();
    let data = this.sellerLoginForm.value;
    this.http.post<{ success: boolean, message: string, token: string }>
      ('https://ecombackend.softprodigyphp.in/sellers/login', { email: data.email, password: data.password })
      .subscribe(response => {
        if (response.success) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']).then(()=>{
            window.location.reload()
          })
        } else {
          alert(response.message);
        }
      });
  }


 


}
