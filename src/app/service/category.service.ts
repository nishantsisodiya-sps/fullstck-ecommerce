import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public url = 'https://ecombackend.softprodigyphp.in/category'
  // public url = 'http://localhost:3838/category'
  constructor(private http : HttpClient) { }


  getCategories():Observable<any>{
    return this.http.get(`${this.url}`)
  }


  getProductsByCategory(id:any):Observable<any>{
    return this.http.get(`${this.url}/${id}`)
  }


  addCategory(name : any):Observable<any>{
    const headers = new HttpHeaders({
       
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const body = { name : name };
    return this.http.post(`${this.url}/productCategories` , body , {headers})
  }


  deleteCategory(id:any):Observable<any>{
    const headers = new HttpHeaders({
       
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete(`${this.url}/productCategories/${id}` , {headers})
  }

  updateCategory(id:any , data : any):Observable<any>{

    const headers = new HttpHeaders({
       
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    const body = { name : data };

    return this.http.put(`${this.url}/productCategories/${id}` ,body, {headers})

  }

}
