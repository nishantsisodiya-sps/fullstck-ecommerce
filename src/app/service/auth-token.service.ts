import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  public decodedToken: any;
  constructor() { 

    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = jwtDecode(token);
    }
  }

  getSellerId(): any {
    if (this.decodedToken) {
      return this.decodedToken
    }
    return null;
  }

  
}
