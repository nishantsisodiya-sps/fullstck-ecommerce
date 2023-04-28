import { Component, OnInit } from '@angular/core';
import { UserAuthApiService } from '../service/user-auth-api.service';
import { ActivatedRoute } from '@angular/router';
import { AuthTokenService } from '../service/auth-token.service';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})
export class SellerProductsComponent implements OnInit {
  sellerProducts : any = []
  constructor(private api : UserAuthApiService , private activatedRoute : ActivatedRoute , private auth : AuthTokenService) { }

  ngOnInit(): void {
    this.fetchProducts()
  }

  fetchProducts(){
    const sellerId = this.auth.getSellerId()
    const id = sellerId.id

    
    this.api.getSellerProducts(id).subscribe(res=>{
      this.sellerProducts = res
      console.log(this.sellerProducts);
    })
  }

}
