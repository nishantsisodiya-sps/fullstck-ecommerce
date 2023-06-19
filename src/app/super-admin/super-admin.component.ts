import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenutypeService } from '../service/menutype.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {
  isSidebarHidden = false;

  constructor(private router : Router , private menuService: MenutypeService) { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }


  logout() {
    localStorage.removeItem('token');
    this.menuService.updateMenuType('default');
    window.location.reload()
    this.router.navigate(['/home']);
  }

}
