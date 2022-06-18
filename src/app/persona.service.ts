import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from './persona';
import { Paths } from './paths';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  token: string = ''
  header: HttpHeaders = new HttpHeaders()

  getPersona(): Observable<Persona> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.get<Persona>(Paths.BASE + Paths.PERSONA, { 
      headers: this.header
    })
  }

  createPersona(persona: Persona): Observable<Persona> {
    this.loginService.checkUserlogged(this.header)
    return this.http.post<Persona>(Paths.PERSONA, persona, {
      headers: this.header
    })
  }

  updatePersona(id: number, persona: Persona): Observable<Persona> {
    this.loginService.checkUserlogged(this.header)
    return this.http.put<Persona>(`${Paths.PERSONA}/${id}`, persona, {
      headers: this.header
    })
  }
  
  deletePersona(id: number): Observable<VoidFunction> {
    this.loginService.checkUserlogged(this.header)
    return this.http.delete<VoidFunction>(`${Paths.PERSONA}/${id}`, {
      headers: this.header
    })
  }

  

}
