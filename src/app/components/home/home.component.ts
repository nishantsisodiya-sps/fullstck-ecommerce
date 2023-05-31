import { Component, OnInit } from '@angular/core';
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
  showSpinner : boolean = false

  constructor(private api : UserAuthApiService , private category : CategoryService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }

  getProducts(){

    this.showSpinner = true
    return this.api.getProducts().subscribe(response =>{
      this.myProducts = response.products
      this.products =  response.products.slice(4,8)
      this.showSpinner = false
    })
  
  }



  getCategories(){
    this.showSpinner = true
    this.category.getCategories().subscribe(res=>{
      this.categories = res
      this.showSpinner = false
    })
  }
}