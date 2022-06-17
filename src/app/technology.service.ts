import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Technology } from './technology';
import { Paths } from './paths';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  header: HttpHeaders = new HttpHeaders()

  getTechnologies(): Observable<Technology[]> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.get<Technology[]>(Paths.TECHNOLOGY, {
      headers: this.header
    })
  }

}
