import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean; 

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService) { }

  signIn(credentials) {
    console.log(credentials);
    
    this.authService.login(credentials)
      .subscribe(result => { 
        if (result) {
          // let returnUrl = this.route.queryParamMap.keys.map(key => [key, this.route.snapshot.queryParamMap.get('returnUrl')]);
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          console.log("return url: ", returnUrl);
          
          this.router.navigate([returnUrl || '/']);
        }
        else  
          this.invalidLogin = true; 
      });
  }

}
