import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showSpinner: boolean = false
  sellerLoginForm !: FormGroup
  sellerSignupForm !: FormGroup
  signupdata: [] = []


  @ViewChild('loginPasswordInput', { static: false }) loginPasswordInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('signupPasswordInput', { static: false }) signupPasswordInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private renderer: Renderer2
  ) {

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
    this.showSpinner = true
    let data = this.sellerSignupForm.value;

    this.http.post<{ success: boolean, token: string }>
      ('https://ecombackend.softprodigyphp.in/sellers/register', data)
      .subscribe(response => {
        if (response.success) {
          localStorage.removeItem('token')
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']).then(() => {
            window.location.reload();
            this.showSpinner = false
          })
        } else {
          alert("Something went wrong");
        }
      })
  }



  loginseller(event: Event) {
    this.showSpinner = true
    event.preventDefault();
    let data = this.sellerLoginForm.value;
    this.http.post<{ success: boolean, message: string, token: string }>
      ('https://ecombackend.softprodigyphp.in/sellers/login', { email: data.email, password: data.password })
      .subscribe(response => {
        if (response.success) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']).then(() => {
            window.location.reload()
            this.showSpinner = false
          })
        } else {
          alert(response.message);
        }
      });
  }


  togglePassword(passwordInput: HTMLInputElement): void {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    this.renderer.setProperty(passwordInput, 'type', type);
  }


}
