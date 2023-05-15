import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  products : any = []

  constructor(private category : CategoryService , private ActivatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.getProducts()
  }


  getProducts(){
    this.ActivatedRoute.paramMap.subscribe(params=>{
      let id = params.get('id')



      this.category.getProductsByCategory(id).subscribe(res=>{
        this.products = res
      })
    })
  }

}
