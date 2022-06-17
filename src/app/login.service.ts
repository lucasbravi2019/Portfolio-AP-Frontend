import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';
import { Paths } from './paths';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(userRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(Paths.LOGIN, userRequest)
  }
  
  checkUserlogged(header: HttpHeaders): HttpHeaders {
    if (!header.has('Authorization')) {
      header = header.append('Authorization', '')
    }
    let token = localStorage.getItem('access_token')
    if (token === null) {
      this.router.navigate(['/login'])
    }
    if (token !== null && token.includes('Bearer ')) {
      token = token
      header = header.set('Authorization', token)
    }
    return header
  }

}
