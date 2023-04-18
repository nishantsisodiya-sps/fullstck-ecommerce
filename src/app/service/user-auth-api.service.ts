import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login, signup } from '../interface/userInterface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthApiService {

  public ApiUrl = 'http://localhost:2800'

  constructor(private http: HttpClient, private router: Router) { }


  // userSignup(data: signup) {
  //   this.http.post<signup>(`${this.ApiUrl}/user/signup`, data, { observe: 'response' })
  //     .subscribe(result => {
  //       if (result) {
  //         this.router.navigate(['/home'])
  //       }
  //     })
  // }


  // userLogin(data: login) {
  //   this.http.post<{ success: boolean, message: string, token: string }>
  //   (`${this.ApiUrl}/user/login`, data, { observe: 'response' })
  //     .subscribe(response => {
  //       if (Response) {
  //         localStorage.setItem('token', response.token);
  //         this.router.navigate(['/home'])
  //       } else {
  //         alert("Invalid credentials")
  //       }
  //     })
  // }

  getUserData(): Observable<any> {
    return this.http.get(`${this.ApiUrl}/user/signup/data`)
  }

}
