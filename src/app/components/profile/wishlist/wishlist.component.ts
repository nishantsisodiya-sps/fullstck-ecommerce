import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { LengthServiceService } from 'src/app/service/length-service.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  imageFound : boolean = true
  products:any = []
  showSpinner : boolean = false
  constructor(
    private wishlist : WishlistService ,
     private auth : AuthTokenService,
    private lengthService : LengthServiceService
     
     ) { }

  ngOnInit(): void {
    this.getWishlistProducts()
  }


  getWishlistProducts(){
    this.showSpinner = true
    let user = this.auth.getSellerId().id

    this.wishlist.getWishlist(user).pipe(
      catchError((error:any) => {
        if (error.status === 404) {
          // Handle case when no orders are found
          this.showSpinner = false;
          this.imageFound = false
        }
        return of([]); // Return an empty array as a fallback value
      })
    ).subscribe((res)=>{
      this.products = res.products
      this.showSpinner = false
    })

  }
  deleteFromWishlist(id: any) {
    this.showSpinner = true
    this.wishlist.deleteFromWishlist(id).subscribe(
      res => {
        this.lengthService.updateWishlistLength()
        this.getWishlistProducts();
        this.showSpinner = false
      },
      error => {
        console.log('Error occurred', error);
      }
    );
  }
}
