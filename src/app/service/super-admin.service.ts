import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  public url = 'https://ecombackend.softprodigyphp.in'
  // public url = 'http://localhost:3838'

  constructor(private http : HttpClient) { }

  
  blockUser(id:any):Observable<any>{

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const options = { headers: headers };

    return this.http.post(`${this.url}/superAdmin/blockUser/${id}` ,  null, options)
  }


  blockSeller(id:any):Observable<any>{

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const options = { headers: headers };

    return this.http.post(`${this.url}/superAdmin/blockSeller/${id}` , null, options)
  }

}
