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
   return this.http.post<any>('https://ecom-backend-file.onrender.com/products' , data , options)
  }



  getProducts():Observable<any>{
    return this.http.get('https://ecom-backend-file.onrender.com/products')
  }

}
