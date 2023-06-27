import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { id } from '@swimlane/ngx-charts';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryName !: FormGroup
  updateCategory !: FormGroup
  categories: any = []
  id : any
  constructor(
    private category: CategoryService,
    private fb: FormBuilder,
  ) {

    this.categoryName = this.fb.group({
      name: ['', Validators.required]
    })

   

  }

  ngOnInit(): void {
    this.getCategories()

    this.updateCategory = this.fb.group({
      name: ['', Validators.required]
    })
  }


  getCategories() {
    this.category.getCategories().subscribe(res => {
      this.categories = res
    })
  }

  addCategory() {
    let name = this.categoryName.value.name
    this.category.addCategory(name).subscribe(res=>{
      if(res){
        console.log(res);
        window.location.reload()
        this.getCategories()
      }
    })
  }


  deleteCategory(id:any){
    this.category.deleteCategory(id).subscribe(res=>{
      if(res){
        this.getCategories()
      }
    })
  }

  edit(name : any , id:any){
    this.id = id
    this.updateCategory.setValue({
      name : name
    })
  }

  updateCategoryName(){
    let data = this.updateCategory.value.name
    console.log(data);
   
    
    this.category.updateCategory(this.id , data).subscribe(res=>{
      if(res){
        console.log(res);
        window.location.reload();
        this.getCategories()
      }
    })
  }

}
