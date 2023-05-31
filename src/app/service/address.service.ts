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


  getAddresses(){
    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get(`${this.ApiUrl}/address/get` , {headers})

}

  updateAddress(id : any , data:any){
   
    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put(`${this.ApiUrl}/address/${id}` ,data , {headers})
  }


  deleteAddress(id : any){
    
    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.delete(`${this.ApiUrl}/address/${id}` , {headers})

  }

}
