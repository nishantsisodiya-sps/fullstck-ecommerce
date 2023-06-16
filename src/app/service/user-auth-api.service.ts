import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthApiService {

  public ApiUrl = 'https://ecombackend.softprodigyphp.in'
  // public ApiUrl = 'http://localhost:3838'

  constructor(private http: HttpClient) { }

  private getHeadersWithAuthorization(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getProducts(): Observable<any> {
    const headers = this.getHeadersWithAuthorization();
    return this.http.get(`${this.ApiUrl}/products`, { headers });
  }

  getSingleProduct(id: any): Observable<any> {
    const headers = this.getHeadersWithAuthorization();
    return this.http.get(`${this.ApiUrl}/products/${id}`, { headers });
  }



  addProduct(data: any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };
   return this.http.post<any>(`${this.ApiUrl}/products` , data , options)
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


  getUserProfile(id : any):Observable<any>{
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${this.ApiUrl}/users/profile/${id}` , {headers})

  }


  getAllUsers():Observable<any>{

    return this.http.get(`${this.ApiUrl}/users/Allusers`)

  }


  getAllSellers():Observable<any>{

    return this.http.get(`${this.ApiUrl}/sellers/AllSellers`)

  }


}
