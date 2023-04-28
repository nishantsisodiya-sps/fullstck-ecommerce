import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  addToCart(data:any) : Observable < any>{
   return this.http.post('http://localhost:2800/cart/add' , data)
  }
}
