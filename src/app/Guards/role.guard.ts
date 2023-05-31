import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardService } from '../service/authguard.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthguardService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    const userRole = this.authService.getUserRole();

    
    if (next.data['roles'] && next.data['roles'].includes(userRole)) {
      return true;
    } else {
     
      this.router.navigate(['/unauthorized']); 
      return false;
    }
  }
  }

