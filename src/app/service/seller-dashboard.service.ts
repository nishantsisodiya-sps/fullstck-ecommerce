import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerDashboardService {

  // public url = 'https://ecombackend.softprodigyphp.in'
  public url = 'http://localhost:3838'

  constructor(private http : HttpClient) { }

  private getHeadersWithAuthorization(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getSellerProductStatus(id:any):Observable<any>{
    const headers = this.getHeadersWithAuthorization()
    return this.http.get(`${this.url}/sellers/sold-products/${id}` , {headers})
  }



  getproductInfo(id:any):Observable<any>{
    const headers = this.getHeadersWithAuthorization()
    return this.http.get(`${this.url}/sellers/sold-productsNew/${id}` , {headers})
  }



  getStock(id:any):Observable<any>{
    const headers = this.getHeadersWithAuthorization()
    return this.http.get(`${this.url}/sellers/getProductStockAndSoldCount/${id}` , {headers})
  }



  updateStatus(data : any):Observable<any>{
    const headers = this.getHeadersWithAuthorization()
    return this.http.post(`${this.url}/sellers/updateStatus` , data , {headers})
  }

}
