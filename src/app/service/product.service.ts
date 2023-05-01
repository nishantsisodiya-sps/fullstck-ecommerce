import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url  = 'http://localhost:2800'
  constructor(private http : HttpClient) { }

  addToCart(data:any) : Observable < any>{
   return this.http.post(`${this.url}/cart/add` , data)
  }

  getCartValue(id:any) : Observable <any>{
    return this.http.get(`${this.url}/cart/${id}`)
  }


  deleteProduct(id : any):Observable<any>{

    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete(`${this.url}/products/${id}` , {headers})

  }


  getCartItems(id : any){
    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${this.url}/cart/${id}` , {headers})
  }

}
