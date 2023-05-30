import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm !: FormGroup
  thumbnailPreview: any
  myproduct: any = []
  sellerId: any | string;
  categories: any = []
  showSpinner : boolean = false
  constructor(private fb: FormBuilder, private http: HttpClient,
    private category: CategoryService) {
  }

  ngOnInit(): void {
    // this.getproduct()
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      discountPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      thumbnail: [null, Validators.required],
      images: [null, Validators.required]
    });

    this.getCaterogies()
  }


  onThumbnailSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.productForm.get('thumbnail')?.setValue(file)
    }
  }

  onImagesSelected(event: any) {
    const files = event.target.files;
    if (files?.length) {
      this.productForm.get('images')?.setValue(files);
    }
  }

  onSubmit() {
    this.showSpinner = true
    const formData = new FormData();
    formData.append('title', this.productForm.get('title')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('discountPercentage', this.productForm.get('discountPercentage')?.value);
    formData.append('rating', this.productForm.get('rating')?.value);
    formData.append('brand', this.productForm.get('brand')?.value);
    formData.append('stock', this.productForm.get('stock')?.value);
    formData.append('category', this.productForm.get('category')?.value);
    formData.append('thumbnail', this.productForm.get('thumbnail')?.value);
    const imagesFiles = this.productForm.get('images')?.value;
    for (let i = 0; i < imagesFiles.length; i++) {
      formData.append('images', imagesFiles[i]);
    }

    const headers = new HttpHeaders({

      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });


    this.http.post('https://ecombackend.softprodigyphp.in/products/add', formData, { headers }).subscribe(
      res => {
        console.log('Product created successfully!');
        this.productForm.reset()
        this.showSpinner = false
      },
      err => {
        console.error('Product creation failed:', err);
      }
    );
  }


  getCaterogies() {
    this.category.getCategories().subscribe(res => {
      this.categories = res.map((category: any) => {
        return { name: category.name, value: category._id };
      });
      console.log(this.categories);
    })
  }

}
