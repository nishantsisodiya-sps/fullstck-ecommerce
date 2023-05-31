import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public url  = 'https://ecombackend.softprodigyphp.in'
  // public url  = 'http://localhost:3838'


  constructor(private http : HttpClient) { }

  getOrders(id : any):Observable<any>{
    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${this.url}/order/${id}` , {headers})
  }

  getOrderInfo(id : any):Observable<any>{
    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${this.url}/order/singleOrder/${id}` , {headers})
  }

}
