import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  showSpinner : any = false

  @ViewChild('passwordInput', { static: false }) passwordInput: ElementRef | undefined;

  constructor(private fb: FormBuilder, private router: Router, private userAuthApi: UserAuthApiService, private http: HttpClient) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    })
  }

  ngOnInit(): void {
  }

  submitUser() {
    this.showSpinner = true
    let data = this.signupForm.value;

    this.http.post<{ message: boolean, token: string }>
      ('https://ecombackend.softprodigyphp.in/users/register', data)
      .subscribe(response => {
        if (response.message) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']).then(()=>{
            window.location.reload()
            this.showSpinner = false
          })
        } else {
          alert("something wrong");
        }
      })
  }


  loginUser(event: Event) {
    this.showSpinner = true
    // event.preventDefault();
    // let data = this.loginForm.value;


    // this.http.post<{ success: boolean, message: string, token: string }>
    //   ('https://ecombackend.softprodigyphp.in/users/login', { email: data.email, password: data.password })
    //   .subscribe(response => {
    //     if (response.success) {
    //       localStorage.setItem('token', response.token);
    //       this.router.navigate(['/']).then(()=>{
    //         window.location.reload()
    //         this.showSpinner = false
    //       })
    //     } else {
    //       alert(response.message);
    //     }
    //   });
  }



  togglePassword(): void {
    const passwordInput = this.passwordInput?.nativeElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

}


