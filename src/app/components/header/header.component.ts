import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { ProductService } from 'src/app/service/product.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType : string = 'default'
  sellerData: any = []
  searchResult : any
  constructor( private router : Router ,
     private auth : AuthTokenService , private product : ProductService) { }

  ngOnInit(): void {
    this.switchMenu()
  }

  switchMenu(){

    let tokendata = this.auth.getSellerId()

    if(tokendata.role === 'user'){
      this.menuType = 'user'
      
    }else if(tokendata.role === 'seller'){
      this.menuType = 'seller'
    }
    else{
      this.menuType = 'default'
    }


  }

  logout(){
    localStorage.removeItem('token')
    this.menuType = 'default'
    this.router.navigate(['/home'])

  }
  sellerlogout(){
    localStorage.removeItem('token')
    this.menuType = 'default'
    this.router.navigate(['/home'])

  }

  

  search(val : any){
    this.product.searchProducts(val).subscribe(res=>{
      this.searchResult = res
    })

  }

  redirectToDetails(id: any) {
      this.router.navigate(['/details', id])
  }


  hideSearch(){
    this.searchResult = undefined
  }

  }

