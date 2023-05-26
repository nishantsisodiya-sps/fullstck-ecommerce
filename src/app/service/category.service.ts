import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public url = 'https://ecombackend.softprodigyphp.in'
  constructor(private http : HttpClient) { }


  getCategories():Observable<any>{
    return this.http.get(`${this.url}/category`)
  }


  getProductsByCategory(id:any):Observable<any>{
    return this.http.get(`${this.url}/category/${id}`)
  }

}
