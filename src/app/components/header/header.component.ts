import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType : string = 'default'

  constructor( private router : Router) { }

  ngOnInit(): void {
    this.switchMenu()
  }

  switchMenu(){
    let token = localStorage.getItem('Usertoken')
    let sellerToken = localStorage.getItem('Sellertoken')
    if(token){
      this.menuType = 'user'
      
    }else if(sellerToken){
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

  }

