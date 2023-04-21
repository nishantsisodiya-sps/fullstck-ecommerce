import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthApiService {

  public ApiUrl = 'http://localhost:2800'

  constructor(private http: HttpClient) { }

  addProduct(data: any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };
   return this.http.post<any>('http://localhost:2800/products' , data , options)
  }



  getProducts():Observable<any>{
    return this.http.get('http://localhost:2800/products')
  }


  getSingleProduct(id : any):Observable<any>{
    return this.http.get(`http://localhost:2800/products/${id}`)
  }

}
