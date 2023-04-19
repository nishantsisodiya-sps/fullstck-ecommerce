import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm !: FormGroup
  thumbnailPreview : any
  constructor(private fb : FormBuilder , private http : HttpClient , private router : Router , private api : UserAuthApiService) { 

    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      discountPercentage: [0, Validators.required],
      rating: [0, Validators.required],
      stock: [0, Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      thumbnail: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.getproduct()
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.thumbnailPreview = reader.result as any;
        this.productForm.patchValue({ thumbnail: file });
      };
    }
  }

  addProduct(event : Event){
    let data = this.productForm.value
    this.api.addProduct(data).subscribe(
      () => {
        console.log('Product added successfully!');
        this.productForm.reset();
        this.thumbnailPreview = null;
      },
      (err) => {
        console.log('Failed to add product:', err);
      }
    );
  }


  getproduct(){
    this.api.getProducts().subscribe(result=>{
      console.log(result);
    })
  }

}
