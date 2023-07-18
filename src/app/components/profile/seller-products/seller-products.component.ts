import { Component, OnInit } from '@angular/core';
import { UserAuthApiService } from '../../../service/user-auth-api.service';
import { AuthTokenService } from '../../../service/auth-token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { __values } from 'tslib';
import { ProductService } from '../../../service/product.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css'],
})
export class SellerProductsComponent implements OnInit {
  sellerProducts: any = [];
  productUpdateForm!: FormGroup;
  thumbnailPreview: any;
  myproduct: any = [];
  sellerId: any | string;
  productId: any;
  categories: any = [];
  showSpinner: boolean = false;
  constructor(
    private api: UserAuthApiService,
    private productApi: ProductService,
    private auth: AuthTokenService,
    private http: HttpClient,
    private fb: FormBuilder,
    private category: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    // this.deleteProduct(this , this)

    this.productUpdateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      discountPercentage: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      thumbnail: [null, Validators.required],
      images: [null, Validators.required],
    });
  }

  fetchProducts() {
    this.showSpinner = true;
    const sellerId = this.auth.getSellerId();
    const id = sellerId.id;

    this.api.getSellerProducts(id).subscribe((res) => {
      this.sellerProducts = res;
      this.showSpinner = false;
    });
  }

  onThumbnailSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.productUpdateForm.get('thumbnail')?.setValue(file);
    }
  }

  onImagesSelected(event: any) {
    const files = event.target.files;
    if (files?.length) {
      this.productUpdateForm.get('images')?.setValue(files);
    }
  }

  updateProduct() {
    this.showSpinner = true;
    let Id = this.productId;
    const formData = new FormData();
    formData.append('title', this.productUpdateForm.get('title')?.value);
    formData.append(
      'description',
      this.productUpdateForm.get('description')?.value
    );
    formData.append('price', this.productUpdateForm.get('price')?.value);
    formData.append(
      'discountPercentage',
      this.productUpdateForm.get('discountPercentage')?.value
    );
    formData.append('rating', this.productUpdateForm.get('rating')?.value);
    formData.append('brand', this.productUpdateForm.get('brand')?.value);
    formData.append('stock', this.productUpdateForm.get('stock')?.value);
    formData.append('category', this.productUpdateForm.get('category')?.value);
    formData.append(
      'thumbnail',
      this.productUpdateForm.get('thumbnail')?.value
    );
    const imagesFiles = this.productUpdateForm.get('images')?.value;
    for (let i = 0; i < imagesFiles.length; i++) {
      formData.append('images', imagesFiles[i]);
    }
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    this.http
      .patch(`https://ecombackend.softprodigyphp.in/products/${Id}`, formData, {
        headers,
      })
      .subscribe(
        (res) => {
          console.log('Product Updated successfully!');
          this.productUpdateForm.reset();
          this.showSpinner = false;
          this.fetchProducts();
        },
        (err) => {
          console.error('Product creation failed:', err);
        }
      );
  }

  editProduct(id: any, i: any) {
    let data = this.sellerProducts[i];
    let pId = data._id;
    this.productId = pId;
    this.productUpdateForm.setValue({
      title: data.title,
      description: data.description,
      price: data.price,
      discountPercentage: data.discountPercentage,
      rating: data.rating,
      stock: data.stock,
      brand: data.brand,
      category: data.category,
      thumbnail: data.thumbnail,
      images: data.images,
    });
  }

  deleteProduct(id: any, i: any) {
    this.showSpinner = true;
    let data = this.sellerProducts[i];
    let pId = data._id;
    this.productId = pId;
    console.log(this.productId);

    this.productApi.deleteProduct(this.productId).subscribe((res) => {
      if (res) {
        this.fetchProducts();
        if (this.fetchProducts.length == 0) {
          console.log(0);
          this.showSpinner = false;
        }
      }
    });
  }

  getCaterogies() {
    this.showSpinner = true;
    this.category.getCategories().subscribe((res) => {
      this.categories = res.map((category: any) => {
        return { name: category.name, value: category._id };
      });
      this.showSpinner = false;
    });
  }
}
