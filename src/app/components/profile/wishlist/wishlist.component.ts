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

  constructor(private wishlist : WishlistService , private auth : AuthTokenService) { }

  ngOnInit(): void {
    this.getWishlistProducts()
  }


  getWishlistProducts(){
    let user = this.auth.getSellerId().id

    this.wishlist.getWishlist(user).subscribe(res=>{
      this.products = res.products
    })

  }

  deleteFromWishlist(id:any){
    this.wishlist.deleteFromWishlist(id).subscribe(res=>{
      if(res){
        this.getWishlistProducts()
      }else{
        console.log("error occured");
      }
    })
  }

}
