import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  public url = "https://ecombackend.softprodigyphp.in"
  // public url = "http://localhost:3838"

  constructor(private http : HttpClient) { }


  addToWishlist(productId: string): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this.http.post<any>(`${this.url}/wishlist/add`, { productId } , {headers});
  }

  getWishlist(id:any): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.url}/wishlist/${id}` , {headers});
  }

  deleteFromWishlist(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.delete(`${this.url}/wishlist/${id}`, { headers });
  }

}
