import { Injectable } from '@angular/core';
import { AuthTokenService } from './auth-token.service';
import { ProductService } from './product.service';
import { WishlistService } from './wishlist.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LengthServiceService {

  private cartLengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private wishlistLengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private auth: AuthTokenService,
    private product: ProductService,
    private wishlist: WishlistService
  ) { }

  getCartLength(): BehaviorSubject<number> {
    return this.cartLengthSubject;
  }

  getWishlistLength(): BehaviorSubject<number> {
    return this.wishlistLengthSubject;
  }

  updateCartLength(): void {
    const user = this.auth.getSellerId().id;
    this.product.getCartValue(user).subscribe(res => {
      this.cartLengthSubject.next(res.length);
    });
  }

  updateWishlistLength(): void {
    const user = this.auth.getSellerId().id;
    this.wishlist.getWishlist(user).subscribe(res => {
      this.wishlistLengthSubject.next(res.products.length);
    });
  }
}
