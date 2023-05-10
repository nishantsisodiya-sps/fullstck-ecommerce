import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  public decodedToken: any;
  constructor(private http : HttpClient) { 

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


  contactus(data : any):Observable<any>{
    return this.http.post('http://localhost:2800/support' , data)
  }

  
}
