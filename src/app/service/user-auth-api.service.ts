import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthApiService {

  public ApiUrl = 'http://localhost:3838'

  constructor(private http: HttpClient) { }

  addProduct(data: any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };
   return this.http.post<any>(`${this.ApiUrl}/products` , data , options)
  }



  getProducts():Observable<any>{
    return this.http.get(`${this.ApiUrl}/products`)
  }


  getSingleProduct(id : any):Observable<any>{
    return this.http.get(`${this.ApiUrl}/products/${id}`)
  }


  getSellerProducts(id : any):Observable<any>{

    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${this.ApiUrl}/products/seller/${id}` , {headers})
  }


  getSellerProfile(id : any):Observable<any>{

    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${this.ApiUrl}/sellers/profile/${id}` , {headers})

  }
}
