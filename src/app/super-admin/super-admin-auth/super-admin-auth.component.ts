import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin-auth',
  templateUrl: './super-admin-auth.component.html',
  styleUrls: ['./super-admin-auth.component.css']
})
export class SuperAdminAuthComponent implements OnInit {

  showSpinner : any

  public url = 'https://ecombackend.softprodigyphp.in'
  // public url = 'http://localhost:3838'

  adminForm !: FormGroup

  @ViewChild('loginPasswordInput', { static: false }) loginPasswordInput: ElementRef<HTMLInputElement> | undefined;

  constructor(
      private http:HttpClient , 
      private router: Router ,
      private fb:FormBuilder,
      private renderer : Renderer2
      ) { }

  ngOnInit(): void {

    this.adminForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

  }

  
  loginAdmin(){
    this.showSpinner = true
    let data = this.adminForm.value
    this.http.post<{success: boolean, message: string, token: string}>
    (`${this.url}/superAdmin/login` , data).subscribe(Response=>{
      if(Response.success){
        localStorage.setItem('token' , Response.token)
        this.showSpinner = false
        this.router.navigate(['/superAdmin']).then(() => {
          window.location.reload()
         
        })
      } else {
        alert(Response.message);
      }
      })
  }


  togglePassword(passwordInput: HTMLInputElement): void {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    this.renderer.setProperty(passwordInput, 'type', type);
  }

}
