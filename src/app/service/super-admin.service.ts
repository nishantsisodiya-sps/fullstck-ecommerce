import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  // public url = 'https://ecombackend.softprodigyphp.in/superAdmin'
  public url = 'http://localhost:3838/superAdmin'

  constructor(private http : HttpClient) { }

  
  blockUser(id:any):Observable<any>{

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const options = { headers: headers };

    return this.http.post(`${this.url}/blockUser/${id}` ,  null, options)
  }


  blockSeller(id:any):Observable<any>{

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const options = { headers: headers };

    return this.http.post(`${this.url}/blockSeller/${id}` , null, options)
  }



  getAllOrders():Observable<any>{
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const options = { headers: headers };

    return this.http.get(`${this.url}/getAllOrder` , options)


  }

}
