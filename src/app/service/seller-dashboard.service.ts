import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerDashboardService {

  public url = 'https://ecombackend.softprodigyphp.in'
  // public url = 'http://localhost:3838'

  constructor(private http : HttpClient) { }


  getSellerProductStatus(id:any):Observable<any>{
    return this.http.get(`${this.url}/sellers/sold-products/${id}`)
  }



  getproductInfo(id:any):Observable<any>{
    return this.http.get(`${this.url}/sellers/sold-productsNew/${id}`)
  }



  getStock(id:any):Observable<any>{
    return this.http.get(`${this.url}/sellers/getProductStockAndSoldCount/${id}`)
  }

}
