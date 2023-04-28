import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType : string = 'default'
  sellerData: any = []

  constructor( private router : Router , private api : UserAuthApiService , private auth : AuthTokenService) { }

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
    localStorage.removeItem('Usertoken')
    this.menuType = 'default'
    this.router.navigate(['/home'])

  }
  sellerlogout(){
    localStorage.removeItem('Sellertoken')
    this.menuType = 'default'
    this.router.navigate(['/home'])

  }

  getProfile(){

    let id = this.auth.getSellerId().id

    this.api.getSellerProfile(id).subscribe(response=>{
      this.sellerData = response.seller
      console.log(this.sellerData);
    })
  }

  }

