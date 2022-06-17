import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../login-request';
import { LoginResponse } from '../login-response';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  login: LoginRequest = {
    username: '',
    password: ''
  }

  token: string = ''

  ngOnInit(): void {
  }

  loginUser() {
    this.loginService.login(this.login).subscribe({
      next: (data: LoginResponse) => this.token = `Bearer ${data.jwt}`,
      error: (error: HttpErrorResponse) => console.log(error.error.message),
      complete: () => {
        this.saveToken()
        this.router.navigate(['/admin'])
      }
    })
  }

  saveToken() {
    if (localStorage.getItem('access_token') !== null) localStorage.removeItem('access_token')
    localStorage.setItem('access_token', this.token)
  }

}
