import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerDashboardService {

  constructor(private http : HttpClient) { }


  getSellerProductStatus(id:any):Observable<any>{
    return this.http.get(`http://localhost:3838/sellers/sold-products/${id}`)
  }

}
