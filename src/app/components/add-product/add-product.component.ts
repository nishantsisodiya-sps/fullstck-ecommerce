import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  myproduct : any = []
  constructor(private fb : FormBuilder , private http : HttpClient , private router : Router , private api : UserAuthApiService) { 

    // this.productForm = this.fb.group({
    //   title: ['', Validators.required],
    //   description: ['', Validators.required],
    //   price: [0, Validators.required],
    //   discountPercentage: [0, Validators.required],
    //   rating: [0, Validators.required],
    //   stock: [0, Validators.required],
    //   brand: ['', Validators.required],
    //   category: ['', Validators.required],
    //   thumbnail: [null, Validators.required],
    // })
  }

  ngOnInit(): void {
    // this.getproduct()
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      discountPercentage: ['', Validators.required],
      rating: ['', Validators.required],
      stock: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      thumbnail: [null, Validators.required],
      images: [null, Validators.required]
    });
  }


  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       this.thumbnailPreview = reader.result as any;
  //       this.productForm.patchValue({ thumbnail: file });
  //     };
  //   }
  // }

  // addProduct(event : Event){
  //   let data = this.productForm.value
  //   this.api.addProduct(data).subscribe(
  //     () => {
  //       console.log('Product added successfully!');
  //       this.productForm.reset();
  //       this.thumbnailPreview = null;
  //     },
  //     (err) => {
  //       console.log('Failed to add product:', err);
  //     }
  //   );
  // }


  // getproduct(){
  //   this.api.getProducts().subscribe(result=>{
  //    this.myproduct = result
  //   })
  // }

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
    console.log(formData);
    this.http.post('https://ecom-backend-file.onrender.com/products', formData).subscribe(
      res => {
        console.log('Product created successfully!');
      },
      err => {
        console.error('Product creation failed:', err);
      }
    );
  }

}
