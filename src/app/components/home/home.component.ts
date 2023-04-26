import { Component, OnInit } from '@angular/core';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myProducts : any = []
  constructor(private api : UserAuthApiService) { }

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
  //   this.api.getSellerProfile().subscribe(response=>{
  //     console.log(response.seller);
  //   })
  // }

}
