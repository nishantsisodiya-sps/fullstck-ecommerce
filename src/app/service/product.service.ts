import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url  = 'http://localhost:3838'
  constructor(private http : HttpClient) { }

  addToCart(data:any) : Observable < any>{
   return this.http.post(`${this.url}/cart/add` , data)
  }

  getCartValue(id:any) : Observable <any>{                    //to get the cat length
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


  updateCartItem(itemId : any , quantity:number):Observable<any>{
    return this.http.put(`${this.url}/cart/${itemId}` , { quantity })
  }


  deleteFromCart(itemId : any):Observable<any>{
    return this.http.delete<any>(`${this.url}/cart/${itemId}`)
  }


  searchProducts(query : any):Observable<any>{
    return this.http.get(`${this.url}/products/search?title=${query}`)
  }
}
