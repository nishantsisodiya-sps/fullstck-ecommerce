import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  public url = 'http://localhost:3838'

  constructor(private http : HttpClient) { }


  addToWishlist(productId: string): Observable<any> {
    return this.http.post<any>(`${this.url}/add`, { productId });
  }

  getWishlist(): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }

}
