import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
  private Authenticated: boolean = false;


  constructor() {
    this.Authenticated = this.checkTokenValidity();
   }

  isAuthenticated(): boolean {
    return this.Authenticated;
  }

  private checkTokenValidity(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
  }

  
}

