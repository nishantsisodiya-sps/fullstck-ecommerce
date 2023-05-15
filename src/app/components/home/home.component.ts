import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { CategoryService } from 'src/app/service/category.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myProducts : any = []
  products : any = []
  sellerData : any = []
  categories : any = []
  constructor(private api : UserAuthApiService , private category : CategoryService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }

  getProducts(){
    return this.api.getProducts().subscribe(response =>{
      this.myProducts = response.products
      this.products =  response.products.slice(4,8)
    })
  
  }


  getCategories(){
    this.category.getCategories().subscribe(res=>{
      this.categories = res
    })
  }

}
