import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardService } from '../service/authguard.service';
import { AuthTokenService } from '../service/auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown> {

  constructor(private authService: AuthguardService, private router: Router , private token : AuthTokenService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isAuthenticated()) {

        const userRole = this.token.getSellerId().role
        if (next.data['roles']) {
     
          const requiredRoles = next.data['roles'];

          if(userRole === requiredRoles){
            return true;
          }else{
            this.router.navigate(['/unauthorized'])
          }
        }
  
        return true;
      }
  
      this.router.navigate(['/userAuth']); 
      return false;
    }




  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
