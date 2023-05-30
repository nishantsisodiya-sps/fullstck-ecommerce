import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  products:any = []
  showSpinner : boolean = false
  constructor(private wishlist : WishlistService , private auth : AuthTokenService) { }

  ngOnInit(): void {
    this.getWishlistProducts()
  }


  getWishlistProducts(){
    this.showSpinner = true
    let user = this.auth.getSellerId().id

    this.wishlist.getWishlist(user).subscribe(res=>{
      this.products = res.products
      this.showSpinner = false
    })

  }
  deleteFromWishlist(id: any) {
    this.showSpinner = true
    this.wishlist.deleteFromWishlist(id).subscribe(
      res => {
        this.getWishlistProducts();
        this.showSpinner = false
      },
      error => {
        console.log('Error occurred', error);
      }
    );
  }
}
