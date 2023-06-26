import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  private cartItemsKey = 'cartItems';
  private cartItemsSubject = new BehaviorSubject<any[]>([]);

  constructor(private http : HttpClient) {
    this.loadCartItemsFromLocalStorage();
   }


   getCartItems(): Observable<any[]> {
    return this.cartItemsSubject.asObservable();
  }

  updateCartItems(cartItems: any[]): void {
    localStorage.setItem(this.cartItemsKey, JSON.stringify(cartItems));
    this.cartItemsSubject.next(cartItems);
  }

  private loadCartItemsFromLocalStorage(): void {
    const cartItemsString = localStorage.getItem(this.cartItemsKey);
    const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
    this.cartItemsSubject.next(cartItems);
  }
}
