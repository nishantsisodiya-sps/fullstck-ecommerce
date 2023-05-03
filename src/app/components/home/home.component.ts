import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myProducts : any = []
  sellerData : any = []
  constructor(private api : UserAuthApiService , private auth : AuthTokenService) { }

  ngOnInit(): void {
    this.getProducts()
    // this.getProfile()
  }

  getProducts(){
    return this.api.getProducts().subscribe(response =>{
      this.myProducts = response.products
    })
  
  }

  // getProfile(){

  //   let id = this.auth.getSellerId().id

  //   this.api.getSellerProfile(id).subscribe(response=>{
  //     this.sellerData = response.seller
  //   })
  // }

}
