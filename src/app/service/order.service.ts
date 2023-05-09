import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public url  = 'http://localhost:2800'
  constructor(private http : HttpClient) { }

  getOrders(id : any):Observable<any>{
    return this.http.get(`${this.url}/order/${id}`)
  }

  getOrderInfo(id : any):Observable<any>{
    return this.http.get(`${this.url}/order/singleOrder/${id}`)
  }

}
