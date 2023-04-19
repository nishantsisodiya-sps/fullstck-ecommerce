import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  loginForm !: FormGroup
  signupForm !: FormGroup
  signupdata: [] = []
  constructor(private fb: FormBuilder, private router: Router, private userAuthApi: UserAuthApiService, private http: HttpClient) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      Cpassword: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  submitUser() {
    let data = this.signupForm.value;

    this.http.post<{ success: boolean, message: string, token: string }>
      ('https://ecom-backend-file.onrender.com/user/signup', data)
      .subscribe(response => {
        if (response.success) {
          localStorage.setItem('Usertoken', response.token);
          this.router.navigate(['/']).then(()=>{
            window.location.reload()
          })
        } else {
          alert(response.message);
        }
      })
  }


  loginUser(event: Event) {
    event.preventDefault();
    let data = this.loginForm.value;


    this.http.post<{ success: boolean, message: string, token: string }>
      ('https://ecom-backend-file.onrender.com/user/login', { email: data.email, password: data.password })
      .subscribe(response => {
        if (response.success) {
          localStorage.setItem('Usertoken', response.token);
          this.router.navigate(['/']).then(()=>{
            window.location.reload()
          })
        } else {
          alert(response.message);
        }
      });
  }
}


