import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // public url  = 'https://ecombackend.softprodigyphp.in'
  public url  = 'http://localhost:3838'


  constructor(private http : HttpClient) { }

  getOrders(id : any):Observable<any>{
    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${this.url}/order/${id}` , {headers})
  }


  
  getOrderInfo(id : any , productId : any):Observable<any>{

    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    const body = { orderId: id, productId: productId };
    // const options = { headers: {headers}, body: body };
 
    
    
    return this.http.post(`${this.url}/order/singleOrder` , body , {headers} )
  }




  cancelOrder(data : any):Observable<any>{

    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put(`${this.url}/order/cancel` , data , {headers})

  }

}
