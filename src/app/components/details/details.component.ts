import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product : any = []
  productQuantity: number = 1;
  quantity: number = 1
  constructor(private activate : ActivatedRoute , private api : UserAuthApiService) { }
  arr : [] = []

  ngOnInit(): void {

    this.activate.paramMap.subscribe(param=>{
     let id = param.get('id')

     this.api.getSingleProduct(id).subscribe(res=>{
       console.log(res);
      this.product.push(res)

      let image = this.product[0].images
      this.arr = image
      console.log(this.arr);
     })
    })
  }

 
  handleQuantity(val : string){
    if(this.productQuantity < 20 && val === 'plus'){
      this.productQuantity += 1
    }else if(this.productQuantity > 1 && val === 'min'){
      this.productQuantity -= 1
    }
  }

  changeImage(element:any,i:any){
    this.product.thumbnail = element.arr[i]
  }

  AddToCart(){
    console.log("Hello");
  }
  

}
