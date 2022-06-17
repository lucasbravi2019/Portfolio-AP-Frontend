import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from './contact';
import { LoginService } from './login.service';
import { Paths } from './paths';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  header: HttpHeaders = new HttpHeaders()

  getAllContacts(): Observable<Contact[]> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.get<Contact[]>(Paths.CONTACT, {
      headers: this.header
    })
  }

}
