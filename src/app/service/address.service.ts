import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  // public ApiUrl = 'https://ecombackend.softprodigyphp.in'
  public ApiUrl = 'http://localhost:3838'
  constructor(private http : HttpClient) { }


  addAddress(data : any):Observable<any>{
    
    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post(`${this.ApiUrl}/address/add` , data , {headers})
  }

}
