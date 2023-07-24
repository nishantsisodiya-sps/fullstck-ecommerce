import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { LengthServiceService } from 'src/app/service/length-service.service';
import { MenutypeService } from 'src/app/service/menutype.service';
import { ProductService } from 'src/app/service/product.service';
import { UserAuthApiService } from 'src/app/service/user-auth-api.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {
  admin : boolean = false
  menuType : string = 'default'
  sellerData: any = []
  searchResult : any
 
  cartLength: number = 0;
  wishlistLength: number = 0;

  private cartSubscription?: Subscription;
  private wishlistSubscription?: Subscription;


  constructor( private router : Router ,
     private auth : AuthTokenService ,
      private product : ProductService ,
       private menuService: MenutypeService,
       private lengthService: LengthServiceService
       ) { }

       
  ngOnInit(): void {
    this.menuService.menuType$.subscribe(menuType => {
      this.menuType = menuType;
    });

    this.cartSubscription = this.lengthService.getCartLength().subscribe(length => {
      this.cartLength = length;
    });

    this.wishlistSubscription = this.lengthService.getWishlistLength().subscribe(length => {
      this.wishlistLength = length;
    });


    this.switchMenu()
    this.getcartLength();
    this.getWishlistLength();
  }

  ngOnDestroy(): void {
    // Don't forget to unsubscribe to prevent memory leaks
    this.cartSubscription?.unsubscribe();
    this.wishlistSubscription?.unsubscribe();
  }

  switchMenu(){

    let tokendata = this.auth.getSellerId()
    console.log(tokendata.role);

    if(!tokendata){
      this.menuType = 'default'
    }
    else if(tokendata.role === 'user'){
      this.menuType = 'user'
      
    }else if(tokendata.role === 'seller'){
      this.menuType = 'seller'
    }
    else if(tokendata.role === 'superAdmin'){
      this.admin = true
      this.menuType = 'superAdmin'
    }
  
    this.menuService.updateMenuType(this.menuType);
  }

  logout(){
    localStorage.removeItem('token')
    this.menuService.updateMenuType('default');
    this.router.navigate(['/home'])

  }
  sellerlogout(){
    localStorage.removeItem('token')
    this.menuService.updateMenuType('default');
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

  getcartLength() {
    this.lengthService.updateCartLength();
  }

  getWishlistLength() {
    this.lengthService.updateWishlistLength();
  }

  }

