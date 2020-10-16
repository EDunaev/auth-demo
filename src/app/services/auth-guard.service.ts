import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(route, state: RouterStateSnapshot) {
    console.log("state: ", state.url);
    
    if(this.authService.isLoggedIn() && this.authService.currentUser.admin) return true;

    this.router.navigate(['/login'], { queryParams: { returnUrl : state.url }});
    return false;
  }
}
