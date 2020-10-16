import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getOrders() { 
    // let token = localStorage.getItem('token');

    // const tok = {
    //   'Authorization' : 'Bearer' + token
    // };
 
    // let options = {
    //   headers: new HttpHeaders(tok)
    // }
    return this.http.get('http://localhost:8080/mock-auth-server/api/mock/orders')
      .pipe(map(r => r));
  }
}
