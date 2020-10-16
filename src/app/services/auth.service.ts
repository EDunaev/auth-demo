import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt"; 


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(credentials) { 
    let data = {
        "email" : credentials.email,
        "password" : credentials.password
    };

   return this.http.post('http://localhost:8080/mock-auth-server/api/mock/authenticate', 
      data)
      .pipe(map(response => {
        let result:any = response;
        if(result && result.token) {
          localStorage.setItem('token', result.token)
          return true;
        }
        else return false;
      }));
  }

  logout() { 
    localStorage.removeItem('token');
  }

  isLoggedIn() { 
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');
    if(token) {
      let expirationDate = jwtHelper.getTokenExpirationDate(token);
      let isExpired = jwtHelper.isTokenExpired(token);

      console.log(expirationDate);
      console.log(isExpired);
      return !isExpired;
    }
    
    return false;
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if(!token) return null;

    return new JwtHelperService().decodeToken(token);
  }
}

